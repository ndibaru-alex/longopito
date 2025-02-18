import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import Lightbox from 'react-18-image-lightbox';
import 'react-18-image-lightbox/style.css';
import { Col, Row, Card, CardBody, Container } from "reactstrap";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBanners } from '../store/banner-slice';




export default function AgencyProject() {
   
    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const {bannerList} = useSelector((state)=>state.bannerSlice)
    const dispatch = useDispatch()



    /**
     * Agency project section
     */

    

    useEffect(()=>{
        dispatch(fetchBanners())
    },[dispatch])

    return (
        <>
            {/* Project Start  */}
            <section className="section" id="portfolio">
                <Container>
                    <Row className="justify-content-center">
                        <Col>
                            <div className="section-title text-center mb-4 pb-2">
                                <h4 className="title mb-3">Our Works & Projects</h4>
                                <p className="text-muted mx-auto para-desc mb-0">Never doubt that a small group of thoughtful, committed citizens can change the world; indeed, it's the only thing that ever has "Margaret Mead"</p>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        {bannerList.map((item, index) => (
                            <Col lg={3} md={6} className="col-12 mt-4 pt-2" key={index}>
                                <Card className="border-0 project project-primary position-relative d-block overflow-hidden rounded">
                                    <CardBody className="p-0">
                                        <img src={item.image} className="img-fluid" alt="workimage" style={{width:'300px',height:"200px"}} />
                                        <div className="overlay-work bg-dark"></div>
                                        <div className="content">
                                            <h6 className="mb-0"><Link to="#" className="text-white title">{item.title}</Link></h6>
                                            <p className="text-light tag mb-0">{item.subtext}</p>
                                        </div>
                                        <div className="icons text-center">
                                           {/*<Link to="#" onClick={() => setIsOpen(true)} className="btn btn-icon btn-pills lightbox">
                                                <Icon.Camera className="fea icon-sm image-icon" /></Link> */}
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <>
                        {isOpen && (
                            <Lightbox
                                mainSrc={images[photoIndex]}
                                nextSrc={images[(photoIndex + 1) % images.length]}
                                prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                                onCloseRequest={() => setIsOpen(false)}
                                onMovePrevRequest={() =>
                                    setPhotoIndex(
                                        (photoIndex + images.length - 1) % images.length,
                                    )
                                }
                                onMoveNextRequest={() =>
                                    setPhotoIndex(
                                        (photoIndex + 1) % images.length,
                                    )
                                }
                            />
                        )}
                    </>
                </Container>
            </section>
            {/* Project End  */}
        </>
    )
}
