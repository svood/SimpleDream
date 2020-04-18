import React, { useState, } from 'react'
import data from '../data/products';
import ProductModal from '../componenst/productModal';
import Advantages from '../componenst/sections/advantages';
import About from '../componenst/sections/about';
import Dilivery from '../componenst/sections/dilivery';
import MainBlock from '../componenst/sections/mainBlock';
import CallMe from '../componenst/callMe';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { withRedux } from '../lib/redux'
import { addToCard } from '../actions/mainPage'
import { Select, Button, Collapse, Row, Col, Card } from 'antd';

import {
    isMobile,
    isMobileSafari,
    isSafari,
    isEdge
} from "react-device-detect";

function HomePage(props) {
    const dispatch = useDispatch();
    const mainPageStore = () => {
        return useSelector(state => ({
            store: state.mainPage,
        }), shallowEqual);
    }; // Store
    const { store } = mainPageStore();
    const { Option } = Select;
    const { Panel } = Collapse;


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

    const [type, SetType] = useState(2)

    const addToCart = (item, it) => {
        let attributes = document.getElementById(item.id + "_attribute");
        let SizeInfo = attributes.getAttribute('selectedSize');
        let productPrice = attributes.getAttribute('price')
        store.card[store.card.length] = {
            title: item.title,
            price: Number(parseInt(productPrice)),
            id: item.id,
            idOnCard: store.card.length + 1,
            sizeInfo: SizeInfo,
            image: item.img[0].src
        }
        dispatch(addToCard([...store.card]));
    }

    const changePrice = (item, value) => {
        let ProductPriceField = document.getElementById(item.id);
        let attributes = document.getElementById(item.id + "_attribute");
        let selectedSize = item.sizes.find(e => e.price === value);
        attributes.setAttribute('selectedSize', selectedSize.size)
        ProductPriceField.value = value + " грн";
    }





    return (
        <>
            <Advantages isMobile={isMobile} />
            <MainBlock />

            <Row gutter={[0, 48]} justify="center">
                <Col>
                    <Button outline color="info" onClick={e => SetType(2)}>Все</Button>
                    <Button outline color="info" onClick={e => SetType(1)}>Мальчикам</Button>
                    <Button outline color="info" onClick={e => SetType(0)}>Девочкам</Button>
                </Col>
            </Row>

            <Row gutter={[16,16]} justify="center" >
                {
                    data.map(function (item, it) {
                        return (
                            (type === item.type || type === 2) ?
                                <Col  xs={20} sm={20} md={12} lg={8} xl={7}>
                                    <Card hoverable>
                                        {item.hot ? <div className="hot"></div> : false}
                                        <ProductModal title={item.title} imagePath={mobile().imagePath} imageType={mobile().imageType}>
                                            <img key={item.article} top width="100%" height="300px" src={mobile().imagePath + item.img[0].src + mobile().imageType} alt="Card image cap" />
                                        </ProductModal>
                                        <p><input id={item.id} value={item.price + " грн"} disabled /></p>
                                        <p className="mt-2 mb-2 itemIitle">{item.title + ", Материал: " + item.material} </p>
                                        <Row >
                                            <Col span={12} id={item.id + "_size"} >
                                                <Select style={{ width: '100%' }} defaultValue={item.sizes[0].size} onChange={(value) => changePrice(item, value)}>
                                                    {item.sizes.map(function (data, i) {
                                                        return (
                                                            <Option value={data.price} defaultChecked={(i <= 1) ? true : false} key={it + data.size}>{data.size}</Option>
                                                        )
                                                    })}
                                                </Select>
                                            </Col>
                                            <Col span={12}>
                                                <Button onClick={e => addToCart(item, it)} className="addToCart" type="primary">В корзину</Button>
                                            </Col>
                                        </Row>
                                        <Collapse style={{marginTop:'1em'}}>
                                            <Panel header="Посмотреть описание простынки" >
                                                <p>{item.text}</p>
                                            </Panel>
                                        </Collapse>
                                    </Card>
                                    <div id={item.id + "_attribute"} price={item.price} customWidth={0} CustomSizeHeight={0} selectedSize={item.sizes[0].size}></div>
                                </Col> : null
                        )
                    })
                }
            </Row>

            <Dilivery isMobile={isMobile} />
            <CallMe />
            <About />

            {/* CARD */}
            <div>
                {
                    store.card.length > 0 ?
                        <div className="shopingCard" onClick={e => window.location.href = '/card'}>
                            <span>{store.card.length}</span>
                            <img src='/images/ShoppingCart.svg' />
                        </div> : null
                }
            </div>
        </ >

    )
}


export default withRedux(HomePage)
