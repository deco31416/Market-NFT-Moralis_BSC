import { Row, Col, Card, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Transaction from '../transaction';

export default function Login() {

    sessionStorage.removeItem('token');

    return(
        <div className="home-component">
            {/*<img className='home-img' 
                src="https://tvazteca.brightspotcdn.com/ad/76/86e8a7aa4b999235dc6beb3d8d3b/que-son-y-para-que-sirven-las-nfts.jpg" />
            
            <Card body className="dashboard-card">
                <Link to="/login">
                    <div className='background-inset'>
                        <h3>LOGIN</h3>
                    </div>
                </Link>
            </Card>
        
            <Card body className="dashboard-card">
                <Link to="/sign">
                    <div className='background-inset'>
                        <h3>SIGN-IN</h3>
                    </div>
                </Link>
            </Card>*/}

            <Card body className="dashboard-card" onClick={ <Transaction /> }>
                
                <Link to="/">
                    <div className='background-inset'>
                        <h3>SIGN-IN MORALIS METAMASK</h3>
                    </div>
                </Link>
            </Card>
            
        </div>
    )
}