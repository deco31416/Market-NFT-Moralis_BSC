import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Transaction from "../transaction";
import { useState } from "react";

export default function Header() {

    const [transac, setTransact] = useState(false);

    const showTransac = () => {
        setTransact(!transac);
    };

    return(
        <div className="header-component">
            <Navbar bg="dark" variant="dark">
                <Container className="menu-desktop">
                    <Nav className="me-auto">
                        <Link className="nav-link" to="/">Marketplace</Link>
                        <Nav.Link href="#features">Graveyard</Nav.Link>
                        <Link className="nav-link" to="/profile">Profile</Link>
                        <Nav.Link href="#features">Stake</Nav.Link>
                        <Nav.Link href="#pricing">Booking VR</Nav.Link>
                        
                            <Transaction />
                        
                    </Nav>
                </Container>
                <Container className="menu-phone">
                    <Dropdown>
                        <Dropdown.Toggle 
                            className="menu-header-button-phone"
                            id="dropdown-basic">
                            <ion-icon className="menu-header-phone" name="menu-outline"></ion-icon>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="/">Marketplace</Dropdown.Item>
                            <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
            </Navbar>
            <br/>
        </div>);
}