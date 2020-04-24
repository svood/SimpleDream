import React from 'react';
import { Row, Col } from 'antd';
import { isMobile, isChrome } from 'react-device-detect';
import LazyLoad from 'react-lazyload';


const About = ({ t }) => {
    return (
        <Row className="about" justify='cenetr'>
            <Col sm={24} md={12} className="aboutText border">
                <div className="one">
                    <span>
                        <h3 style={{ color: '#2654b5' }}>{t("about.h3")}</h3>
                    </span>
                </div>
                <ul style={{ marginTop: '1em' }}>
                    {t("about.ul", { returnObjects: true }).map(item => { return (<li> {item} </li>) })}
                </ul>
                <p>{t("about.p")}</p>
            </Col>
            {!isMobile ?
                <Col sm={24} md={12}>
                    {isChrome ?
                        <LazyLoad height={400} once><img src="/images/webp/satinBaner.webp" /></LazyLoad> :
                        <LazyLoad height={400} once><img src="/images/baners/satinBaner.png" /></LazyLoad>
                    }
                </Col> : null
            }

        </Row>
    )
}

export default About;