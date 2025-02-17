import React, { useState } from "react";
import { Col, Container, Card, Row } from "reactstrap";
import Donate from '../component/Donate'

import { Link as Link2 } from 'react-router-dom';
import { Link } from 'react-scroll';
import About from '../assets/images/longo1.jpg'

import ModalVideo from "react-modal-video";
import "../../node_modules/react-modal-video/scss/modal-video.scss";



export default function Feature() {
    const [videoModal, setModal] = useState(false);

    

    return (
        <>
            {/*  Services START  */}
            <section className="section bg-light" id="service">
                    <Container>
                        <div className="row justify-content-center">
                            <Col lg={12} >
                                <div className="features-absolute rounded shadow px-4 py-5 bg-white">
                                    <div className="section-title text-center mb-4 pb-2">
                                    <h4>Core Values</h4>
                                    </div>
                                    
                                    <Row>
                                        <div className="col-lg-4 col-md-6">
                                            <div className="d-flex features feature-primary">
                                                
                                                <div className="flex-1 ms-3">
                                                    <h5 className="mt-0">Service</h5>
                                                    <p className="text-muted mb-0">We are committed to serving the Longopito Primary School community selflessly and with
                                                    dedication</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-4 col-md-6 mt-4 pt-4 mt-sm-0 pt-sm-0">
                                            <div className="d-flex features feature-primary">
                                                
                                                <div className="flex-1 ms-3">
                                                    <h5 className="mt-0">Integrity</h5>
                                                    <p className="text-muted mb-0">We uphold high ethical standards in all our activities, ensuring transparency and
                                                    accountability</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-4 col-md-6 mt-4 pt-4 mt-lg-0 pt-lg-0">
                                            <div className="d-flex features feature-primary">
                                                
                                                <div className="flex-1 ms-3">
                                                    <h5 className="mt-0">Collaboration</h5>
                                                    <p className="text-muted mb-0">We foster partnerships and collaboration with the school administration, teachers,
                                                    parents, and local organizations</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-4 col-md-6 mt-4 pt-4">
                                            <div className="d-flex features feature-primary">
                                                
                                                <div className="flex-1 ms-3">
                                                    <h5 className="mt-0">Innovation</h5>
                                                    <p className="text-muted mb-0">We embrace creative and innovative approaches to address the unique needs of
                                                            Longopito Primary School.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-4 col-md-6 mt-4 pt-4">
                                            <div className="d-flex features feature-primary">
                                                
                                                <div className="flex-1 ms-3">
                                                    <h5 className="mt-0">Empowerment</h5>
                                                    <p className="text-muted mb-0">We empower students, teachers, and parents to participate actively in the school's development and growth.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        
                                    </Row>
                                </div>
                            </Col>
                        </div>
                    </Container>

                    <div className="container mt-100 mt-60">
                        <div style={{ background: `url(${Map}) center center` }}>
                            <div className="row align-items-center">
                                <div className="col-lg-5 col-md-5">
                                    <div className="position-relative me-lg-5">
                                        <img src={About} className="rounded img-fluid mx-auto d-block" alt=""  />
                                        <div className="play-icon">
                                            <Link2 to="#" onClick={() => setModal(true)} data-type="youtube" data-id="yba7hPeTSjk" className="play-btn lightbox">
                                                <i className="mdi mdi-play text-primary rounded-circle bg-white shadow"></i>
                                            </Link2>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-7 col-md-7 mt-4 pt-2 mt-sm-0 pt-sm-0">
                                    <div className="section-title">
                                        <h2 className="title mb-3">LONGOPITO PROJECT</h2>
                                        <p className="text-black">
                                        Longopito Primary School is a community based primary school sponsored by CEB. It is located
                                        in Isiolo County, in the northern eastern side of Oldonyiro centre 25 KM away and 20KM away
                                        from Kipsing center. It is the only primary school within a radius of 20 KM. The school started
                                        as an ECD feeder school in 2001 until 2019 when it received independent status. It was given a
                                        certificate of registration by the Ministry of Education on March 2023. The school runs the CBC
                                        program from PP1 to Grade 5. It has noted increased enrolment though it is yet to receive Free
                                        Primary Education “FPE” funds from the government.
                                            The general climate of the area is semi-arid, with very little rainfall received in the area. The main
                                        economic activity for people in the area is nomadic pastoralism.
                                        </p>
                                        <ul className="list-unstyled feature-list ">
                                           
                                           <h6>Vision</h6>
                                           <li className="mb-1">To empower the students of Longopito Primary School through quality education, infrastructure development, and holistic support, creating a brighter future for the community.
                                           </li>
                                           <h6>Mission
                                           </h6>
                                           <li className="mb-1">To engage Rotaractors in meaningful community service projects at Longopito Primary School, collaborate with school stakeholders, and promote sustainable development to improve the overall learning environment
                                           </li>
                                           
                    
                                           
                                            
                                        </ul>

                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* popup video */}

                    <div className="container mt-5" id="donate">
                        <Row>
                         <Donate />
                        </Row>
                    </div>
                </section>
                 {/* popup video */}
 <ModalVideo
 channel="youtube"
 isOpen={videoModal}
 videoId="yba7hPeTSjk"
 onClose={() => setModal(false)}
/>
        </>
    
    )
};

