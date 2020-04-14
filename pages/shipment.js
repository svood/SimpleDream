import React, { useState, useEffect, useRef } from 'react'
import { ButtonGroup, UncontrolledCollapse, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import data from '../data/products';
import ProductModal from '../componenst/productModal';
import NumericInput from 'react-numeric-input';
import Advantages from '../componenst/sections/advantages';
import About from '../componenst/sections/about';
import Dilivery from '../componenst/sections/dilivery';
import MainBlock from '../componenst/sections/mainBlock';
import { Wizard } from 'react-multi-steps'
import Header from '../componenst/header'
import CallMe from '../componenst/callMe';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { withRedux } from '../lib/redux'
import { addPhone, addMailNumber, addFio, addCity, addToCard } from '../actions/mainPage'


function Shipment() {

    const mainPageStore = () => {
        return useSelector(state => ({
            store: state.mainPage,
        }), shallowEqual);
    }; // Store
    const { store } = mainPageStore();


    return (
        <Container fluid={true}>
            <Header />
            <Container className="main mt-5">
                <Row>


                    <Col sm={12} md={9} className="mt-5 mb-5 ml-auto mr-auto infoContent" >
                        <h1>Оплата и доставка</h1>
                        <p>
                            <h3>Варианты оплаты:</h3>
                            <ul>
                                <li>100% предоплата на расчетный счет Приват Банка</li>
                                <li>наложенный платеж при получении товара в отделении Новой Почты. Дополнительно оплачивается 2% от суммы + 20 грн оформление, согласно тарифам Новой Почты</li>
                            </ul>
                        </p>
                        <p>
                            Оплата за товары, приобретенные в интернет-магазине Royal Dream, осуществляется в украинских гривнах. Общая сумма заказа оговаривается во время подтверждения заказа в интернет-магазине и включает в себя цену за товар. В общую сумму заказа не входят Ваши затраты по оплате заказа (банковскую комиссию, отправку денег Новой Почтой при оплате наложенного платежа и т.д.). В интернет-магазине Royal Dream размещены фотографии товаров для максимально точного отображения их характеристик и цветов. В связи с определенными настройками и характеристиками Вашего компьютера (либо другого устройства), цвета и характеристики товаров на фотографиях могут отличаться от указанных в интернет-магазине. Такие несоответствия не являются недостатками приобретенных товаров и не могут использоваться, как аргументация для обмена или возврата товаров. К каждому товару в интернет-магазине Royal Dream прилагается детальное описание их характеристик. Обязательно изучите всю информацию и внимательно ознакомьтесь с характеристиками выбранного товара перед оформлением и подтверждением заказа. Подтверждая заказ, вы соглашаетесь с тем, что надлежащим образом проинформированы о характеристиках товаров и услуг.
                        </p>
                        <p>
                            <h3>Перед использованием товара Вы должны:</h3>
                            <ul>
                                <li>Внимательно ознакомиться с правилами эксплуатации товара, указанными на упаковке и ярлыках товара</li>
                                <li>Обратиться к Royal Dream за дополнительными разъяснениями по эксплуатации товара, если они Вам необходимы</li>
                                <li>Использовать товар согласно его целевому назначению и придерживаться правил эксплуатации и безопасности, указанных производителями</li>
                            </ul>
                        </p>
                        <p>
                            <h3>Варианты доставки:</h3>
                            <ul>
                                <li>Доставка по Украине на любой склад Новой Почты или адресная доставка (стоимость адресной доставки регулируется действующими тарифами Новой Почты)</li>
                                <li>Обратиться к Simple Dreams за дополнительными разъяснениями по эксплуатации товара, если они Вам необходимы</li>
                                <li>Использовать товар согласно его целевому назначению и придерживаться правил эксплуатации и безопасности, указанных производителями</li>
                            </ul>
                        </p>
                        <p><strong>Мы будем рады ответить на все вопросы о статусе доставки Вашего заказа по тел.: +38 (095) 314 01 33 в рабочие дни с 10.00 до 18.00</strong></p>
                    </Col>


                    <CallMe />

                </Row>




            </Container >
            <Row className="footer"></Row>

            {/* CARD */}
            <div>
                {
                    store.card.length > 0 ?
                        <div className="shopingCard" onClick={e => window.location.href = '/card'}>
                            <span>{store.card.length}</span>
                            <img src='/images/ShoppingCart.svg' />
                        </div> : null
                }
            </div>
        </Container >

    )
}
Shipment.getInitialProps = (ctx) => {
    return { cookie: ctx.query }
};

export default withRedux(Shipment)
