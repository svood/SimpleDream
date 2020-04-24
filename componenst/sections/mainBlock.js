import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGem, faStar, faTshirt, faDisease } from '@fortawesome/free-solid-svg-icons'
import { Row, Col, Card } from 'antd';
const MainBlock = ({ t }) => {

    return (
        <Row gutter={[12, 48]} justify="center" align="center" style={{ textAlign: 'center', margin: '2em' }}>
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                <Card body outline style={{ border: '4px dotted rgb(210, 210, 210)' }} className="aboutCartTitle">
                    <div style={{ color: '#ec0505', fontSize: '1.5em' }}><FontAwesomeIcon icon={faGem} /> <br />{t("mainBlock.block1")}</div>
                </Card>
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                <Card body outline style={{ border: '4px dotted rgb(210, 210, 210)' }}>
                    <div className="aboutCartTitle" style={{ color: 'rgb(30, 27, 197)', fontSize: '1.5em' }}><FontAwesomeIcon icon={faStar} /><br />{t("mainBlock.block2")}</div>
                </Card>
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                <Card body outline style={{ border: '4px dotted rgb(210, 210, 210)' }}>
                    <div className="aboutCartTitle" style={{ color: 'rgb(40, 167, 69)', fontSize: '1.5em' }}><FontAwesomeIcon icon={faTshirt} /><br />{t("mainBlock.block3")}</div>
                </Card>
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                <Card body outline style={{ border: '4px dotted rgb(210, 210, 210)' }}>
                    <div className="aboutCartTitle" style={{ color: 'rgb(236, 5, 208)', fontSize: '1.5em' }}><FontAwesomeIcon icon={faDisease} /><br />{t("mainBlock.block4")}</div>
                </Card>
            </Col>
        </Row>
    )
}

export default MainBlock;