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
<Navbar key="lg" expand="lg" className="bg-body-tertiary mb-3"  bg="primary" data-bs-theme="dark">
          <Container fluid>
            <Navbar.Brand href="#">Gold Loan</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-$"lg"`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-$"lg"`}
              aria-labelledby={`offcanvasNavbarLabel-expand-$"lg"`}
              placement="end"
            >
              <Offcanvas.Header closeButton >
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-$"lg"`}>
                  Gold Loan
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


        </>
    );
}