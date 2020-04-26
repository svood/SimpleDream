import React from 'react'
import CallMe from '../componenst/callMe';
import { useSelector, shallowEqual } from 'react-redux'
import { withRedux } from '../lib/redux'
import { Row, Col, Card, Descriptions, Badge, Form, Input, InputNumber, Button } from 'antd';
import { withTranslation } from '../i18n'
import MainLayout from '../componenst/layouts/main'
import { ru, ua } from '../public/static/texts/return'
import styled from 'styled-components'
import { i18n } from '../i18n'
import axios from 'axios'
import qs from 'qs'
const InfoContent = styled.div`
        width:95%;
        margin:1em auto;
        text-align: justify;
        border: 1px solid rebeccapurple;
        border-radius: 16px;
        padding: 2em;
        h1 {
            border-left: 3px solid red;
            padding-left: 1em;
            margin-top: 1em;
            margin-bottom: 1em;
            color: #004a99;
        }
        h3 {
            font-size: 16pt;
            color: #004a99;
        }
        ul {
            margin-top: 1em;
        }
        
`;

const CartStyle = styled.div`
    position: fixed;
    img {
        width: 100px;
        position: fixed;
        bottom: 4%
        right: 4%;
        z-index: 9;
        background: white;
        border: 1px solid #1ba52c;
        border-radius: 84px;
    }
    span {
        position: fixed;
        bottom: 17%;
        right: 4%;
        z-index: 10;
        font-size: 17pt;
        color: #ff0047;
        background: white;
        border-radius: 50px;
        border: 1px solid #ffa73a;
        width: 35px;
        height: 35px;
        text-align: center;
        
    }
`

const InfoStyles = styled.div`
font-size: 12pt;
font-size: 12pt;
text-transform: uppercase;
text-align: left;

display: list-item;
line-height: 25px;
margin-bottom: 3em;
font-weight: 100;
    a {
        font-weight: 500;
        color: #7128d3;
        margin-top: 1em;
        display: block;
     }
`;


function Contacts({ t, lng }) {

    const sendForm = async (data) => {

        const requestBody = {
            email: data.user.email,
            introduction: data.user.introduction,
            name: data.user.name,
        }

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            }
        }

        await axios.post('http://simple-dreams.com.ua/api/sendforminfo', qs.stringify(requestBody), config)
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
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const validateMessages = {
        required: '${label}' + " " + t('ContactsPage.validReq'),
        types: {
            email: '${label}' + " " + t('ContactsPage.notValid'),
        }
    };
    const onFinish = values => {
        sendForm(values)
    };

    return (
        <MainLayout t={t} meta={{ title: t("title"), description: t("description") }} className="main">
            <InfoContent>
                <Row>
                    <Col sm={24} md={24}>
                        <h1>{t('ContactsPage.OURContscts')}:</h1>
                    </Col>

                    <Col sm={24} md={12} className="infoContent">
                        <Card>


                            <InfoStyles>
                                <p><strong>{t('ContactsPage.mainNumber')}:</strong> <br /><a href="tel:+380953140133">+(380) 95 31 40 133</a></p>
                                <p><strong>{t('ContactsPage.dopNumber')}:</strong> <br /><a href="tel:+380976581954">+(380) 97 65 81 954</a></p>
                                <p><strong>{t('ContactsPage.mail')}:</strong> <br /><a href="mailto:info.simpledreams@gmail.com">info.simpledreams@gmail.com</a></p>
                            </InfoStyles>
                        </Card>
                    </Col>
                    <Col sm={24} md={12}>
                        <Card>
                            <p style={{ textAlign: 'right' }}>{t('ContactsPage.addQes')}:</p>
                            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                                <Form.Item name={['user', 'name']} label={t('ContactsPage.name')} rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name={['user', 'email']} label={t('ContactsPage.mail')} rules={[{ type: 'email', required: true }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name={['user', 'introduction']} label={t('ContactsPage.asck')}>
                                    <Input.TextArea />
                                </Form.Item>
                                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                    <Button type="primary" htmlType="submit">
                                        {t('ContactsPage.submit')}
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>

                    <Col sm={24} md={24}>
                        <Descriptions title={t('ContactsPage.dopcontacts')}>
                            <Descriptions.Item label={t('ContactsPage.company')}>SimpleDreams</Descriptions.Item>
                            <Descriptions.Item label={t('ContactsPage.finPhone')}><a href="tel:+380937501429">+(380) 93 75 01 429</a></Descriptions.Item>
                            <Descriptions.Item label={t('ContactsPage.addressTitle')}>{t('ContactsPage.address')}</Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>
            </InfoContent>
            <CallMe t={t} />
            <div>
                {
                    store.card.length > 0 ?
                        <CartStyle className="shopingCard" onClick={e => window.location.href = '/card'}>
                            <span>{store.card.length}</span>
                            <img src='/images/ShoppingCart.svg' />
                        </CartStyle> : null
                }
            </div>
        </MainLayout >
    )
}


Contacts.getInitialProps = () => {
    return {
        namespacesRequired: ['common'],
    }
}

export default withTranslation(['common'])(withRedux(Contacts))