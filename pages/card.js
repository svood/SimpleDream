import React, { useState, useEffect, useRef } from 'react'

import { faUser, faCity, faPhone, faTruck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Dilivery from '../componenst/sections/dilivery';
import axios from 'axios'
import qs from 'qs'
import CallMe from '../componenst/callMe';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { withRedux } from '../lib/redux'
import { addPhone, addMailNumber, addFio, addCity, addToCard, setPayType } from '../actions/mainPage'
// import Steps, { Step } from 'rc-steps';
import { Textbox } from 'react-inputs-validation';
import {
    isMobile,
    isMobileSafari,
    isSafari,
    isEdge
} from "react-device-detect";
import { ShoppingCartOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined, DollarCircleOutlined } from '@ant-design/icons';


import { Steps, Button, Radio, Row, Col, Card, Alert } from 'antd';


function HomePage(props) {
    const dispatch = useDispatch();

    const [error, setError] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);

    const liqBlock = useRef(null)
    const { Step } = Steps;
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

        await axios.post('https://simple-dreams.com.ua/api/liqpay', qs.stringify(requestBody), config)
            .then((result) => {
                LiqPayCheckout.init({
                    data: result.data.data,
                    signature: result.data.signature,
                    embedTo: "#liqpayBlock",
                    language: "ru",
                    mode: isMobile ? "popup" : "embed" // embed || popup
                }).on("liqpay.callback", function (data) {
                    console.log("data callback", data);
                    console.log("data status", data.status);
                    if (data.status === "success") {
                        sendForm();
                        setCurrentStep(3)
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


    const InputStyle = {
        background: 'white',
        borderRadius: '50px',
        height: '36px',
        marginTop: '11px',
        border: '1px solid rebeccapurple',
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

            <div style={{
                background: 'rgb(247, 247, 247)',
                padding: '13px',
                borderRadius: '14px',
                border: '4px',
                borderBottomStyle: 'groove',
                borderColor: '#d3ffdd',
            }}>
                <Row >
                    <Col sm={24}>
                        <h1 style={{
                            fontSize: '19px',
                            borderLeft: '2px solid #8642b9',
                            paddingLeft: '12px',
                            color: '#8642b9',
                        }} >Товары в корзине</h1>
                    </Col>
                </Row>

                {(store.card.length === 0) ? <Col><p>Корзина пуста</p></Col> : null}

                <Row gutter={[16, 16]}>
                    {
                        store.card.map(i => {
                            return (
                                <Col xs={24} sm={20} md={12} lg={4} xl={8} >
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
                                        <img className='card-img-top' top width="100%" height="300px" src={props.imagePath + i.image + props.imageType} />

                                        <Row style={{ textAlign: 'center', textAlign: 'center', background: '#f7f7f7', padding: '12px' }}>
                                            <Col span={24} >{i.title}</Col>
                                            <Col span={24} >Размер: {i.sizeInfo}</Col>
                                            <Col span={24}>Цена: {i.price} грн</Col>
                                        </Row>
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>

                <Col style={{
                    textAlign: 'right',
                    display: 'block',
                    background: 'white',
                    padding: '2%'
                }}> <strong> Всего: {totlalPrice()} грн </strong> </Col>

                <div className="footer-buttons">
                    <Button color="primary" onClick={e => firstStep()} disabled={(store.card.length === 0) ? true : false}>Далее</Button>
                </div>
            </div>
        )
    }

    const agreeWithNovaPay = () => {
        sendForm();
        dispatch(addToCard([]))
        setCurrentStep(3)
    }


    const CardStep3 = () => {
        return (
            <div className="mt-5" style={{
                background: 'rgb(247, 247, 247)',
                padding: '13px',
                border: '4px',
                borderBottomStyle: 'groove',
                borderColor: '#d3ffdd',
            }}>
                <Row className="liqRow">
                    <Col sm={24} md={24} className='mt-4 mb-4'>
                        <h1 style={{
                            fontSize: '19px',
                            borderLeft: '2px solid #8642b9',
                            paddingLeft: '12px',
                            color: '#8642b9',
                        }} >Выбор Варианта оплаты</h1>
                    </Col>
                </Row>
                <Row>
                    <Col sm={24} md={24} className='m-auto' justify="center" flex='1' style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button color="primary" onClick={e => sendReqest()} type={store.payType === 1 ? 'primary' : false} >Приват 24</Button>
                        <Button color="primary" onClick={e => handeSetPayType(2)} type={store.payType === 2 ? 'primary' : false} >Наложенным платежом</Button>
                    </Col>
                </Row>
                <Row>
                    {store.payType === 2 ?
                        <Col sm={12} style={{ margin: '0 auto', marginBottom: '2em', marginTop: '2em' }}>
                            <p className='mb-5' style={{ color: '#214d7b', fontSize: '13pt', fontWeight: '500', textAlign: 'center' }}>Вы выбрали метод оплаты наложенным платежом при получении товара в отделении Новой Почты. Дополнительно оплачивается 2% от суммы + 20 грн оформление, согласно тарифам Новой Почты ! </p>
                            <Button shape="round" size='lage' style={{ background: '#17b933', color: 'white', display: 'block', margin: '0 auto', marginBottom: '2em', marginTop: '2em' }} color="success" className="m-auto" onClick={e => agreeWithNovaPay()} >Подтвердить заказ</Button>
                        </Col> : null
                    }
                </Row>
                <Row>
                    <Col sm={12} md={9} className='liqBlock'>
                        <div id="liqpayBlock" ref={liqBlock}></div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={9} className='m-auto'>
                        <div style={{ background: 'none', color: '#656565' }}>
                            <button onClick={e => setCurrentStep(1)}>Назад</button>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }


    const CardStep4 = () => {

        return (
            <Row style={{
                background: 'rgb(247, 247, 247)',
                padding: '13px',
                border: '4px',
                borderBottomStyle: 'groove',
                borderColor: '#d3ffdd',
            }}>
                <Col span={24}>
                    <Card style={{textAlign:'center'}}>
                        <img src="https://www.neosaransk.ru/assets/img/success.png" style={{
                            maxWidth: '248px', margin: '32px auto', display: 'block'
                        }} />
                        <p style={{fontSize:'16pt'}}>Ваш заказ успешно оформлен. Мы свяжемся с Вами в близжайшее время </p>
                        <p style={{fontSize:'12pt'}}>Номер Вашего заказа №41 </p>
                    </Card>
                </Col>
            </Row>
        )

    }

    return (
        <div className="main">
            <Row>
                <Col sm={24} md={12} style={{ margin: '2em auto' }}>
                    <Steps>
                        <Step status={currentStep === 0 ? "process" : "finish"} title="Корзина" icon={currentStep === 0 ? <LoadingOutlined /> : <ShoppingCartOutlined />} />
                        <Step status={currentStep === 1 ? "process" : "finish"} title="Доставка" icon={currentStep === 1 ? <LoadingOutlined /> : <SolutionOutlined />} />
                        <Step status={currentStep === 2 ? "process" : "finish"} title="Оплата" icon={currentStep === 2 ? <LoadingOutlined /> : <DollarCircleOutlined />} />
                        <Step status={currentStep === 3 ? "process" : "finish"} title="Оплата" icon={<SmileOutlined />} />
                    </Steps>
                </Col>
            </Row>



            <Row>
                <Col sm={24} md={16} style={{ margin: '2em auto' }}>
                    {currentStep === 0 ? <CardStep1 /> : null}
                </Col>
            </Row>


            {currentStep === 1 ?
                <div style={{
                    background: 'rgb(247, 247, 247)',
                    padding: '13px',
                    border: '4px',
                    borderBottomStyle: 'groove',
                    borderColor: '#d3ffdd',
                }}>
                    <Row gutter={[16, 16]} style={{ marginTop: '4em' }}>
                        <Col sm={24} md={8} className="formContainer" >
                            <h1 style={{
                                fontSize: '19px',
                                textAlign: 'center',
                                color: '#8642b9',
                            }} >Данные получателя</h1>
                            {error ? <Col span={24} className="mt-2 mb-2"><Alert message={error} type="error" /></Col> : null}
                            <div style={{ marginTop: '2em', marginBottom: '2em' }}>
                                <span style={{ color: 'rebeccapurple', fontWeight: '500' }}><FontAwesomeIcon icon={faUser} /> ФИО:</span>
                                <Textbox
                                    attributesInput={{ // Optional.
                                        id: 'fio',
                                        name: 'fio',
                                        type: 'text',
                                    }}
                                    customStyleInput={InputStyle}
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
                            <div style={{ marginTop: '2em', marginBottom: '2em' }}>
                                <span style={{ color: 'rebeccapurple', fontWeight: '500' }}><FontAwesomeIcon icon={faCity} /> Город:</span>
                                <Textbox
                                    attributesInput={{ // Optional.
                                        id: 'city',
                                        name: 'city',
                                        type: 'text',
                                        // placeholder: 'Place your number here ^-^',
                                    }}
                                    customStyleInput={InputStyle}
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
                            <div style={{ marginTop: '2em', marginBottom: '2em' }}>
                                <span style={{ color: 'rebeccapurple', fontWeight: '500' }}><FontAwesomeIcon icon={faPhone} /> Телефон получателя:</span>
                                <Textbox
                                    attributesInput={{ // Optional.
                                        id: 'phone',
                                        name: 'phone',
                                        type: 'phone',
                                    }}
                                    customStyleInput={InputStyle}
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
                            <div style={{ marginTop: '2em', marginBottom: '2em' }}>
                                <span style={{ color: 'rebeccapurple', fontWeight: '500' }}><FontAwesomeIcon icon={faTruck} /> № отделения Новой Почты: </span>
                                <Textbox
                                    attributesInput={{ // Optional.
                                        id: 'userMailNumber',
                                        name: 'userMailNumber',
                                        type: 'number',
                                        // placeholder: 'Place your number here ^-^',
                                    }}
                                    customStyleInput={InputStyle}
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
                        <Col span={24}>
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
                        </Col>
                    </Row>
                </div> : null}

            {currentStep === 2 ? <CardStep3 /> : null}
            {currentStep === 3 ? <CardStep4 /> : null}
            <Dilivery />
            <CallMe />

        </div>
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
