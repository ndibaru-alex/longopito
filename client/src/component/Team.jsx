import React, { useEffect } from 'react'
import {
    Col, Container, Row, Nav, CardBody, Card,
   
} from "reactstrap";

import { useDispatch, useSelector } from 'react-redux';
import { fetchTeams } from '../store/team-slice';

export default function Team() {

    const {teams} = useSelector((state)=>state.teamSlice)
    const dispatch = useDispatch()

   

    useEffect(()=>{
        dispatch(fetchTeams())
    },[dispatch])

  return (
    <section className="section overflow-hidden" id="team">
                    <Container>
                        <Row className="justify-content-center">
                            <div className="col-12">
                                <div className="section-title text-center mb-4 pb-2">
                                    <h4 className="title mb-3">Meet the Team </h4>
                                    
                                </div>
                            </div>
                        </Row>

                        <Row>
                            {teams.map((item, key) => (
                                <Col lg={3} md={6} className="mt-4 pt-2" key={key}>
                                    <Card className="border-0 text-center shadow border-0 overflow-hidden rounded">
                                        <img src={item?.image} className="img-fluid" alt="" />
                                        <CardBody>
                                            <h5 className="mb-1">{item?.Name}</h5>
                                            <small className="text-muted">{item?.title}</small>
                                        </CardBody>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                   
    </section>
  )
}
