import './auth-user.styles.scss'
import {  useState,useEffect, Fragment } from 'react';
import { FaSignOutAlt } from "react-icons/fa";
import { signOutUser} from '../../utils/firebase/firebase';
import { FaCircleCheck,FaClock,FaUniversalAccess,FaUserAstronaut } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/auth-context.context';
import { useUserRoleContext } from '../../contexts/user-role.context';

const AuthUser = () => {

    const {user}=useAuthContext();
    const {fetchedUserRoleData}=useUserRoleContext();
    const [isUserImgLoaded,setIsUserImgLoaded]=useState(false);
    const [responseCode,setResponseCode]=useState(0);
    const readerMessages=['','Request sent','In progress']
    const navigateRouter = useNavigate()

    useEffect(()=>{
        const img = new Image();
        img.src = user?.photoURL;
        img.onload=()=>setIsUserImgLoaded(true);
    },[user?.photoURL])


    return ( 
        <div className='auth-user-div'>
            {isUserImgLoaded ? <img src={user?.photoURL} alt='user' className='user-photo-img' width={100} /> : <div  className='astro-user' ><FaUserAstronaut/> </div>}
                    <p>{fetchedUserRoleData?.fetchedUserName ?? 'User'}</p>
                    <p>access level : {fetchedUserRoleData?.fetchedUserRole ?? 'null'}</p>
                    <p>{fetchedUserRoleData?.fetchedUserEmail ?? 'null'}</p>
                    <div className='btn-wrapper'>
                    <button className='blu-btn' onClick={signOutUser}> <FaSignOutAlt/> sign out</button>
                    </div>
                    {fetchedUserRoleData?.fetchedUserRole==='reader' && <Fragment>
                    <button className='blu-btn'> <FaUniversalAccess/> Request writer access</button>
                    <span style={{color:responseCode === 1 ? 'green' : ''}}> {responseCode === 1 ?  <FaCircleCheck/> : responseCode === 2 ? <FaClock/> : '...' } {readerMessages[responseCode]}</span>
                    </Fragment>}
                    {fetchedUserRoleData?.fetchedUserRole==='admin' && <button className='blu-btn' onClick={()=>navigateRouter('/admin-space')}>admin space</button>}
        </div>
     );
}
 
export default AuthUser;