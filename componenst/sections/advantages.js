import React from 'react';
import Slider from '../mainSlider'
import CountdownTimer from "react-component-countdown-timer";
import { Row, Col } from 'antd';
import {
    isChrome
} from "react-device-detect";
import LazyLoad from 'react-lazyload';

const Advantages = ({ isMobile }) => {
    return (

        <Row >
            {!isMobile ?
                <Col xs={0} sm={0} md={18} lg={17} xl={15}>
                    <Slider />
                </Col> : null}

            <Col xs={24} sm={24} md={6} lg={7} xl={9} className="p-2" style={{ background: ' #ffffff' }}>

                {isChrome ?
                    <LazyLoad><img src="/images/webp/logo.webp" style={{
                        width: '42%',
                        margin: '0 auto',
                        display: 'block',
                        marginBottom: '28px'
                    }} /></LazyLoad> : <LazyLoad><img src="/images/logo.png" style={{
                        width: '42%',
                        margin: '0 auto',
                        display: 'block',
                        marginBottom: '28px'
                    }} /></LazyLoad>
                }

                <div className="one" style={{ padding: '1em' }}>
                    <span>
                        <h1>Детские простынки</h1>
                        <p className="text-center blockTitle">Весенняя  <strong>распродажа</strong> !</p>
                    </span>
                </div>
                <div className="mt-0 promo">
                    <CountdownTimer count={5432} showTitle responsive className="mt-0" dayTitle="Дни" hourTitle="Часы" secondTitle="Секунды" minuteTitle="Минуты" />
                </div>
            </Col>
        </Row>


    )
}

export default Advantages;