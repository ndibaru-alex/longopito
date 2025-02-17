import React, { Component, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import FormTemp from '../component/FormTemp'
import { useDispatch } from "react-redux";
import { createMessage } from "../store/message-slice";

const initialFormData = {
    fullName: "",
    email: '',
    subject: '',
    message : '',
};

export default function Contact() {
    const [formData,setFormData] = useState(initialFormData)
    const dispatch =  useDispatch()

    const conatctData = [
        {
            label: "Name",
            name: "fullName",
            componentType: "input",
            placeholder: "Full Name",
          },
        {
          label: "Email",
          name: "email",
          componentType: "input",
          type: "email",
          placeholder: "your email",
        },
        {
            label: "Subject",
            name: "subject",
            componentType: "input",
            type: "text",
            placeholder: "Subject:",
          },
          {
            label: "Message",
            name: "message",
            componentType: "textarea",            
            placeholder: "Message",
          },

      ]

      const onSubmit = (event)=>{
        event.preventDefault()

        if(!formData.email || !formData.message){
          alert('please enter email and your message')
          return;
        }
        dispatch(createMessage(formData))
        .then((data)=>{
            if(data?.payload?.success){
                alert('message sent successfully')
                setFormData(initialFormData)
            }
        })
        
      }

    return (
        <>
            {/* Start Contact  */}
            <section className="section" id="contact">
                <Container>
                    <Row className="justify-content-center">
                        <Col>
                            <div className="section-title text-center mb-4 pb-2">
                                <h4 className="title mb-3">Get In Touch !</h4>
                                <p className="text-muted para-desc mb-0 mx-auto">Have questions or need assistance? We're here to help! Reach out to us.</p>
                            </div>
                        </Col>
                    </Row>

                    <Row className="align-items-center">
                        <Col lg={7} md={6} className="order-md-2 order-1 mt-4 pt-2">
                            <div className="p-4 rounded shadow bg-white">
                                <FormTemp
                                formControls={conatctData}
                                formData={formData}
                                setFormData={setFormData}
                                onSubmit={onSubmit}
                                />

                            </div>
                        </Col>

                        <Col lg={5} md={6} className="col-12 order-md-1 order-2 mt-4 pt-2">
                            <div className="me-lg-4">
                                <div className="d-flex">
                                    <div className="icons text-center mx-auto">
                                        <i className="uil uil-phone d-block rounded h4 mb-0"></i>
                                    </div>

                                    <div className="flex-1 ms-3">
                                        <h5 className="mb-2">Phone</h5>
                                        <Link to="tel:+152534-468-854" className="text-muted">+254705875302</Link>
                                    </div>
                                </div>

                                <div className="d-flex mt-4">
                                    <div className="icons text-center mx-auto">
                                        <i className="uil uil-envelope d-block rounded h4 mb-0"></i>
                                    </div>

                                    <div className="flex-1 ms-3">
                                        <h5 className="mb-2">Email</h5>
                                        <Link to="mailto:contact@example.com" className="text-muted">racmilimani@gmail.com</Link>
                                    </div>
                                </div>

                                <div className="d-flex mt-4">
                                    <div className="icons text-center mx-auto">
                                        <i className="uil uil-map-marker d-block rounded h4 mb-0"></i>
                                    </div>

                                    <div className="flex-1 ms-3">
                                        <h5 className="mb-2">Location</h5>
                                        <p className="text-muted mb-2">Bihi Towers, Nairobi</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* End Contact  */}
        </>
    )
}