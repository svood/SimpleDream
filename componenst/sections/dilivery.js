import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import {
    isMobile
} from "react-device-detect";
const Dilivery = () => {
    return (

        <Row className="about">
            <Col sm={12} md={6}>
              {!isMobile ? <img src="/images/deliv.png" /> : null}  
            </Col>
            <Col sm={12} md={6} className="aboutText border">
                <div className="one">
                    <span>
                        <h3>Доставка и Оплата:</h3>
                    </span>
                </div>
                <ul className="mt-3">
                    <li>оплата через корзину (Приват 24)</li>
                    <li>наложенный платеж при получении товара в отделении Новой Почты. Дополнительно оплачивается согласно тарифам Новой Почты</li>
                </ul>
                <p>
                    Доставка по Украине на любой склад Новой Почты или адресная доставка (стоимость адресной доставки регулируется действующими тарифами Новой Почты).

                    Бесплатная доставка на склад Новой Почты осуществляется при заказе от 2000 грн.
                </p>
                <a href="/shipment" style={{color:'#2654b5'}}>Подробнее в разделе Доставка и Оплата</a>
            </Col>
        </Row>
    )
}

export default Dilivery;