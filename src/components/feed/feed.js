import { Card, Button, Row, Col, Container } from "react-bootstrap";
import Header from "../header/header";
import Filter from "../filter/filter";
import { useState, useEffect, useContext } from "react";
import { MarketContext } from "../../context";
import { useJwt, isExpired } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { useMoralis, useWeb3Transfer } from "react-moralis";

export default function Feed () {

    let navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const isMyTokenExpired = isExpired(token);
    
/*    useEffect(() => {

        if (token === null || token === undefined || token === '') {

            //navigate('/login');
            navigate('/home');
    
        }
    
        if (isMyTokenExpired) {
    
            //navigate('/login');
            navigate('/home');
    
        }

    });
*/

    const [toggleFilter, setToggleFilter] = useState(false);
    const [toggleStyle, setToggleStyle] = useState({ 'display': 'none' });


    let { nfts } = useContext(MarketContext);

    const toggleFilterTrigger = () => {

        setToggleFilter(!toggleFilter);
        toggleFilter ? setToggleStyle({ display: 'inherit' }) : setToggleStyle({ display: 'none' });

    };

    return(
        <div className="container-marketplace">
            <Header></Header>
            <Row>
                <Col>
                    <ion-icon 
                        id="options"
                        name="options-outline" 
                        onClick={ toggleFilterTrigger }></ion-icon>
                </Col>
            </Row>
            <div className="marketplace">
                <Filter styles={toggleStyle} />
                <Container fluid>
                    <Row 
                        xs = { 1 } 
                        md = { 2 } 
                        lg = { 3 } 
                        xl = { 4 } 
                        className = "g-4">
                        {
                            nfts.map((nft, idx) => (
                                <Col key={ idx }>
                                    <Card style={{ width: '14rem', heigth: '50rem' }}>
                                        <Card.Img 
                                            variant="top" 
                                            src="https://www.todosahora.com/wp-content/uploads/2021/08/NFT.jpg" />
                                        <Card.Body>
                                            <Card.Title>
                                                <h5>{ nft.name }</h5>
                                            </Card.Title>
                                            <Card.Text>
                                                <strong>{ nft.price } { nft.unity }</strong>
                                            </Card.Text>
                                            <div className="d-grid gap-2">
                                                <Button 
                                                    className="buy-button" 
                                                    onClick={ () => console.log('hello') } 
                                                    variant="primary" 
                                                    size="sm">
                                                    <strong>Unlock Wallet</strong>
                                                </Button>
                                            </div>
                                            <Card.Footer className="text-muted">
                                                <p>See the open rate</p>
                                            </Card.Footer>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                </Container>
            </div>
        </div>
    );
}
