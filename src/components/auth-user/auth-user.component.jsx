import './auth-user.styles.scss'
import {  useState,useEffect, Fragment } from 'react';
import { FaSignOutAlt } from "react-icons/fa";
import { signOutUser} from '../../utils/firebase/firebase';
import { FaCircleCheck,FaClock,FaUniversalAccess,FaUserAstronaut } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/auth-context.context';
import { useUserRoleContext } from '../../contexts/user-role.context';
import Loader from '../loader/loader.component';
import { realtimeDatabase,firestoreDatabase } from '../../utils/firebase/firebase';
import { ref,set } from 'firebase/database';
import { doc, updateDoc } from 'firebase/firestore';

const AuthUser = () => {

    const {user}=useAuthContext();
    const {fetchedUserRoleData,isRoleLoading}=useUserRoleContext();
    const [isUserImgLoaded,setIsUserImgLoaded]=useState(false);
    const [responseCode,setResponseCode]=useState(0);
    const readerMessages=['','Request sent','In progress','Blocked by admin','error occured try again later']
    const navigateRouter = useNavigate()
   
    useEffect(()=>{
        const img = new Image();
        img.src = user?.photoURL;
        img.onload=()=>setIsUserImgLoaded(true);
    },[user?.photoURL])

    const handleDbUpdate=async()=>{
        try{
        const userUid = user.uid;
            if(userUid && Object.keys(fetchedUserRoleData).length){
                await updateDoc(doc(firestoreDatabase,'users',userUid),{
                    writerAccessStatus:'pending'
                })
                const userRef = ref(realtimeDatabase,`userWriterRequests/${userUid}`);
                await set(userRef,{
                    requesterName:fetchedUserRoleData?.fetchedUserName ?? 'user',
                    requesterEmail:fetchedUserRoleData?.fetchedUserEmail,
                    requestedTime:new Date().toGMTString().replace('GMT','').trim()
                })
            }
            return true
        }catch(e){
            console.log(e);
            return false
        }
        
    }


    const handleWriterAccess=()=>{
        if(!fetchedUserRoleData?.writerAccessStatus){
            const result=handleDbUpdate();
            if(result){
                setResponseCode(1)
            }else{
                setResponseCode(4)
            }
        }else{
            if(fetchedUserRoleData?.writerAccessStatus==='pending'){
                setResponseCode(2)
            }else if(fetchedUserRoleData?.writerAccessStatus==='blocked'){
                setResponseCode(3)
            }
        }
    }

    if(isRoleLoading){
        return <div className='loader-class'>
        <Loader lh={'100px'} lw={'100px'} />
        <p>getting user role...</p>
    </div>
    }
    
    return ( 
        <div className='auth-user-div'>
            {isUserImgLoaded ? <img src={user?.photoURL} alt='user' className='user-photo-img' width={100} /> : <div  className='astro-user' ><FaUserAstronaut/> </div>}
                    <p>{fetchedUserRoleData?.fetchedUserName ?? 'User'}</p>
                    <p>access level : {fetchedUserRoleData?.fetchedUserRole?.toUpperCase() ?? 'null'}</p>
                    <p>{fetchedUserRoleData?.fetchedUserEmail ?? 'null'}</p>
                    <div className='btn-wrapper'>
                    <button className='blu-btn' onClick={signOutUser}> <FaSignOutAlt/> sign out</button>
                    </div>
                    {fetchedUserRoleData?.fetchedUserRole==='reader' && <Fragment>
                    <button className='blu-btn' onClick={handleWriterAccess}> <FaUniversalAccess/> Request writer access</button>
                    <span style={{color:responseCode === 1 ? 'green' : ''}}> {responseCode === 1 ?  <FaCircleCheck/> : responseCode === 2 ? <FaClock/> : '...' } {readerMessages[responseCode]}</span>
                    </Fragment>}
                    {fetchedUserRoleData?.fetchedUserRole==='admin' && <button className='blu-btn' onClick={()=>navigateRouter('/admin-space')}>admin space</button>}
        </div>
     );
}
 
export default AuthUser;