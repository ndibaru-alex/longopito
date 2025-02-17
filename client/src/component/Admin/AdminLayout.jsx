import React, { useState } from "react";
import { Container, Row, Col, Nav, NavItem, NavLink, NavbarToggler, Collapse, NavbarBrand } from "reactstrap";
import { Outlet, Link, useNavigate } from "react-router-dom";
import * as Icon from 'react-feather';
import Logolight from "../../assets/images/logop.png";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/auth-slice";


const AdminLayout = () => {
  const [isOpen, setMenu] = useState(true);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Toggle the sidebar menu
  const toggleMenu = () => {
    setMenu(!isOpen);
  };

 const handleLogout = ()=>{
       dispatch(logOut())
       .then(()=>{
         navigate('/auth-login')
       })
 }

 

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}

        <div className="d-md-none justify-content-between btn">
        <NavbarToggler onClick={toggleMenu}>
            <Icon.Menu />
          </NavbarToggler>                
        
        </div>
       
        <Col
          md={2} className={`bg-dark text-white vh-screen p-3 ${isOpen ? 'd-block' : 'd-none d-md-block'}`}
        >
          <NavbarBrand className="navbar-brand mb-3 " href="/">
            <img src={Logolight} className="logo-dark-mode  " alt="" style={{width:'400px'}} />
          </NavbarBrand>

          {/* Mobile Toggle Button */}
          

          <h4 className="text-center mt-4">Admin Panel</h4>
          
          
          {/* Collapse the menu on mobile */}
          <Collapse isOpen={isOpen} navbar>
            <Nav vertical className="gap-3">
              <NavItem>
                <NavLink tag={Link} to="/admin/banner" className="text-white">
                  📢 Banner
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/admin/teams" className="text-white">
                  👥 Team
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/admin/messages" className="text-white">
                  👥 Messages
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/admin/users" className="text-white">
                  👥 Users
                </NavLink>
              </NavItem>
              <button onClick={handleLogout} className="btn btn-primary ">LogOut</button>
            </Nav>
          </Collapse>
        </Col>

        {/* Main Content */}
        <Col md={9} className="p-4">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLayout;
