import React, { useState } from "react";
import {
    Col, Container, Row, Nav, CardBody, Card,
   
} from "reactstrap";

import { Link } from 'react-scroll';

import * as Icon from 'react-feather';




import Contact from "../../component/Contact";
import AgencyProject from "../../component/AgencyProject";
import Header from '../../component/Navbar'
import Features from '../../component/Feature'
import Hero from '../../component/Hero'

import Team from '../../component/Team'
import Footer from '../../component/Footer'


import SwiperCore, { Autoplay, Navigation } from 'swiper';
import "../../../node_modules/swiper/swiper.scss";
import "../../../node_modules/swiper/components/navigation/navigation.scss";
import "../../../node_modules/swiper/components/pagination/pagination.scss";

// Modal Video
import ModalVideo from "react-modal-video";
import "../../../node_modules/react-modal-video/scss/modal-video.scss";




SwiperCore.use([Autoplay, Navigation]);

export default function Startup() {

    
    const [isOpen, setMenu] = useState(true);

    window.addEventListener("scroll", windowScroll);

   
    /**
     * Window scroll 
     */
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
   

    return (
        <>
            <div>
              
                <Header/>                           
                <Hero/>               
                <Features/>        
            
                <AgencyProject />
                <Team/>

                <Contact />              
                <Footer/>
                {/* Back to top */}
                <Link to="home" id="back-to-top" className="back-to-top rounded-pill fs-5"><Icon.ArrowUp className="fea icon-sm icons align-middle" /></Link>
                {/* Back to top  */}
            </div>
           

        </>
    )

}

