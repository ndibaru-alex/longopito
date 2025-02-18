import React, { useState } from "react";
import { Col, Row, Card, CardBody } from "reactstrap";
import { Link, useNavigate } from 'react-router-dom';
import * as Icon from 'react-feather';

import BackgroundImage from '../../assets/images/longo1.jpg';
import Logo from '../../assets/images/logop.png';
import { useDispatch } from "react-redux";
import { logInUser } from "../../store/auth-slice";

const initialState = {   
    email : '',
    password : ''
  }
export default function Login() {
     const [formData , setFormData] = useState(initialState)

     const dispatch = useDispatch()
     const navigate = useNavigate()
     
     const handleChange = (event)=>{
        const {name,value} = event.target
        setFormData({
            ...formData,
            [name] : value
        })
    }

    const onSubmit = (event)=>{
        event.preventDefault()
        dispatch(logInUser(formData))
        .then((data)=>{
            if(data?.payload?.success){
                alert('Logged In successfully')
                navigate('/')
            }else{
                alert("error while signing in check your passWord")
            }
        })
    }

    
    return (
        <>
            <div className="back-to-home">
                <Link to="/" className="back-button btn btn-icon btn-primary"><Icon.ArrowLeft className="icons" /></Link>
            </div>
            {/* Hero Start */}
            <section className="cover-user bg-white">
                <div className="container-fluid px-0">
                    <Row className="g-0 position-relative">
                        <Col lg={4} className="cover-my-30 order-2">
                            <div className="cover-user-img d-flex align-items-center">
                                <Row>
                                    <div className="col-12">
                                        <div className="d-flex flex-column auth-hero">
                                            <div className="mt-md-5 text-center">
                                                <Link to="#"><img src={Logo} alt="" style={{width:'400px'}}/></Link>
                                            </div>
                                            <div className="title-heading my-lg-auto">
                                                <Card className="login-page border-0" style={{ zIndex: 1 }}>
                                                    <CardBody className="p-0">
                                                        <h4 className="card-title">Login</h4>
                                                        <form className="login-form mt-4" onSubmit={onSubmit}>
                                                            <Row>
                                                                <Col lg={12} >
                                                                    <div className="mb-3">
                                                                        <label className="form-label">Your Email <span className="text-danger">*</span></label>
                                                                        <input type="email" className="form-control" placeholder="Email" 
                                                                         name="email" value={formData.email} onChange={handleChange} required
                                                                         />
                                                                    </div>
                                                                </Col>

                                                                <Col lg={12} >
                                                                    <div className="mb-3">
                                                                        <label className="form-label">Password <span className="text-danger">*</span></label>
                                                                        <input type="password" className="form-control" placeholder="Password"
                                                                         name="password" value={formData.password} onChange={handleChange} required />
                                                                    </div>
                                                                </Col>

                                                                <Col lg={12} >
                                                                    <div className="d-flex justify-content-between">

                                                                </Col>

                                                                <div className="col-lg-12 mb-0">
                                                                    <div className="d-grid">
                                                                        <button type="submit" className="btn btn-primary">Sign in</button>
                                                                    </div>
                                                                </div>

                                                                <div className="col-12">

                                                                </div>
                                                            </Row>
                                                        </form>
                                                    </CardBody>
                                                </Card>
                                            </div>
                                            <div className="mb-md-5 text-center">
                                                <p className="mb-0 text-muted">© {(new Date().getFullYear())}{" "} RAC Milimani <i className="mdi mdi-heart text-danger"></i> by <a href="https://alexander-ndibaru.vercel.app/"  target="_blank" 
  rel="noopener noreferrer" className="text-reset">XanderTech</a>.</p>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                            </div>
                        </Col>

                        <div className="col-lg-8 offset-lg-4 padding-less img order-1" style={{ backgroundImage: `url(${BackgroundImage})` }} data-jarallax='{"speed": 0.5}'></div>
                    </Row>
                </div>
            </section>
            {/* end section */}
        </>
    )
}
