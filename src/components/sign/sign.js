import { useState, setState } from 'react';
import { Form, FormText, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function Sign() {

    sessionStorage.removeItem('token');

    let navigate = useNavigate ();

    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirm, setConfirm] = useState(null);
    const [smShow, setSmShow] = useState(false);
    const [modalMessage, setModalMessage] = useState(null);

    const singIn = async () => {
        
        setSmShow(false);

        if (confirm !== password) {
            
            setModalMessage('Passwords are not equal');
            return setSmShow(true);

        }

        let formValues = [name, email, password];
        let showEmptys = false;

        for (let i = 0; i < formValues.length; i++) {

            if (formValues[i] === '' || formValues[i] === undefined || formValues[i] === null) {
                
                showEmptys = true;
                break;

            }

        }

        if (showEmptys) {

            setModalMessage('All fields are required');
            return setSmShow(true);

        }

        const formData = {

            nombre: name,
            email,
            password

        };

        const data = {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-type': 'application/json'
            }
        };

        try {

            const sing = await fetch(process.env.REACT_APP_SERVER + '/api/usuarios', data);
            const responseJson = await sing.json();
            
            console.log(responseJson);

            if (responseJson.error) {

                setModalMessage(responseJson.error);
                return setSmShow(true);

            }

            sessionStorage.setItem('token', responseJson.token);
            navigate('/');

        } catch(e) {
            
            console.log(e);

        }

    }

    return(
        <div className="sign-component">
            <Modal
                size="sm"
                show={ smShow }
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm">
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Error:
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>{ modalMessage }</Modal.Body>
            </Modal>
            <Form className="update-form">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="labels-profile">Enter name</Form.Label>
                    <Form.Control 
                        type="email" pla
                        placeholder="Name" 
                        className="inputs-profile"
                        onChange={ (e) => setName(e.target.value) } />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="labels-profile">Email address</Form.Label>
                    <Form.Control 
                        type="email" pla
                        placeholder="Enter email" 
                        className="inputs-profile"
                        onChange={ (e) => setEmail(e.target.value) } />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="labels-profile">Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        className="inputs-profile"
                        onChange={ (e) => setPassword(e.target.value) } />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="labels-profile">Confirm Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        className="inputs-profile"
                        onChange={ (e) => setConfirm(e.target.value) } />
                </Form.Group>
                
                <div className="d-grid gap-2">
                    <Button 
                        variant="primary" 
                        type="button" 
                        className="buy-button" 
                        onClick={ singIn }>
                        Submit
                    </Button>
                </div>
                <br/>
                <FormText className='redirects-forms'>
                    <Link to="/login">
                        <p>¿Already account? Login!</p>
                    </Link>
                </FormText>
                <br/>
                <FormText className='redirects-forms'>
                    <Link to="/password">
                        <p>¿Forgot password?</p>
                    </Link>
                </FormText>
            </Form>
        </div>
    )
}