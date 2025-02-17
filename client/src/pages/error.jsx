import React, { Component } from "react";
import { Row } from "reactstrap";
import { Link } from 'react-router-dom';

import ErrorImage from '../assets/images/error.png';
import Image from '../assets/images/logo-icon-48.png';

export default function Error() {

    return (
        <>
            <section className="position-relative bg-soft-primary">
                <div className="container-fluid">
                    <Row>
                        <div className="col-12 p-0">
                            <div className="d-flex flex-column min-vh-100 justify-content-center px-md-5 py-5 px-4">
                                <div className="text-center">
                                    <Link to="#"><img src={Image} alt="" /></Link>
                                </div>
                                <div className="title-heading text-center my-auto">
                                    <img src={ErrorImage} className="img-fluid" alt="" />
                                    <h1 className="mb-3 mt-5 text-dark">UnAuthorised user </h1>
                                    <p className="text-muted">Whoops, this is embarassing. <br /> Looks like the page you were looking for wasn't found.</p>

                                    <div className="mt-4">
                                        <Link to="/" className="back-button btn btn-primary">Back to Home</Link>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="mb-0 text-muted">© {(new Date().getFullYear())}{" "} Motos. Design with <i className="mdi mdi-heart text-danger"></i> by <Link to="#" className="text-reset">Shreethemes</Link>.</p>
                                </div>
                            </div>
                        </div>
                    </Row>
                </div>
            </section>
        </>
    )
};