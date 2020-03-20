import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Slider from '../mainSlider'
import ModalCall from '../call';
const Advantages = () => {
    return (

        <Row className="advantages mt-5">
            <Col sm={12} md={6}>
                <Slider />
            </Col>
            <Col sm={12} md={6} className="p-2">
                <p className="text-center blockTitle">Мы используем только <strong>европейский сатин</strong> !</p>
                <ol className="rounded mt-4">
                    <li><span>Не кашлатится</span></li>
                    <li><span>Не портится после глажки</span></li>
                    <li><span>Не портится после стирки</span></li>
                    <li><span>Не вызывает алергии</span></li>
                    <li><span>Материя легкая, мягкая, воздушная</span></li>
                    <li><span>Материя не мнется при хранении</span></li>
                    <li><span>Гигиенична, так как, хорошо поглощает влагу</span></li>
                </ol>
                <div className="text-center mt-5">
                    <ModalCall buttonLabel="Заказать звонок" />
                </div>
            </Col>

        </Row>


    )
}

export default Advantages;