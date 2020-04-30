import React, { useState, useEffect } from 'react'
import CallMe from '../componenst/callMe';
import data from '../data/products';
import { withRedux } from '../lib/redux'
import { Row, Col, Input, Button, InputNumber, Table, Cascader, Alert } from 'antd';
import { withTranslation } from '../i18n'
import MainLayout from '../componenst/layouts/main'
import styled from 'styled-components'

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

function Return({ t, lng }) {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [type, setType] = useState(0);
    const [product, setProduct] = useState(0);
    const [result, setResult] = useState(0);
    const [startPrice, setStartPrice] = useState(0);
    const [startWidth, setStartWidth] = useState(0);
    const [startHeight, setStartHeight] = useState(0);
    const [alert, SetAlert] = useState(null);



    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Название',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Действие',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button onClick={e => selectProduct(record)}>Выбрать</Button>
                </span>
            ),
        },
    ];

    const selectProduct = (record) => {
        setStartPrice(record.price)
        setStartWidth(record.startWidth)
        setStartHeight(record.startHeight)
        SetAlert("Выбрано: " + record.title)
    }
    const showRezult = () => {
        finalResult();
    }


    const finalResult = () => {
        let resWidth = ((startPrice / 60) * width) - startPrice;
        let resHeight = ((startPrice / 120) * height) - startPrice;

        console.log(((startPrice + "/" + 60) + "*" + height) + "-" + startPrice)
        console.log(((startPrice + "/" + 120) + "*" + width) + "-" + startPrice)
        setResult(resWidth + resHeight + startPrice)
    }

    return (
        <MainLayout t={t} meta={{ title: "Калькулятор", description: t("description") }} className="main">
            <InfoContent>
                <Row>
                    <Col sm={24} md={12} className="infoContent" style={{ margin: '3em auto', width: '78%' }}>
                        {alert ? <Alert message={alert} type="success" style={{ width: '100%' }} /> : null}
                        <div style={{ margin: '1em auto' }}>Длинна:</div>
                        <InputNumber style={{ width: '100%', textAlign: 'center' }} placeholder="Новая Длинна" onChange={e => setWidth(e)} />
                        <Input.Group style={{ margin: '1em auto' }}>
                            <div>Ширина:</div>
                            <InputNumber
                                className="site-input-right"
                                onChange={e => setHeight(e)}
                                style={{
                                    width: '100%',
                                    textAlign: 'center',
                                }}
                                placeholder="Новая Ширина"
                            />
                        </Input.Group>
                        <Button style={{ margin: '1em auto', background: '#6767ce', color: 'white' }} onClick={e => showRezult()}>Посчитать</Button>
                    </Col>
                    <Col sm={24} md={12} className="infoContent" style={{ margin: '3em auto', width: '78%' }}>
                        <div style={{ margin: ' 3em auto', width: '78%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#5b409b', fontWeight: '700', fontSize: ' 18pt' }}>Результат:  {result} грн</div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={24}>
                        <Table columns={columns} dataSource={data} />
                    </Col>
                </Row>
            </InfoContent>
            <CallMe t={t} />
            
        </MainLayout >
    )
}


Return.getInitialProps = () => {
    return {
        namespacesRequired: ['common'],
    }
}

export default withTranslation(['common'])(withRedux(Return))