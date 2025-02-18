import React, { useState } from 'react'
import { Link } from 'react-scroll';
import { Link as Link2 } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Icon from 'react-feather';
import {
    NavbarBrand,
    NavbarToggler,
    NavItem,
    Nav,
    Collapse
} from "reactstrap";
// Import Logo
import Logopito from '../assets/images/logopito.png'
import Logolight from "../assets/images/logo-light.png";
import LogoLanding from '../assets/images/logo-landing.png'
import { logOut } from '../store/auth-slice';


 function NavbarPage() {
    const {isAuthenticated,isLoading,user} = useSelector((state)=>state.auth)
    const [isOpen, setMenu] = useState(true);
    const dispatch = useDispatch()

    window.addEventListener("scroll", windowScroll);

    function windowScroll() {
        const navbar = document.getElementById("navbar");

        if (
            document.body.scrollTop >= 50 ||
            document.documentElement.scrollTop >= 50
        ) {
            navbar.classList.add("nav-sticky");
        } else {
            navbar.classList.remove("nav-sticky");
        }

        const mybutton = document.getElementById("back-to-top");

        if (
            document.body.scrollTop >= 500 ||
            document.documentElement.scrollTop >= 500
        ) {
            mybutton.classList.add("block");
        } else {
            mybutton.classList.add("none");

        }
    }
    const toggleMenu = () => {
        setMenu(!isOpen)
    }

    const handleLogOut = ()=>{
          dispatch(logOut())
    }

    console.log(user?.role)
    return (
        <>
           <nav id="navbar" className="navbar navbar-expand-lg nav-light fixed-top sticky">
                    <div className="container">
                        <NavbarBrand className="navbar-brand" href="/">
                            <span className="logo-light-mode">
                                <img src={Logopito} className="l-dark logo-image" style={{width: '300px',
                                    height:'120px',filter: 'brightness(0.8) contrast(1.2)',                                
                                   marginTop: '-10px',
                                   
                                    }} alt="" />
                                <img src={Logopito} className="l-light" style={{width: '300px',
                                    height:'120px',filter: 'brightness(1.3) contrast(1.2)',                                
                                    marginTop: '-10px',                                    
                                    }} alt="" />
                            </span>
                            <img src={Logopito} className="logo-dark-mode" alt="" />
                        </NavbarBrand>

                        <NavbarToggler onClick={toggleMenu}>
                            <Icon.Menu style={{marginRight:'37px'}} />
                        </NavbarToggler>

                        <Collapse className={`navbar-collapse ${isOpen === true ? 'hidden' : 'show'}`} id="navbarSupportedContent">
                            <Nav className="navbar-nav ms-auto mb-2 mb-lg-0" id="navbar-navlist">
                                <NavItem>
                                    <Link activeClass="active" to="home" spy={true} smooth={true} duration={500} className="nav-link">Home</Link>
                                </NavItem>
                                <NavItem>
                                    <Link activeClass="active" to="service" spy={true} smooth={true} duration={500} className="nav-link">About</Link>
                                </NavItem>
                                <NavItem>
                                    <Link activeClass="active" to="project" spy={true} smooth={true} duration={500} className="nav-link">Portfolio</Link>
                                </NavItem>
                                
                                <NavItem>
                                    <Link activeClass="active" to="team" spy={true} smooth={true} duration={500} className="nav-link">Team</Link>
                                </NavItem>
                               
                                <NavItem>
                                    <Link activeClass="active" className="nav-link" to="contact" spy={true} smooth={true} duration={500} >Contact Us</Link>
                                </NavItem>
                            </Nav>

                            <ul className="list-inline menu-social mb-0 ps-lg-4 ms-2 mypad">

                              {
                                !user ?(
                                    <li className="list-inline-item"><Link2 to="/auth-login" className="btn btn-primary">Login</Link2></li>                     
                                )
                                : (
                                    <li className="list-inline-item"><button onClick={handleLogOut} className="btn btn-primary">LogOut</button></li>  
                                )
                                
                              }  

                              {
                                user?.role === 'admin' && (
                                    <li className="list-inline-item"><Link2 to="/admin/banner" className="btn btn-primary">Admin</Link2></li>    
                                )
                              }
 
                                 <li className="list-inline-item"><Link to="donate" className="btn btn-primary">Donate</Link></li>
                                 
                            </ul>
                            
                        </Collapse>

                    </div>

                </nav>
        </>
    )
}

export default NavbarPage;
