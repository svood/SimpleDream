import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Slider from '../mainSlider'
import ModalCall from '../call';
const Advantages = () => {
    return (

        <Row className="advantages mt-5 border">
            <Col sm={12} md={6}>
                <Slider />
            </Col>
            <Col sm={12} md={6} className="p-2">
                < p className="text-center">Мы используем только <strong>европейский сатин</strong> !</p>
                <span>
                    <strong>Главные достоинства нашей ткани:</strong>
                </span>
                <ul className="mt-2">
                    <li>Не кашлатится</li>
                    <li>Не портится после глажки</li>
                    <li>Не портится после стирки</li>
                    <li>Не вызывает алергии</li>
                    <li>Материя легкая, мягкая, воздушная</li>
                    <li>Материя не мнется при хранении</li>
                    <li>Гигиенична, так как, хорошо поглощает влагу. </li>
                </ul>

                <ModalCall buttonLabel="Заказать звонок" />
            </Col>
        </Row>


    )
}

export default Advantages;