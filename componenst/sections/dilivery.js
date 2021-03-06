import React from 'react';
import {isMobile} from "react-device-detect";
import styled from 'styled-components'
import { Row, Col } from 'antd';

const DiliveryStyles = styled.div`
    margin-top: 4em;
    padding: 1em;
    border-top: 1px solid #e5ceff;
    border-bottom: 1px solid #e5ceff;
    img {
        width:100%;
    }
    a {
        color: #6f29bc;
        text-align: center;
        display: block;
    }
    h3 {
        color:#6f29bc;
        text-align: center;
        font-size: 15pt;
    }
`;

const Dilivery = ({ t }) => {
    return (
        <DiliveryStyles>
        <Row>
            <Col sm={24} md={12}>
                {!isMobile ? <img src="/images/deliv.png" /> : null}
            </Col>
            <Col sm={24} md={12}>
                <h3>{t("dilivery.h3")}</h3>
                <ul>
                    <li>{t("dilivery.li.1")}</li>
                    <li>{t("dilivery.li.2")}</li>
                </ul>
                <p style={{padding:'2em'}}>{t("dilivery.p")}</p>
                <a href="/shipment">{t("dilivery.button")}</a>
            </Col>
        </Row>
        </DiliveryStyles>
    )
}

export default Dilivery;