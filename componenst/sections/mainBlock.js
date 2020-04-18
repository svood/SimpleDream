import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGem, faStar, faTshirt, faDisease } from '@fortawesome/free-solid-svg-icons'

import { Select, Button, Collapse, Row, Col, Card } from 'antd';
const MainBlock = () => {
    
    return (

        <Row gutter={[12, 48]} justify="center" align="center" style={{textAlign:'center',marginTop:'2em'}}>
            {/* <Col xs={24} sm={24} md={6} lg={0} xl={4}>
                <Card body outline color="info" style={{ border: 'none' }} className="advancedFirst">
                    <div style={{ textAlign: 'left', borderLeft: '1px solid black', paddingLeft: ' 10%', fontSize: '14pt', color: '#5f5f5f', fontWeight: '600' }}>Преимущества<br />Наших простынок</div>
                </Card>
            </Col> */}
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                <Card body outline style={{ border: '4px dotted rgb(210, 210, 210)'  }} className="aboutCartTitle">
                    <div style={{ color: '#ec0505',fontSize: '1.5em'     }}><FontAwesomeIcon icon={faGem} /> <br />Не кашлатится</div>
                    {/* <CardText>With supporting text below as a natural lead-in to additional content.</CardText> */}
                </Card>
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                <Card body outline style={{ border: '4px dotted rgb(210, 210, 210)' }}>
                    <div className="aboutCartTitle" style={{ color: 'rgb(30, 27, 197)',fontSize: '1.5em' }}><FontAwesomeIcon icon={faStar} /><br /> Не портится после глажки</div>
                    {/* <CardText>With supporting text below as a natural lead-in to additional content.</CardText> */}
                </Card>
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                <Card body outline style={{ border: '4px dotted rgb(210, 210, 210)' }}>
                    <div className="aboutCartTitle" style={{ color: 'rgb(40, 167, 69)',fontSize: '1.5em' }}><FontAwesomeIcon icon={faTshirt} /><br /> Не портится после стирки</div>
                    {/* <CardText>With supporting text below as a natural lead-in to additional content.</CardText> */}
                </Card>
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                <Card body outline style={{border: '4px dotted rgb(210, 210, 210)' }}>
                    <div className="aboutCartTitle" style={{ color: 'rgb(236, 5, 208)',fontSize: '1.5em' }}><FontAwesomeIcon icon={faDisease} /><br /> Не вызывает алергии</div>
                    {/* <CardText>With supporting text below as a natural lead-in to additional content.</CardText> */}
                </Card>
            </Col>

        </Row>


    )
}

export default MainBlock;