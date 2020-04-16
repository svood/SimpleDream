import React, { useState, useEffect, useRef } from 'react'
import { ButtonGroup, Alert, Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { faUser, faCity, faPhone, faTruck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Dilivery from '../componenst/sections/dilivery';
import axios from 'axios'
import qs from 'qs'
import CallMe from '../componenst/callMe';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { withRedux } from '../lib/redux'
import { addPhone, addMailNumber, addFio, addCity, addToCard, setPayType } from '../actions/mainPage'
import Steps, { Step } from 'rc-steps';
import { Textbox } from 'react-inputs-validation';
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

    const liqBlock = useRef(null)

    const [fioValid, setFioValid] = useState(false);
    const [userMailNumberValid, setUserMailNumberValid] = useState(false);
    const [userPhoneValid, setUserPhoneValid] = useState(false);
    const [userCityValid, setUserCityValid] = useState(false);


    useEffect(() => {
        if (store.userCity != '') setUserCityValid(true);
        if (store.userFio != '') setFioValid(true);
        if (store.userMailNumber != '') setUserMailNumberValid(true);
        if (store.userPhone != '') setUserPhoneValid(true);

    });


    const sendReqest = async () => {
        let from;
        handeSetPayType(1);

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
// 5168 7453 2132 9879
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
                    console.log("data callback",data);
                    console.log("data status",data.status);
                    if(data.status === "success") {
                        sendForm();
                    }
                }).on("liqpay.ready", function (data) {
                    // ready
                }).on("liqpay.close", function (data) {
                    console.log("close", data)
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const sendForm = async () => {
        let products = '';
        store.card.forEach(element => {
            products += element.title + ' Размер: ' + element.sizeInfo + '\n'
        });

        const requestBody = {
            fio: store.userFio,
            mailNumber: store.userMailNumber,
            phone: store.userPhone,
            city: store.userCity,
            card: store.card,
            products: products,
            total: totlalPrice(),
            payType: (store.payType === 1) ? "Оплачено Приват" : "Наложенный платеж"
        }

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            }
        }

        await axios.post('https://simple-dreams.com.ua/api/sendform', qs.stringify(requestBody), config)
            .then((result) => {
                console.log(result.data)
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
        dispatch(setPayType(e))
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


    const firstStep = () => {

        setCurrentStep(1)


    }

    const saveDataHendler = () => {
        if (fioValid && userCityValid && userPhoneValid && userMailNumberValid) {
            setCurrentStep(2)
            sendReqest()
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
                    {(store.card.length === 0) ? <Col><p>Корзина пуста</p></Col> : null}
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
                    <Button color="primary" onClick={e => firstStep()} disabled={(store.card.length === 0) ? true : false}>Далее</Button>
                </div>
            </Container>
        )
    }

    const agreeWithNovaPay = () => {
        sendForm();
        dispatch(addToCard([]))
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
                        }} >Выбор Варианта оплаты</h1>
                    </Col>
                    <Col sm={12} md={6} className='m-auto'>
                        <Button color="primary" onClick={e => sendReqest()} outline={store.payType === 1 ? false : true} block>Приват 24</Button>
                    </Col>
                    <Col sm={12} md={6} className='m-auto'>
                        <Button color="primary" onClick={e => handeSetPayType(2)} outline={store.payType === 2 ? false : true} block>Наложенным платежом</Button>
                    </Col>
                    {store.payType === 2 ?
                        <Col sm={12} className="mt-5 text-center">
                            <p className='mb-5' style={{ color: '#214d7b', fontSize: '13pt', fontWeight: '500' }}>Вы выбрали метод оплаты наложенным платежом при получении товара в отделении Новой Почты. Дополнительно оплачивается 2% от суммы + 20 грн оформление, согласно тарифам Новой Почты ! </p>
                            <Button color="success" className="m-auto" onClick={e => agreeWithNovaPay()} >Подтвердить заказ</Button>
                        </Col> : null
                    }

                    <Col sm={12} md={9} className='liqBlock'>
                        <div id="liqpayBlock" ref={liqBlock}></div>
                    </Col>

                    <Col sm={12} md={9} className='m-auto'>
                        <div style={{ background: 'none', color: '#656565' }}>
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


                                <Col sm={12} md={5} className="m-auto" className="formContainer mb-5">
                                    <div className="mt-5 mb-5 text-left">
                                        <span style={{ color: 'rebeccapurple', fontWeight: '500' }}><FontAwesomeIcon icon={faUser} /> ФИО:</span>
                                        <Textbox
                                            attributesInput={{ // Optional.
                                                id: 'fio',
                                                name: 'fio',
                                                type: 'text',
                                                // placeholder: 'Place your number here ^-^',
                                            }}
                                            value={store.userFio}
                                            onChange={(name, e) => { handelSetFIO(e) }}
                                            onBlur={() => { }}
                                            validationOption={{
                                                type: 'string',
                                                min: 4,
                                                max: 44,
                                                msgOnError: "Пожайлуста Впишите ФИО получателя",
                                                regMsg: "regMsg",
                                            }}
                                            validationCallback={res =>
                                                setFioValid(!res)
                                            }
                                        />
                                    </div>
                                    <div className="mt-5 mb-5 text-left">
                                        <span style={{ color: 'rebeccapurple', fontWeight: '500' }}><FontAwesomeIcon icon={faCity} /> Город:</span>
                                        <Textbox
                                            attributesInput={{ // Optional.
                                                id: 'city',
                                                name: 'city',
                                                type: 'text',
                                                // placeholder: 'Place your number here ^-^',
                                            }}
                                            value={store.userCity}
                                            onChange={(name, e) => { handelSetCity(e) }}
                                            onBlur={() => { }}
                                            validationOption={{
                                                type: 'string', // Optional.[String].Default: "string". Validation type, options are ['string', 'number', 'alphanumeric', 'alpha'].
                                                min: 4,
                                                max: 44,
                                                msgOnError: "Пожайлуста вишите город доставки",
                                                regMsg: "regMsg",
                                            }}
                                            validationCallback={res =>
                                                setUserCityValid(!res)
                                            }
                                        />
                                    </div>
                                    <div className="mt-5 mb-5 text-left">
                                        <span style={{ color: 'rebeccapurple', fontWeight: '500' }}><FontAwesomeIcon icon={faPhone} /> Телефон получателя:</span>
                                        <Textbox
                                            attributesInput={{ // Optional.
                                                id: 'phone',
                                                name: 'phone',
                                                type: 'phone',
                                            }}
                                            value={store.userPhone}
                                            onChange={(name, e) => { handelSetPhone(e) }}
                                            onBlur={() => { }}
                                            validationOption={{
                                                type: 'string', // Optional.[String].Default: "string". Validation type, options are ['string', 'number', 'alphanumeric', 'alpha'].
                                                min: 9,
                                                max: 44,
                                                msgOnError: "Пожайлуста вишите телефон получателя",
                                                regMsg: "regMsg",
                                            }}
                                            validationCallback={res =>
                                                setUserPhoneValid(!res)
                                            }

                                        />

                                    </div>
                                    <div className="mt-5 mb-5 text-left">
                                        <span style={{ color: 'rebeccapurple', fontWeight: '500' }}><FontAwesomeIcon icon={faTruck} /> № отделения Новой Почты: </span>
                                        <Textbox
                                            attributesInput={{ // Optional.
                                                id: 'userMailNumber',
                                                name: 'userMailNumber',
                                                type: 'number',
                                                // placeholder: 'Place your number here ^-^',
                                            }}
                                            value={store.userMailNumber}
                                            onChange={(name, e) => { handelSetNumber(e) }}
                                            onBlur={() => { }}
                                            validationOption={{
                                                type: 'string', // Optional.[String].Default: "string". Validation type, options are ['string', 'number', 'alphanumeric', 'alpha'].
                                                min: 1,
                                                max: 20,
                                                msgOnError: "Пожайлуста вишите № отделения Новой Почты",
                                            }}
                                            validationCallback={res =>
                                                setUserMailNumberValid(!res)
                                            }
                                        />
                                    </div>
                                </Col>
                            </Row>



                            {
                                !isMobile ?
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
