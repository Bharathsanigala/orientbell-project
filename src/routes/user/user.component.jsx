import { Fragment,  useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import 'animate.css'
import './user.styles.scss'
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { signInWithGooglePopup,signInUserWithEmailAndPassword,createUserFromEmailAndPassword } from '../../utils/firebase/firebase';
import AuthUser from '../../components/auth-user/auth-user.component';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth-context.context';

const User = () => {

    const [isSignUpClicked,setIsSignUpClicked]=useState(false);
    const [signinEmail,setSigninEmail]=useState('');
    const [signinPassword,setSigninPassword]=useState('');
    const [createEmail,setCreateEmail]=useState('');
    const [createPassword,setCreatePassword]=useState('')
    const [enteredName,setEnteredName]=useState('');
    const [responseMessageId,setResponseMessageId]=useState(0);
    const [signInResponseId,setSignInResponseId]=useState(0);
    const {user} = useContext(AuthContext);
    const [isEyeClicked,setIsEyeClicked]=useState(false);
    const responseMessageArray=['','Successfully Signed In','Email Already Registered','Unknown Error Occured','Invalid credential Try Again.']
    

    return ( 
        <div className='user-div '>
        <h1>User Space</h1>
            {!user ? <div className='no-user '>
                <div className='google-signin'>
                    <div className='inner-block'>
                    <h2>Welcome Back !</h2>
                    <span>To keep connected with us please login with your personal info</span>
                    <div className='btn-group'>
                        <div onClick={signInWithGooglePopup}><FcGoogle/></div>
                        <div className='facebook'><FaFacebookSquare /></div>
                        <div><FaGithub/></div>
                    </div>
                    </div>
                </div>
                <div className='divider'></div>
                <div className='email-signin'>
                        <div className='inner-block'>
                        <div className='switch'>
                            <div onClick={()=>setIsSignUpClicked(true)} style={{backgroundColor:isSignUpClicked ? 'rgb(72,139,255)' : 'inherit',color:isSignUpClicked?'ghostwhite' : ''}}>SignUp</div>
                            <div onClick={()=>setIsSignUpClicked(false)}style={{backgroundColor:!isSignUpClicked ? 'rgb(72,139,255)' : 'inherit',color:!isSignUpClicked?'ghostwhite' : ''}}>SignIn</div>
                        </div>
                        <Fragment >
                    {isSignUpClicked ? <div className='signup '>
                        <h2>Create Account</h2>
                        <div className='entry'>
                        <div>
                        <FaUserAlt/>
                            <input placeholder='Name' type='text' className='n-input' value={enteredName} onChange={(e)=>setEnteredName(e.target.value)} />
                        </div>
                            <div>
                        <MdEmail/>
                            <input placeholder='Email' type='email' className='n-input' value={createEmail} onChange={(e)=>setCreateEmail(e.target.value)} />
                        </div>
                            <div>
                                <FaLock/>
                                <input placeholder='Password' type={!isEyeClicked ? 'password' : 'text'} className='n-input' value={createPassword} onChange={(e)=>setCreatePassword(e.target.value)} />
                                {!isEyeClicked ? <FaEye onClick={()=>setIsEyeClicked(true)} /> : <FaEyeSlash onClick={()=>setIsEyeClicked(false)} />}
                            </div>
                        </div>
                        <button className='blu-btn' onClick={async()=>{
                            if(enteredName.trim() && createEmail.trim() && createPassword.trim) {
                                const responseId = await createUserFromEmailAndPassword(createEmail,createPassword,enteredName) ?? 0
                                setResponseMessageId(responseId)
                                setCreateEmail('')
                                setCreatePassword('')
                                setEnteredName('')
                            }
                        }}>SIGN UP</button>
                        <span>{responseMessageArray[responseMessageId]}</span>
                    </div> :
                    <div className='signin'>
                        <h2>Login to your Account</h2>
                        <div className='entry'>
                        <div>
                        <MdEmail/>
                            <input placeholder='Email' type='email' className='n-input' value={signinEmail} onChange={(e)=>setSigninEmail(e.target.value)} />
                        </div>
                            <div>
                                <FaLock/>
                                <input placeholder='Password' type={!isEyeClicked ? 'password' : 'text'} className='n-input' value={signinPassword} onChange={(e)=>setSigninPassword(e.target.value)} />
                                {!isEyeClicked ? <FaEye onClick={()=>setIsEyeClicked(true)} /> : <FaEyeSlash onClick={()=>setIsEyeClicked(false)} />}
                            </div>
                        </div>
                        <button className='blu-btn' onClick={async()=>{
                            if(signinEmail.trim() && signinPassword.trim()){
                                const id = await signInUserWithEmailAndPassword(signinEmail,signinPassword) ?? 0
                                setSignInResponseId(id)
                                setSigninEmail('')
                                setSigninPassword('')
                            }
                        }}>SIGN IN</button>
                        <span>{responseMessageArray[signInResponseId]}</span>
                    </div>}
                    </Fragment>
                        </div>
                </div>
            </div> : <AuthUser/> }
        </div>
     );
}
 
export default User;
