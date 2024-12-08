import './auth-user.styles.scss'
import { AuthContext } from '../../contexts/auth-context.context';
import { useContext, useState,useEffect } from 'react';
import { FaSignOutAlt } from "react-icons/fa";
import { FaUserAstronaut } from "react-icons/fa6";
import { signOutUser} from '../../utils/firebase/firebase';
import { FaUniversalAccess } from "react-icons/fa6";
import { FaClock } from 'react-icons/fa6';
import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const AuthUser = () => {

    const {user}=useContext(AuthContext);
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
                    <p>{user?.displayName ?? 'User'}</p>
                    <p>access level : reader</p>
                    <p>{user?.email}</p>
                    <div className='btn-wrapper'>
                    <button className='blu-btn' onClick={signOutUser}> <FaSignOutAlt/> sign out</button>
                    </div>
                    <button className='blu-btn'> <FaUniversalAccess/> Request writer access</button>
                    <span style={{color:responseCode === 1 ? 'green' : ''}}> {responseCode === 1 ?  <FaCircleCheck/> : responseCode === 2 ? <FaClock/> : '...' } {readerMessages[responseCode]}</span>
                    <button className='blu-btn' onClick={()=>navigateRouter('/admin-space')}>admin space</button>
        </div>
     );
}
 
export default AuthUser;