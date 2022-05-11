import { Form, Button } from "react-bootstrap";
import Header from "../header/header";
import { isExpired, useJwt } from 'react-jwt';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

export default function Profile() {

    let navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const isMyTokenExpired = isExpired(token);
    
    useEffect(() => {

        if (token === null || token === undefined || token === '') {

            navigate('/login');
    
        }
    
        if (isMyTokenExpired) {
    
            navigate('/login');
    
        }

    });

    return(
        <div className="profile-component">
            <Header />
            <div className="profile-container">
                
                <Form className="update-form">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="labels-profile">Username</Form.Label>
                        <Form.Control 
                            className="inputs-profile" 
                            type="text" 
                            placeholder="Enter username" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="labels-profile">Email address</Form.Label>
                        <Form.Control 
                            className="inputs-profile" 
                            type="email" 
                            placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="labels-profile">Password</Form.Label>
                        <Form.Control 
                            className="inputs-profile" 
                            type="password" 
                            placeholder="Password" />
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button className="buy-button" variant="primary" size="sm">
                            <strong>Change Profile Data</strong>
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}