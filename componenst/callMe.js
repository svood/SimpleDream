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
                        <span className="fbText">Еще больше товаров в нашем магазине Facebook
                        <br />
                            <Button color="success" outline className="fbButton" >
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