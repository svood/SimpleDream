import React, { useState, useEffect, useRef } from 'react'
import { ButtonGroup, Alert, Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import Dilivery from '../componenst/sections/dilivery';
import axios from 'axios'
import qs from 'qs'
import CallMe from '../componenst/callMe';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { withRedux } from '../lib/redux'
import { addPhone, addMailNumber, addFio, addCity, addToCard, setPayType } from '../actions/mainPage'
import Steps, { Step } from 'rc-steps';
import parse from 'html-react-parser'
import {
    isMobile,
    isMobileSafari,
    isSafari,
    isEdge
} from "react-device-detect";
function HomePage(props) {
    const dispatch = useDispatch();

    const [error, setError] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [payType, setPayType] = useState(0);
    const liqBlock = useRef(null)


    const sendReqest = async () => {
        let from;
        const requestBody = {
            amount: Number(totlalPrice()),
        }

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            }
        }

        await axios.post('https://simple-dreams.com.ua/api/liqpay', qs.stringify(requestBody), config)
            .then((result) => {
                console.log(result.data)
                LiqPayCheckout.init({
                    data: result.data.data,
                    signature: result.data.signature,
                    embedTo: "#liqpayBlock",
                    language: "ru",
                    mode: isMobile ? "popup" : "embed" // embed || popup
                }).on("liqpay.callback", function (data) {
                    console.log(data.status);
                    console.log(data);
                }).on("liqpay.ready", function (data) {
                    // ready
                }).on("liqpay.close", function (data) {
                    // close
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }


    const mainPageStore = () => {
        return useSelector(state => ({
            store: state.mainPage,
        }), shallowEqual);
    }; // Store
    const { store } = mainPageStore();

    const handelSetPhone = (e) => {
        e.preventDefault()
        dispatch(addPhone(e.target.value))
    }
    const handelSetFIO = (e) => {
        dispatch(addFio(e.target.value))
    }
    const handelSetNumber = (e) => {
        dispatch(addMailNumber(e.target.value))
    }
    const handelSetCity = (e) => {
        dispatch(addCity(e.target.value))
    }

    const handeSetPayType = (e) => {
        dispatch(setPayType(Number(e.target.value)))
    }

    const removeProduct = (element) => {
        const newData = [];
        store.card.forEach(e => {
            if (e.idOnCard !== element.idOnCard) {
                newData.push(e)
            }
        });
        dispatch(addToCard([...newData]));
    }

    const totlalPrice = () => {
        let total = 0;
        store.card.map(i => {
            total = total + Number(i.price);
        })
        return total;
    }


    const saveDataHendler = () => {
        if (store.userPhone != '' && store.userMailNumber != '' && store.userFio != '' && store.userCity != '') {
            setCurrentStep(2)
        } else {
            setError('Пожайлуста, заполните все поля')
            setTimeout(() => {
                setError(null)
            }, 5000);
        }
    }
    const CardStep1 = () => {
        return (
            <Container style={{
                background: 'rgb(247, 247, 247)',
                padding: '13px',
                borderRadius: '14px',
                border: '4px',
                borderBottomStyle: 'groove',
                borderColor: '#d3ffdd',
            }} fluid={true}
                className='mt-5 ml-auto'>
                <>
                    <Col sm={12} className='mt-4 mb-4'>
                        <h1 style={{
                            fontSize: '19px',
                            borderLeft: '2px solid #8642b9',
                            paddingLeft: '12px',
                            color: '#8642b9',
                        }} >Товары в корзине</h1>
                    </Col>
                    <Row>
                        {
                            store.card.map(i => {
                                return (
                                    <Col sm={4} className="mt-1">
                                        <Card className="productBlock">
                                            <Button onClick={e => removeProduct(i)} outline style={{
                                                position: 'absolute',
                                                top: '3%',
                                                left: '3%',
                                                borderRadius: '44px',
                                                fontSize: '11px',
                                                background: 'rgb(138, 100, 255)',
                                                color: 'white',
                                                fontWeight: '500'
                                            }}>Х удалить</Button>
                                            <CardImg top width="100%" height="200px" style={{ height: '200px' }} src={props.imagePath + i.image + props.imageType} alt="Card image cap" />
                                            <CardBody style={{ textAlign: 'center' }}>
                                                <Col sm={12} md={12} >{i.title}</Col>
                                                <Col sm={12} md={12} >Размер: {i.sizeInfo}</Col>
                                                <Col sm={12} md={12} >Цена: {i.price} грн</Col>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </>
                <Row className="m-3" style={{
                    textAlign: 'right',
                    display: 'block',
                    background: 'white',
                    padding: '2%'
                }}>

                    <strong> Всего: {totlalPrice()} грн </strong></Row>

                <div className="footer-buttons">
                    <button onClick={e => setCurrentStep(1)}>Далее</button>
                </div>
            </Container>
        )
    }

    const changePayType = (e) => {
        e.preventDefault()
        liqBlock.current.innerText = "";
        if (e.target.value === "1") {
            setPayType(0)
            sendReqest()
        } else {
            setPayType(Number(e.target.value))
        }
    }



    const CardStep3 = () => {
        return (
            <Container className="mt-5">
                <Row style={{
                    background: 'rgb(247, 247, 247)',
                    padding: '13px',
                    borderRadius: '14px',
                    border: '4px',
                    borderBottomStyle: 'groove',
                    borderColor: '#d3ffdd',
                }} className="liqRow">
                    <Col sm={12} className='mt-4 mb-4'>
                        <h1 style={{
                            fontSize: '19px',
                            borderLeft: '2px solid #8642b9',
                            paddingLeft: '12px',
                            color: '#8642b9',
                        }} >Данные получателя</h1>
                    </Col>
                    <Col sm={12} md={9} className='m-auto'>
                        {/* <ButtonGroup>
                            <Button color="success" onClick={e => sendReqest()}>Приват 24</Button>
                            <Button color="success" outline >Наложенным платежом</Button>
                        </ButtonGroup> */}

                        <FormGroup onChange={e => changePayType(e)}>
                            <Label for="exampleSelect">Выберите вариант оплаты</Label>
                            <Input type="select" name="select" id="exampleSelect">
                                <option value={0}>-</option>
                                <option value={1}>Приват 24</option>
                                <option value={2}>Наложенным платежом</option>
                            </Input>
                        </FormGroup>

                    </Col>

                    <Col sm={12} md={9} className='m-auto' className='liqBlock'>
                        <div id="liqpayBlock" ref={liqBlock}></div>
                    </Col>

                    <Col sm={12} md={9} className='m-auto'>
                        <div className="footer-buttons">
                            <button onClick={e => setCurrentStep(1)}>Назад</button>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }

    return (
        <Container fluid={true}>

            <Container className="main">
                <Row>
                    <Col sm={12} style={{
                        padding: '14px',
                        background: '#f7f7f7',
                        borderBottom: '1px solid #b7b7b7',
                    }}>
                        Назад к выбору товаров
                   </Col>

                    <Col sm={12} md={8} className='mt-5 ml-auto mr-auto' >
                        <Steps current={currentStep}>
                            <Steps.Step title="Корзина" />
                            <Steps.Step title="Доставка" />
                            <Steps.Step title="Оплата" />
                        </Steps>
                    </Col>



                    <Col sm={12} md={10} className='m-auto' >
                        {currentStep === 0 ? <CardStep1 /> : null}
                        {currentStep === 1 ? <Container className="mt-5">
                            <Row style={{
                                background: 'rgb(247, 247, 247)',
                                padding: '13px',
                                borderRadius: '14px',
                                border: '4px',
                                borderBottomStyle: 'groove',
                                borderColor: '#d3ffdd',
                            }}>
                                <Col sm={12} className='mt-4 mb-4'>
                                    <h1 style={{
                                        fontSize: '19px',
                                        borderLeft: '2px solid #8642b9',
                                        paddingLeft: '12px',
                                        color: '#8642b9',
                                    }} >Данные получателя</h1>
                                </Col>

                                {error ? <Col sm={12} className="mt-2 mb-2"><Alert color="danger">{error}</Alert></Col> : null}


                                <Col sm={12} md={5} className="m-auto">
                                    <FormGroup className='mt-2'>
                                        <Label for="examplePassword" style={{ color: 'rebeccapurple', fontWeight: '500' }}>Ваше ФИО</Label>
                                        <Input type="text" name="" id="fio" style={{ background: 'white', borderRadius: '14px' }} onChange={e => handelSetFIO(e)} value={store.userFio} />
                                    </FormGroup>
                                    <FormGroup className='mt-4'>
                                        <Label for="examplePassword" style={{ color: 'rebeccapurple', fontWeight: '500' }}>Город</Label>
                                        <Input type="text" name="city" id="city" style={{ background: 'white', borderRadius: '14px' }} onChange={e => handelSetCity(e)} value={store.userCity} />
                                    </FormGroup>


                                    <FormGroup className='mt-4'>
                                        <Label for="examplePassword" style={{ color: 'rebeccapurple', fontWeight: '500' }}>Телефон получателя</Label>
                                        <Input type="text" name="" id="phone" style={{ background: 'white', borderRadius: '14px' }} onChange={e => handelSetPhone(e)} value={store.userPhone} />
                                    </FormGroup>

                                    <FormGroup className='mt-4 mb-5'>
                                        <Label for="examplePassword" style={{ color: 'rebeccapurple', fontWeight: '500' }}>№ отделения НовойПочты</Label>
                                        <Input type="text" name="number" id="number" style={{ background: 'white', borderRadius: '14px' }} onChange={e => handelSetNumber(e)} value={store.userMailNumber} />
                                    </FormGroup>
                                </Col>

                            </Row>



                            {
                                isMobile ?
                                    <div className="footer-buttons">
                                        <button onClick={e => setCurrentStep(0)}>Назад</button>
                                        <button onClick={e => saveDataHendler()}>Далее</button>
                                    </div>
                                    :
                                    <div className="footer-buttons">
                                        <button onClick={e => saveDataHendler()}>Далее</button>
                                        <button onClick={e => setCurrentStep(0)}>Назад</button>
                                    </div>
                            }

                        </Container> : null}
                        {currentStep === 2 ? <CardStep3 /> : null}
                    </Col>

                    <Col className="sectio5 mt-5 mb-5" sm={12} id="diliverySection">
                        <Dilivery />
                    </Col>
                    <CallMe />
                </Row>
            </Container>
        </Container >
    )
}
HomePage.getInitialProps = ({ req }) => {
    let userAgent;
    let imagePath;
    let imageType;
    if (req) { // if you are on the server and you get a 'req' property from your context
        userAgent = req.headers['user-agent'] // get the user-agent from the headers
    } else {
        userAgent = navigator.userAgent // if you are on the client you can access the navigator from the window object
    }
    let isMobile = Boolean(userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    ))
    let isChrome = Boolean(userAgent.match(
        /Android|Opera Mini|IEMobile|WPDesktop|Chrome/i
    ))
    if (isChrome) {
        imagePath = '/images/webp',
            imageType = '.webp'
    } else {
        imagePath = '/images',
            imageType = '.jpg'
    }

    return {
        isChrome: isChrome,
        imagePath: imagePath,
        imageType: imageType,
        isMobile: isMobile
    }
};

export default withRedux(HomePage)
