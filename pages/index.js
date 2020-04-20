import React, { useState, useEffect } from 'react'
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
import LazyLoad from 'react-lazyload';
import ReactGA from 'react-ga';
import Head from 'next/head'

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

    useEffect(() => {
        ReactGA.initialize('UA-163962797-1');
    });

    const goToCart = () => {
        ReactGA.event({
            category: 'Cart',
            action: 'Click to bottom cart icon'
        });
        window.location.href = '/card'
    }

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

    const [type, SetType] = useState(4)




    const addToCart = (item, it) => {
        ReactGA.event({
            category: 'Cart',
            action: 'Add to cart',
            value: item.title
        });
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
        <div className='main'>

            <Head>
                <title>Детские простынки ✓ Простынки из хлопка ✓ Купить детскую постель ✓  Simple Dreams</title>
                <meta name="description" content="Детские простынки их хлопка ✔ Купить детскую простынку ✔ Натуральные простынки ✔ Simple Dreams "></meta>
            </Head>

            <Advantages isMobile={isMobile} />
            <MainBlock />
            <Row gutter={{ xs: 2, sm: 2, md: 28, lg: 48 }} justify="center">
                <Col>
                    <Button outline color="info" onClick={e => SetType(4)}>Все</Button>
                    <Button outline color="info" onClick={e => SetType(1)}>Мальчикам</Button>
                    <Button outline color="info" onClick={e => SetType(0)}>Девочкам</Button>
                    <Button outline color="info" onClick={e => SetType(3)}>Унивирсальные</Button>
                </Col>
            </Row>
            <Row gutter={{ xs: 2, sm: 2, md: 16, lg: 16 }} justify="center" style={{ marginTop: '3em' }}>
                {
                    data.map(function (item, it) {
                        return (
                            (type === item.type || type === 4) ?
                                <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                    <Card hoverable>
                                        {item.hot ? <div className="hot">HOT</div> : false}
                                        <ProductModal title={item.title} imagePath={mobile().imagePath} imageType={mobile().imageType}>
                                            <LazyLoad height={400} once>
                                                <img key={item.article} className='card-img-top' top width="100%" height="300px" src={mobile().imagePath + item.img[0].src + mobile().imageType} alt="Card image cap" />
                                            </LazyLoad>

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
                                                <Button onClick={e => addToCart(item, it)} className="addToCart"  >В корзину</Button>
                                            </Col>
                                        </Row>
                                        <Collapse style={{ marginTop: '1em' }}>
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

            <div>
                {
                    store.card.length > 0 ?
                        <div className="shopingCard" onClick={e => goToCart()}>
                            <span>{store.card.length}</span>
                            <img src='/images/ShoppingCart.svg' />
                        </div> : null
                }
            </div>
        </div>
    )
}


export default withRedux(HomePage)
