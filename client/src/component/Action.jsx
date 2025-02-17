import React from 'react'
import { Col, Container, Card, Row } from "reactstrap";

import CTA from '../assets/images/bg/cta.png';
import { Link as Link2 } from 'react-router-dom';

export default function Action() {
  return (
    <section className="section" style={{ background: `url(${CTA}) center` }}>
    <div className="bg-overlay"></div>
    <Container>
        <div className="row justify-content-center">
            <div className="col">
                <div className="section-title text-center">
                    <h4 className="title text-white mb-3">Ready to start your next web project now?</h4>
                    <p className="text-white-50 mx-auto para-desc mb-0">Launch your campaign and benefit from our expertise on designing and managing conversion centered bootstrap v5 html page.</p>

                    <div className="mt-4 pt-2">
                        <Link2 to="#" className="btn btn-primary">Get Started !</Link2>
                    </div>
                </div>
            </div>
        </div>
    </Container>
</section>
  )
}
