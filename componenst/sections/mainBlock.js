import React from 'react';
import { Col, Row, Card, Button, CardImg, CardTitle, CardText, CardGroup, CardSubtitle, CardBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGem, faStar, faTshirt, faDisease } from '@fortawesome/free-solid-svg-icons'


const MainBlock = () => {
    return (

        <Row >
            <Col>
                <CardGroup className="mt-5 mb-5 text-center" style={{border:'3px dotted #833dce2b'}}>
                    <Card body outline color="info" style={{border:'none'}} className="advancedFirst">
                       <CardText  style={{textAlign: 'left', borderLeft: '1px solid black', paddingLeft:' 10%',fontSize: '14pt',color:'#5f5f5f',fontWeight:'600' }}>Преимущества<br/>Наших простынок</CardText>
                    </Card>
                    <Card body outline color="info" style={{ border: 'none' }} className="aboutCartTitle">
                        <CardTitle  style={{ color: '#ec0505' }}><FontAwesomeIcon icon={faGem} /> <br/>Не кашлатится</CardTitle>
                        {/* <CardText>With supporting text below as a natural lead-in to additional content.</CardText> */}
                    </Card>
                    <Card body outline color="info" style={{ border: 'none' }}>
                        <CardTitle className="aboutCartTitle" style={{ color: 'rgb(30, 27, 197)' }}><FontAwesomeIcon icon={faStar} /><br/> Не портится после глажки</CardTitle>
                        {/* <CardText>With supporting text below as a natural lead-in to additional content.</CardText> */}
                    </Card>
                    <Card body outline color="info" style={{ border: 'none' }}>
                        <CardTitle className="aboutCartTitle" style={{ color: 'rgb(40, 167, 69)' }}><FontAwesomeIcon icon={faTshirt} /><br/> Не портится после стирки</CardTitle>
                        {/* <CardText>With supporting text below as a natural lead-in to additional content.</CardText> */}
                    </Card>
                    <Card body outline color="info" style={{ border: 'none' }}>
                        <CardTitle className="aboutCartTitle" style={{ color: 'rgb(236, 5, 208)' }}><FontAwesomeIcon icon={faDisease} /><br/> Не вызывает алергии</CardTitle>
                        {/* <CardText>With supporting text below as a natural lead-in to additional content.</CardText> */}
                    </Card>
                </CardGroup>

            </Col>
        </Row>


    )
}

export default MainBlock;