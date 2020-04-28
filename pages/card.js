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
import { Textbox } from 'react-inputs-validation';
import {
    isMobile,
    isMobileSafari,
    isSafari,
    isEdge
} from "react-device-detect";
import { ShoppingCartOutlined, SolutionOutlined, SettingFilled, SmileOutlined, DollarCircleOutlined, RightCircleOutlined, LeftCircleOutlined } from '@ant-design/icons';
import ReactGA from 'react-ga';
import { withTranslation } from '../i18n'
import { Steps, Button, Row, Col, Card, Alert } from 'antd';
import MainLayout from '../componenst/layouts/main'
import styled from 'styled-components'


const FormStyle = styled.div`
    width: 100%;
    border: none !important;
    padding: 1em;
    input {
        width: 100%;
        text-align: center;
    }
    @media (max-width: 900px) {
        .formContainer  {
            width: 100%;
            margin: 1em auto;
            
        }
        button {
            margin: 0em auto;
        }
    }
`;

function Cart({ t }) {
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
        ReactGA.initialize('UA-163962797-1');
        if (store.userCity != '') setUserCityValid(true);
        if (store.userFio != '') setFioValid(true);
        if (store.userMailNumber != '') setUserMailNumberValid(true);
        if (store.userPhone != '') setUserPhoneValid(true);
    });


    const mobile = () => {
        let imagePath;
        let imageType;
        if (isMobileSafari || isSafari || isEdge) {
            imagePath = '/images',
                imageType = '.jpg'
        } else {
            imagePath = '/images/webp',
                imageType = '.webp'
        }
        return { imagePath: imagePath, imageType: imageType }
    }

    const sendReqest = async () => {
        handeSetPayType(1);
        const requestBody = {
            amount: Number(totlalPrice()),
            number: (new Date().getMonth() + 1) + "/" + new Date().getDate() + new Date().getMinutes(),
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
                        ReactGA.event({
                            category: 'Cart',
                            action: 'Go to Step 4',
                        });
                        setCurrentStep(3)
                        ReactGA.pageview('/cart/step4')
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
        ReactGA.event({
            category: 'Cart',
            action: 'Pay',
            value: (store.payType === 1) ? "Оплачено Приват" : "Наложенный платеж"
        });

        let products = '';
        store.card.forEach(element => {
            products += element.title + t("size") + element.sizeInfo + '\n'
        });

        const requestBody = {
            number: (new Date().getMonth() + 1) + "/" + new Date().getDate() + new Date().getMinutes(),
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
        ReactGA.event({
            category: 'Cart',
            action: 'Go to Step 2',
        });
        setCurrentStep(1)
        ReactGA.pageview('/cart/step2')
        window.scrollTo(0, 0)
    }

    const saveDataHendler = () => {
        window.scrollTo(0, 0)
        if (fioValid && userCityValid && userPhoneValid && userMailNumberValid) {
            ReactGA.event({
                category: 'Cart',
                action: 'Go to Step 3',
            });
            setCurrentStep(2)
            ReactGA.pageview('/cart/step3')
            sendReqest()
        } else {
            setError(t("CartPage.inputsError"))
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
                        }} >{t("CartPage.productInCart")}</h1>
                    </Col>
                </Row>

                {(store.card.length === 0) ? <Col><p>{t("CartPage.NoProducts")}</p></Col> : null}

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
                                        }}>{t("CartPage.deleteProduct")}</Button>
                                        <img className='card-img-top' top width="100%" height="300px" src={mobile().imagePath + i.image + mobile().imageType} />

                                        <Row style={{ textAlign: 'center', textAlign: 'center', background: '#f7f7f7', padding: '12px' }}>
                                            <Col span={24} >{i.title}</Col>
                                            <Col span={24} >{t("size")}: {i.sizeInfo}</Col>
                                            <Col span={24}>{t("price")}: {i.price} {t("uah")}</Col>
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
                }}> <strong> {t("total")}: {totlalPrice()} {t("uah")} </strong> </Col>

                <div>
                    <Button shape="round" size={'lage'} icon={<RightCircleOutlined />} style={{ margin: '2em auto', display: 'block', color: 'white', background: '#04c704' }} onClick={e => firstStep()} disabled={(store.card.length === 0) ? true : false}>{t("next")}</Button>
                </div>
            </div>
        )
    }

    const agreeWithNovaPay = () => {
        ReactGA.event({
            category: 'Cart',
            action: 'Go to Step 4',
        });
        sendForm();
        dispatch(addToCard([]))
        setCurrentStep(3)
        window.scrollTo(0, 0)
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
                        }} >{t("CartPage.selectpayType")}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col sm={24} md={24} className='m-auto' justify="center" flex='1' style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button color="primary" onClick={e => sendReqest()} type={store.payType === 1 ? 'primary' : false} >{t("CartPage.pricatePay")}</Button>
                        <Button color="primary" onClick={e => handeSetPayType(2)} type={store.payType === 2 ? 'primary' : false} >{t("CartPage.novaPay")}</Button>
                    </Col>
                </Row>
                <Row>
                    {store.payType === 2 ?
                        <Col sm={12} style={{ margin: '0 auto', marginBottom: '2em', marginTop: '2em' }}>
                            <Card>
                                <p className='mb-5' style={{ color: '#214d7b', fontSize: '13pt', fontWeight: '500', textAlign: 'center' }}>{t("CartPage.novaText")}</p>
                                <Button shape="round" size='lage' style={{ background: '#17b933', color: 'white', display: 'block', margin: '0 auto', marginBottom: '2em', marginTop: '2em' }} color="success" className="m-auto" onClick={e => agreeWithNovaPay()} >{t("CartPage.agree")}</Button>
                            </Card>
                        </Col> : null
                    }
                </Row>
                <Row>
                    <Col sm={24} md={9} className='liqBlock' style={{ margin: '2em auto',display:'block' }}>
                        <div id="liqpayBlock" ref={liqBlock} ></div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={24} md={9} className='m-auto' style={{ display: 'block', margin: '0 auto', marginTop: '2em' }}>
                        <Button onClick={e => setCurrentStep(1)} style={{ display: 'block', margin: '0 auto' }}>{t("previous")}</Button>
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
                    <Card style={{ textAlign: 'center' }}>
                        <img src="https://www.neosaransk.ru/assets/img/success.png" style={{
                            maxWidth: '248px', margin: '32px auto', display: 'block'
                        }} />
                        <p style={{ fontSize: '16pt' }}>{t("CartPage.sucsessText")} </p>
                        <p style={{ fontSize: '12pt' }}>{t("CartPage.oderNumber")} {(new Date().getMonth() + 1) + "/" + new Date().getDate() + new Date().getMinutes()} </p>
                    </Card>
                </Col>
            </Row>
        )

    }

    return (
        <MainLayout t={t} meta={{ title: t("title"), description: t("description") }}>
            <div className="main">
                {!isMobile ?
                    <Row>
                        <Col sm={24} md={12} style={{ margin: '2em auto' }}>
                            <Steps>
                                <Step status={currentStep === 0 ? "process" : "finish"} title={t("CartPage.steps.cart")} icon={currentStep === 0 ? <SettingFilled spin /> : <ShoppingCartOutlined />} />
                                <Step status={currentStep === 1 ? "process" : "finish"} title={t("CartPage.steps.delivery")} icon={currentStep === 1 ? <SettingFilled spin /> : <SolutionOutlined />} />
                                <Step status={currentStep === 2 ? "process" : "finish"} title={t("CartPage.steps.pay")} icon={currentStep === 2 ? <SettingFilled spin /> : <DollarCircleOutlined />} />
                                <Step status={currentStep === 3 ? "process" : "finish"} title={t("CartPage.steps.final")} icon={<SmileOutlined />} />
                            </Steps>
                        </Col>
                    </Row> : null}


                {currentStep === 0 ? <Row>
                    <Col sm={24} md={16} style={{ margin: '2em auto' }}>
                        {currentStep === 0 ? <CardStep1 /> : null}
                    </Col>
                </Row> : null}


                {currentStep === 1 ?
                    <div style={{
                        background: 'rgb(247, 247, 247)',
                        padding: '13px',
                        border: '4px',
                        borderBottomStyle: 'groove',
                        borderColor: '#d3ffdd',
                    }}>
                        <FormStyle>
                            <Row gutter={{ sm: 0, md: 16 }} >
                                <Col sm={24} md={12} className="formContainer" style={{ margin: '4em auto' }} >
                                    <h1 style={{
                                        fontSize: '19px',
                                        textAlign: 'center',
                                        color: '#8642b9',
                                    }} >{t("CartPage.inputsH1")}</h1>
                                    {error ? <Col span={24} className="mt-2 mb-2"><Alert message={error} type="error" /></Col> : null}
                                    <div style={{ marginTop: '2em', marginBottom: '2em' }}>
                                        <span style={{ color: 'rebeccapurple', fontWeight: '500' }}><FontAwesomeIcon icon={faUser} />{t("CartPage.inputs.fio.text")}</span>
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
                                                msgOnError: t("CartPage.inputs.fio.validator"),
                                                regMsg: "regMsg",
                                            }}
                                            validationCallback={res =>
                                                setFioValid(!res)
                                            }
                                        />
                                    </div>
                                    <div style={{ marginTop: '2em', marginBottom: '2em' }}>
                                        <span style={{ color: 'rebeccapurple', fontWeight: '500' }}><FontAwesomeIcon icon={faCity} /> {t("CartPage.inputs.city.text")}</span>
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
                                                msgOnError: t("CartPage.inputs.city.validator"),
                                                regMsg: "regMsg",
                                            }}
                                            validationCallback={res =>
                                                setUserCityValid(!res)
                                            }
                                        />
                                    </div>
                                    <div style={{ marginTop: '2em', marginBottom: '2em' }}>
                                        <span style={{ color: 'rebeccapurple', fontWeight: '500' }}><FontAwesomeIcon icon={faPhone} /> {t("CartPage.inputs.phone.text")}</span>
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
                                                msgOnError: t("CartPage.inputs.phone.validator"),
                                                regMsg: "regMsg",
                                            }}
                                            validationCallback={res =>
                                                setUserPhoneValid(!res)
                                            }

                                        />

                                    </div>
                                    <div style={{ marginTop: '2em', marginBottom: '2em' }}>
                                        <span style={{ color: 'rebeccapurple', fontWeight: '500' }}><FontAwesomeIcon icon={faTruck} />{t("CartPage.inputs.mailNumber.text")}</span>
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
                                                msgOnError: t("CartPage.inputs.mailNumber.validator"),
                                            }}
                                            validationCallback={res =>
                                                setUserMailNumberValid(!res)
                                            }
                                        />
                                    </div>
                                </Col>
                                <Col span={24}>
                                    <Button shape="round" size={'lage'} icon={<RightCircleOutlined />} style={{ margin: '2em auto', display: 'block', color: 'white', background: '#04c704' }} onClick={e => saveDataHendler()}>{t("next")}</Button>
                                    <Button shape="round" size={'lage'} icon={<LeftCircleOutlined />} style={{ margin: '2em auto', display: 'block' }} onClick={e => setCurrentStep(0)}>{t("previous")}</Button>
                                </Col>
                            </Row>
                        </FormStyle>
                    </div> : null}

                {currentStep === 2 ? <CardStep3 /> : null}
                {currentStep === 3 ? <CardStep4 /> : null}

                <Dilivery t={t} />
                <CallMe t={t} />

            </div>
        </MainLayout>
    )
}
Cart.getInitialProps = () => {
    return {
        namespacesRequired: ['common']
    }
};


export default withTranslation(['common'])(withRedux(Cart))
