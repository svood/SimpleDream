import React from 'react';
import {
    isMobile
} from "react-device-detect";

import { Row, Col } from 'antd';


const Dilivery = ({ t }) => {
    return (
        <Row className="about" style={{ marginTop: '4em', padding: '2em' }}>
            <Col sm={24} md={12}>
                {!isMobile ? <img src="/images/deliv.png" /> : null}
            </Col>
            <Col sm={24} md={12} className="aboutText border">
                <div className="one">
                    <span>
                        <h3>{t("dilivery.h3")}</h3>
                    </span>
                </div>
                <ul style={{ marginTop: '1em' }}>
                    <li>{t("dilivery.li.1")}</li>
                    <li>{t("dilivery.li.2")}</li>
                </ul>
                <p>{t("dilivery.p")}
                </p>
                <a href="/shipment" style={{ color: '#2654b5' }}>{t("dilivery.button")}</a>
            </Col>
        </Row>
    )
}

export default Dilivery;