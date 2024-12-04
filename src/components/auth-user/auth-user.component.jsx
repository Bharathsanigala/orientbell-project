import './auth-user.styles.scss'
import { AuthContext } from '../../contexts/auth-context.context';
import { useContext, useState,useEffect } from 'react';
import { FaSignOutAlt } from "react-icons/fa";
import { PiUserSwitchFill } from "react-icons/pi";
import { FaUserAstronaut } from "react-icons/fa6";
import { signOutUser,signInWithGooglePopup } from '../../utils/firebase/firebase';

const AuthUser = () => {

    const {user}=useContext(AuthContext);
    const [isUserImgLoaded,setIsUserImgLoaded]=useState(false);

    useEffect(()=>{
        const img = new Image();
        img.src = user?.photoURL;
        img.onload=()=>setIsUserImgLoaded(true);
    },[user?.photoURL])

    return ( 
        <div className='auth-user-div'>
            {isUserImgLoaded ? <img src={user?.photoURL} alt='user' className='user-photo-img' width={100} /> : <div  className='astro-user' ><FaUserAstronaut/> </div>}
                    <p>{user?.displayName ?? 'User'}</p>
                    <p>{user?.email}</p>
                    <div className='btn-wrapper'>
                    <button className='blu-btn' onClick={signOutUser}> <FaSignOutAlt/> Sign Out</button>
                    <button className='blu-btn' onClick={signInWithGooglePopup}> <PiUserSwitchFill/> Switch Account</button>
                    </div>
        </div>
     );
}
 
export default AuthUser;