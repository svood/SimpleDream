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


function Return() {

    const mainPageStore = () => {
        return useSelector(state => ({
            store: state.mainPage,
        }), shallowEqual);
    }; // Store
    const { store } = mainPageStore();


    return (
      
          
            <div className="main mt-5">
                <Row>
                    <Col sm={12} md={9} className="infoContent" style={{margin: '3em auto',width: '78%'}}>
                        <h1>Обмен и возврат</h1>
                        <h3>Гарантии</h3>
                        <p>
                            На товары, приобретенные в интернет-магазине Royal Dream, распространяется гарантия производителя, которая действует в течение 12 месяцев с момента приобретения товара. При этом покупатель должен соблюдать правила эксплуатации, указанные на упаковке. Все претензии к качеству товаров в течение гарантийного срока предъявляются производителю.
                        </p>
                        <p>Все материалы которые мы используем сертифицированы.</p>
                        <h3>Международный сертификат качества Oeko-Tex Standard 100</h3>
                        <p>
                            Сертификат Oeko-Tex Standard 100 - это международная система тестирования и сертификации изделий из текстильных материалов, которая позволяет проверять продукцию на наличие вредных веществ на любом этапе производственного процесса.
                        </p>
                        <h3>Знак Oeko-Tex на текстильной продукции гарантирует:</h3>
                        <p>
                            <ul>
                                <li>оответствие норме pH</li>
                                <li>отсутствие аллергенных красителей</li>
                                <li>отсутствие в составе изделий вредных химических веществ (формальдегидов, экстрагируемых тяжелых металлов, хлорсодержащих носителей и других веществ, опасных для здоровья)</li>
                            </ul>
                        </p>
                        <p><strong>Мы будем рады ответить на все вопросы о статусе доставки Вашего заказа по тел.: +38 (095) 314 01 33 в рабочие дни с 10.00 до 18.00</strong></p>
                    </Col>


                    <CallMe />

                </Row>

         
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
        </div >

    )
}
Return.getInitialProps = (ctx) => {
    return { cookie: ctx.query }
};

export default withRedux(Return)
