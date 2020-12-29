import React from 'react'
import { Container, Col, Row} from "react-bootstrap";
import { Link } from 'react-router-dom';

export const NotFound = ({match}) => {
    return (
            <div className="basicBg">
            <Container >
                <Row>
                    <Col xs='12' className="d-flex justify-content-center" style={{marginTop: '80px'}}> 
                        <div className="text-center">
                            <i class="far fa-frown fa-10x"></i>
                            <div className="text-center" style={{fontSize: '64px'}}>
                                <strong>404: </strong>
                            </div>
                            <div className="text-center text-muted" style={{fontSize: '48px'}}>
                                Page not Found
                            </div>
                            <div className="text-center text-muted">
                                <h5>The requested url was not found, go back to the <Link to='/'>Home</Link> page</h5>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            </div>
    )
}
