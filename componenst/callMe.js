import React from 'react';
import { Row, Col, Container, Button } from 'reactstrap';
import ModalCall from '../componenst/call';
import { faMobile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// facebook-square
const callMe = () => {
    return (

        <Container className="callMe border p-5" fluid={true} style={{ background: 'rgba(228, 228, 228, 0.15)' }}>
            <Row>
                <Col style={{ textAlign: 'center', }}>
                    <p>
                        <span style={{
                            fontSize: '30px',
                            color: '#204eaf',
                            fontWeight: 700,
                            fontFamily: 'sans-serif'
                        }}>Еще больше товаров в нашем магазине Facebook
                        <br />
                            <Button color="success" outline style={{
                                paddingTop: '10px',
                                paddingBottom: '10px',
                                marginTop: '18px',
                                background: '#2654b5',
                                color: 'white',
                                width: '16%',
                            }}>
                                <img src="/images/fb.svg"
                                    style={{
                                        width: '28px',
                                    }} /> Перейти</Button> </span>
                    </p>


                </Col>
            </Row>
        </Container>
    )
}

export default callMe;