import { Fragment, useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavImage from '../../assets/meeting-svgrepo-com.svg';
import './navbar.styles.scss'
import { FaSun } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { FaEllipsisVertical } from "react-icons/fa6";

const NavBar = () => {

    const [theme,setTheme]=useState(true);
    const navigateRouter = useNavigate();
    const [isDropdownOpen,setIsDropdownOpen]=useState(false);
    const ellipsisRef = useRef(null);
    const dropdownRef = useRef(null);   

    useEffect(()=>{
        if(isDropdownOpen){
            const handleClickOutside=(event)=>{
                if(ellipsisRef.current && !ellipsisRef.current.contains(event.target) && dropdownRef.current && !dropdownRef.current.contains(event.target)){
                    setIsDropdownOpen(false);
                }
            }
            document.addEventListener('click',handleClickOutside);
            return ()=> document.removeEventListener('click',handleClickOutside);
        }
    },[isDropdownOpen])

    useEffect(()=>{
        document.body.className=theme ? 'dark-theme' : 'light-theme';
    },[theme])

    return ( 
        <Fragment>
        <nav className="navbar-container">
        <div onClick={()=>navigateRouter('/')} className="nav-img-div">
                <img src={NavImage}  />
                <p>Meet</p>
            </div>
            <ul className="nav-ul">
                <li onClick={()=>navigateRouter('/meet-type')} className="nav-li">Book Meeting</li>
                <li onClick={()=>navigateRouter('/my-meetings')} className="nav-li">My Meetings</li>
                <li className="user nav-li" onClick={()=>navigateRouter('/user')}><FaCircleUser/></li>
                <li className="options" onClick={()=>setIsDropdownOpen(true)} ref={ellipsisRef}><FaEllipsisVertical/></li>
                <li className="theme" onClick={()=>setTheme(prev=>!prev)}>{theme ? <FaSun/> : <FaMoon/>} </li>
            </ul>
            {isDropdownOpen && <div className="options-div animate__animated animate__slideInDown" ref={dropdownRef}>
                <span onClick={
                    ()=>{navigateRouter('/meet-type')
                     setIsDropdownOpen(false)}
                    }>Book Meetings</span>
                <span onClick={
                    ()=>{navigateRouter('/my-meetings')
                     setIsDropdownOpen(false)}
                    }>My Meetings</span>
                <span onClick={
                    ()=>{navigateRouter('/user')
                     setIsDropdownOpen(false)}
                    }>User</span>
            </div>}
        </nav>
        <Outlet/>
        </Fragment>
     );
}
 
export default NavBar;