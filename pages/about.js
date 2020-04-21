import React, { useState, useEffect, useRef } from 'react'
import CallMe from '../componenst/callMe';
import { useSelector, shallowEqual } from 'react-redux'
import { withRedux } from '../lib/redux'
import { Row, Col } from 'antd';
import Dilivery from '../componenst/sections/dilivery';


function Shipment() {
    const mainPageStore = () => {
        return useSelector(state => ({
            store: state.mainPage,
        }), shallowEqual);
    }; // Store
    const { store } = mainPageStore();

    return (
        <>
            <Row className="main" justify='cenetr'>
                <Col sm={12} md={20} className='infoContent' style={{ margin: '3em auto' }}>
                    <h1>О нас</h1>
                    <p>
                        «Simple Dreams» - украинский производитель детского постельного белья. В нашем ассортименте разнообразные комплекты в кроватку и коляску, защитные бортики, пеленки и аксессуары. Мы работаем только с натуральными материалами и делаем основной акцент на высокое качество нашей продукции. Создание товаров для детей - очень ответственный процесс, поэтому наша команда продумывает все до мелочей. Особое внимание мы уделяем дизайну постельного белья, тщательно подбираем цвета, принты и формы, поскольку они выполняют очень важную роль в поддержании эмоционального здоровья малышей и влияют на формирование психики. Окружить ребенка любовью и теплом с первых дней его жизни - основная задача родителей, а мы поможем позаботиться о его комфорте и гармоничном развитии. Мы убеждены в том, что каждый ребенок индивидуален, а его потенциал не имеет границ. Поэтому каждый комплект постельного белья «Simple Dreams» сможет подчеркнуть характер вашего малыша и поможет раскрыть его творческий потенциал.
                        </p>
                    <p><strong>Мы будем рады ответить на все вопросы о статусе доставки Вашего заказа по тел.: +38 (095) 314 01 33 в рабочие дни с 10.00 до 18.00</strong></p>
                </Col>
                {
                    store.card.length > 0 ?
                        <div className="shopingCard" onClick={e => window.location.href = '/card'}>
                            <span>{store.card.length}</span>
                            <img src='/images/ShoppingCart.svg' />
                        </div> : null
                }
            </Row >
            <CallMe />
        <Dilivery/>
        </>
    )
}


export default withRedux(Shipment)
