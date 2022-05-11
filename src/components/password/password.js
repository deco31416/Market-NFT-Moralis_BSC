import { useState } from 'react';
import { Form, FormText, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { decodeToken } from "react-jwt";

export default function Password() {

    let navigate = useNavigate();

    const [token, setToken] = useState(false);
    const [sended, setSended] = useState(false);
    const [email, setEmail] = useState(null);
    const [smShow, setSmShow] = useState(false);
    const [modalMessage, setModalMessage] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState(0);
    const [emailCode, setEmailCode] = useState(0);

    const sendMessage = async () => {

        const formData = { email };

        const data = {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-type': 'application/json'
            }
        };

        try {

            const sing = await fetch(process.env.REACT_APP_SERVER + '/api/usuarios/reset', data);
            const responseJson = await sing.json();
            
            console.log(responseJson);

            if (responseJson.error) {

                setModalMessage(responseJson.error);
                return setSmShow(true);

            }

            setToken(responseJson.token);
            setSended(true);
            setModalMessage('Verification code sended to your email');
    
        } catch(e) {
            
            console.log(e);
    
        }

    };

    const resetPassword = async () => {

        try {

            if (password !== confirm) {

                setSmShow(true); 
                return setModalMessage('Password must be equals');

            }

            const values = decodeToken(token);

            console.log(values);

            setEmailCode(values.code);

            if (code.toString() !== emailCode.toString()) {

                console.log(code.toString(), emailCode.toString());

                setSmShow(true); 
                return setModalMessage('Verification code is not valid');

            }

            const id = decodeToken(token)._doc._id;
            const formData = { id, password, email };
            const data = {
                method: 'PUT',
                body: JSON.stringify(formData),
                headers: {
                    'Content-type': 'application/json',
                    'auth-token': token
                }
            };

            const sing = await fetch(process.env.REACT_APP_SERVER + '/api/profiles/' + id, data);
            const responseJson = await sing.json();
    
            console.log(responseJson);

            if (responseJson.error) {

                setModalMessage(responseJson.error);
                return setSmShow(true);

            }
    
            setSended(true);
            setModalMessage('Password changed sucesfully');
            navigate('/login');

        } catch(e) {
            
            console.log(e);
    
        }

    };

    return(
        <div className="reset-password-component">
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
            { sended === false ?
                <Form className="update-form">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="labels-profile">Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            onChange={ (e) => setEmail(e.target.value) } 
                            placeholder="Enter email" 
                            className="inputs-profile" />
                    </Form.Group>
                    
                    <div className="d-grid gap-2">
                        <Button variant="primary" type="button" onClick={ sendMessage } className="buy-button">
                            Send Message
                        </Button>
                    </div>
                </Form>

                :

                <Form className="update-form">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="labels-profile">Recovery Code</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter recovery code" 
                            className="inputs-profile"
                            onChange={ (e) => { setCode(e.target.value) } } />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="labels-profile">New password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            className="inputs-profile"
                            onChange={ (e) => { setPassword(e.target.value) } } />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="labels-profile">Confirm new password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Confirm password" 
                            className="inputs-profile"
                            onChange={ (e) => { setConfirm(e.target.value) } } />
                    </Form.Group>
                    
                    <div className="d-grid gap-2">
                        <Button 
                            variant="primary" 
                            type="button" 
                            onClick={ resetPassword } 
                            className="buy-button">
                            Reset Password
                        </Button>
                    </div>
                </Form>

            }

        </div>
    )
}