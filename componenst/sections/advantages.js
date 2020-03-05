import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import ModalCall from '../call';
const Advantages = () => {
    return (

        <Row className="advantages">
            <Col sm={12} md={6}>
                <img src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" />
            </Col>
            <Col sm={12} md={6}>
                <p>Мы используем только <strong>европейский сатин</strong> !</p>
                <p>
                    <span>Главные достоинства нашей ткани</span>
                    <ul>
                        <li>Не кашлатится</li>
                        <li>Не портится после глажки</li>
                        <li>Не портится после стирки</li>
                        <li>Не вызывает алергии</li>
                    </ul>
                    <hr />
                    <ul>

                        <li>Материя легкая, мягкая, воздушная</li>
                        <li>Материя не мнется при хранении</li>
                        <li>Гигиенична, так как, хорошо поглощает влагу. </li>
                    </ul>
                </p>
                <ModalCall buttonLabel="Заказать звонок" />
            </Col>
        </Row>


    )
}

export default Advantages;