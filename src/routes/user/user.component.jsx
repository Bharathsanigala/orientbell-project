import { Fragment,  useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import 'animate.css'

const User = () => {

    const [isSignUpClicked,setIsSignUpClicked]=useState(false);

    return ( 
        <div className='user-div'>
        <h1>User Space</h1>
            <div className='no-user '>
                <div className='google-signin'>
                    <div className='inner-block'>
                    <h2>Welcome Back !</h2>
                    <span>To keep connected with us please login with your personal info</span>
                    <div className='btn-group'>
                        <div><FcGoogle/></div>
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
                            <input placeholder='Name' type='text' className='n-input' />
                        </div>
                            <div>
                        <MdEmail/>
                            <input placeholder='Email' type='email' className='n-input' />
                        </div>
                            <div>
                                <FaLock/>
                                <input placeholder='Password' type='password' className='n-input' />
                            </div>
                        </div>
                        <button className='blu-btn'>SIGN UP</button>
                    </div> :
                    <div className='signin'>
                        <h2>Login to your Account</h2>
                        <div className='entry'>
                        <div>
                        <MdEmail/>
                            <input placeholder='Email' type='email' className='n-input' />
                        </div>
                            <div>
                                <FaLock/>
                                <input placeholder='Password' type='password' className='n-input' />
                            </div>
                        </div>
                        <button className='blu-btn'>SIGN IN</button>
                    </div>}
                    </Fragment>
                        </div>
                </div>
            </div>
        </div>
     );
}
 
export default User;
