import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Slider from '../mainSlider'
import ModalCall from '../call';
import CountdownTimer from "react-component-countdown-timer";



const Advantages = ({ isMobile }) => {
    return (

        <Row className="advantages mt-5 mb-0">
            {!isMobile ?
                <Col sm={12} md={8}>
                    <Slider />
                </Col> : null}

            <Col sm={12} md={isMobile ? 12 : 4} className="p-2" style={{ background: ' #ffffff' }}>
                <img src="/images/logo.png" style={{
                    width: '47%',
                    margin: '0 auto',
                    display: 'block',
                    marginBottom: '28px'
                }} />
                <div className="one">
                    <span>
                        <h1>Детские простынки</h1>
                        <p className="text-center blockTitle">Весенняя  <strong>распродажа</strong> !</p>
                    </span>
                </div>



                <div className="mt-0 promo">
                    <CountdownTimer count={5432} showTitle responsive className="mt-0" dayTitle="Дни" hourTitle="Часы" secondTitle="Секунды" minuteTitle="Минуты" />
                </div>


                {/* <ol className="rounded mt-4">
                    <li><span>Не кашлатится</span></li>
                    <li><span>Не портится после глажки</span></li>
                    <li><span>Не портится после стирки</span></li>
                    <li><span>Не вызывает алергии</span></li>
                    <li><span>Материя легкая, мягкая, воздушная</span></li>
                </ol> */}
                {/* <div className="text-center mt-5">
                    <ModalCall buttonLabel="Заказать пошив на заказ" />
                </div> */}
            </Col>

        </Row>


    )
}

export default Advantages;