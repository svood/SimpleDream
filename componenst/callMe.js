import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import ModalCall from '../componenst/call';
const callMe = () => {
    return (

        <Container className="callMe border p-5" fluid={true}>
            <Row>
                <Col>
                    <span>Наш магазан в Фейсбуке ссылка</span>
                    <ModalCall buttonLabel="Заказать звонок" />
                </Col>
            </Row>
        </Container>
    )
}

export default callMe;