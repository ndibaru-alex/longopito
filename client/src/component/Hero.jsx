import React, { useEffect, useState } from "react";

import {
    Container   
} from "reactstrap";
import { Link as Link2 } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from 'react-scroll';

import Image1 from '../assets/images/bg/1.jpg';
import Image2 from '../assets/images/bg/2.jpg';
import Image3 from '../assets/images/bg/3.jpg';
import { useDispatch, useSelector } from "react-redux";
import { fetchBanners } from "../store/banner-slice";

function Hero() {
    const {bannerList} = useSelector((state)=>state.bannerSlice)
    const dispatch = useDispatch()

    useEffect(()=>{
      dispatch(fetchBanners())
    },[dispatch])
    return ( 
        <>
         <section className="swiper-slider-hero position-relative d-block vh-100" id="home">
                    <Swiper spaceBetween={0}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        loop
                        navigation
                        autoplay
                    >
                        {
                            bannerList && bannerList.length > 0 ?
                            bannerList.slice(0,3).map((item)=>(
                                <SwiperSlide className="d-flex align-items-center overflow-hidden">
                                <div className="slide-inner slide-bg-image d-flex align-items-center" style={{ background: `url(${item?.image}) center center`,backgroundSize: 'cover', }}>
                                    <div className="bg-overlay"></div>
                                    <Container>
                                        <div className="row justify-content-center">
                                            <div className="col-12">
                                                <div className="title-heading text-center">
                                                    <h1 className="display-5 text-white title-dark fw-bold mb-4">{item?.title}</h1>
                                                    <p className="para-desc mx-auto text-white-50">{item?.description}</p>
    
                                                    <div className="mt-4 pt-2">
                                                        <Link to={item?.to} className="btn btn-primary">Make a difference</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Container>
                                </div>
                            </SwiperSlide>
                            ))
                            : null

                        }
                       

                       
                    </Swiper>
                </section>
        </>
     );
}

export default Hero;