'use client';

import { useState } from 'react';

import { NavLink } from '_components';
import { useUserService } from '_services';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

export { NavB };

interface Props {
    children: React.ReactNode;
  }
function NavB() {
    const [loggingOut, setLoggingOut] = useState<boolean>(false);
    const userService = useUserService();

    async function logout() {
        setLoggingOut(true);
        await userService.logout();
    }

    return (


<>
<Navbar key="lg" expand="lg" className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-$"lg"`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-$"lg"`}
              aria-labelledby={`offcanvasNavbarLabel-expand-$"lg"`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-$"lg"`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="primary" href="/" className='bg-blue-600'>Search</Button>
                </Form>
                  <Nav.Link>HOME</Nav.Link>
                  <Nav.Link href="/users">USERS</Nav.Link>
                  <Nav.Link href="/loans">LOANS</Nav.Link>
                  <Button variant="danger" onClick={logout} className='bg-red-600'>LOGOUT</Button>

                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>


        <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
            <div className="navbar-nav">
                <NavLink href="/" exact className="nav-item nav-link">Home</NavLink>
                {/* <a href="users" className="nav-item nav-link">user </a> */}
                <NavLink href="/users" className="nav-item nav-link">Users</NavLink>
                <NavLink href="/loans" className="nav-item nav-link" >
                    {/* <span className="spinner-border spinner-border-sm"></span> */}
                    <span>Loans</span></NavLink>
                <button onClick={logout} className="btn btn-link nav-item nav-link" style={{ width: '67px' }} disabled={loggingOut}>
                    {loggingOut
                        ? <span className="spinner-border spinner-border-sm"></span>
                        : <span>Logout</span>
                    }
                </button>
            </div>
        </nav>
        </>
    );
}