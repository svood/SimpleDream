import React from 'react';
import Slider from '../mainSlider'
import CountdownTimer from "react-component-countdown-timer";
import { Row, Col } from 'antd';
import {
    isChrome
} from "react-device-detect";
import LazyLoad from 'react-lazyload';
import styled from 'styled-components'

const LogoImage = styled.div`
       img {
           width:42%;
           margin: 0 auto;
           display: block;
           margin-bottom: 28px
       } 
`;

const MainBlock = styled.div`
text-align: center;
span:before {left: 0;}
span:after {right: 0;}
p {
  color: #eb7663;
}
span {
    width: 100%;
    font-family: 'Righteous', cursive;
    position: relative;
    color: #8642b933; 
    display: inline-block;
    border-bottom: 2px solid;
    font-size: 2.2em;
    margin: 0; 
    line-height: 1;
    border-color: #8642b933;
    h1,h2,h3 {
        color: #443281; 
        font-size: 0.7em;
    }
    @media (max-width: 768px) {
     p {
      font-size: 18pt;
     }
    }

`;


const Timer = styled.div`
.root-react-component-countdown-timer{
    .left {
      direction: ltr;
    }
  
    .border {
      .count {
        height: auto;
        border: 1px solid #cfcfcf;
        border-radius: 5px;
        margin: 2px;
        padding: 5px 5px;
        flex: 1;
      }
      &.responsive {
        .split {
          display: flex;
          flex-direction: column-reverse;
          margin-bottom: 8px;
        }
      }
    }
  
    .countBoxItem {
      min-width: 30px;
    }
  
    .responsive {
      display: flex !important;
  
      .count {
        flex: 1;
        text-align: center;
      }
    }
  
    .inline {
      .count {
        display: inline-block;
      }
  
      &.right {
        display: inline-block;
  
      }
  
      &.left {
        direction: rtl;
        display: inline-flex;
      }
    }
  
    .countBox {
      display: flex;
  
      span.split {
        display: flex;
        flex-direction: column-reverse;
        margin-bottom: 0px;
      }
      &.border {
        span.split {
          display: flex;
          flex-direction: column-reverse;
          margin-bottom: 10px;
        }
      }
      .label {
        text-align: center;
      }
  
      &.right {
        display: inline-flex;
        direction: rtl;
      }
  
      &.left {
        direction: ltr;
      }
  
      .countBoxItem {
        flex: 1;
  
        .count {
          text-align: center;
        }
      }
    }
  }
`

const Advantages = ({ isMobile, t }) => {
    return (
        <Row >

            {!isMobile ?
                <Col xs={24} sm={24} md={18} lg={17} xl={15}>
                    <Slider />
                </Col> : null}
            <Col xs={24} sm={24} md={6} lg={7} xl={9}>
                <LogoImage>
                    {isChrome ?
                        <LazyLoad><img src="/images/webp/logo.webp" /></LazyLoad> : <LazyLoad><img src="/images/logo.png" /></LazyLoad>
                    }
                </LogoImage>
                <MainBlock >
                    <span>
                        <h1>{t("mainH1")}</h1>
                        <p className="text-center blockTitle">{t("mainDesk.normal")}<strong> {t("mainDesk.strong")}</strong></p>
                    </span>
                </MainBlock>
                <Timer>
                    <CountdownTimer count={5432}
                        showTitle
                        responsive
                        className="mt-0"
                        dayTitle={t("dayTitle")}
                        hourTitle={t("hourTitle")}
                        secondTitle={t("secondTitle")}
                        minuteTitle={t("minuteTitle")}
                    />
                </Timer>
            </Col>

        </Row>


    )
}

export default Advantages;