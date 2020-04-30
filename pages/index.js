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
import { withTranslation, i18n } from '../i18n'
import MainLayout from '../componenst/layouts/main'
import TellMe from '../componenst/telMe'
import {
    isMobile,
    isMobileSafari,
    isSafari,
    isEdge
} from "react-device-detect";
import styled from 'styled-components'


const Product = styled.div`
    img {
        height: 400px;
        object-fit: cover;
        width:100%;
    }
    input {
        margin: 0 auto;
        display: block;
        text-align: center;
        background: #ebebeb;
        border: none;
        width: 100%;
        font-weight: 700;
        color: #646464;
    }
    :hover {
        button {
            background: green;
            color:white;
        }
    }
    button {
        background: aliceblue;
        width: 100%;
    }
    p {
        color: black;
        margin-top: 1em;
    }
    
    .hot {
        position: absolute;
        top: 4em;
        background: red;
        padding: 0 1em 0 1em;
        color: white;
        z-index: 99;
        width: 4em;
        height: 2em;
        line-height: 2em;
    }
    .super {
        position: absolute;
        top: 2em;
        background: #ffffffe8;
        padding: 0 1em 0 1em;
        color: #7c46ff;
        z-index: 99;
        width: 13em;
        height: 2em;
        line-height: 2em;
    }
    .ant-collapse {
        margin-top:1em;
    }
    .ant-select {
        width:100%
    }
`
const CartStyle = styled.div`
    position: fixed;
    img {
        width: 100px;
        position: fixed;
        bottom: 5%;
        right: 3%;
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

const Sort = styled.div`
width:100%;
@media (max-width: 768px) {
    flex-direction: column;
  }
    @media (max-width: 900px) {
        button {
            width:100%;
            width: 50%;
            margin: 1em auto;
        }
       }
`;

function HomePage({ t, star }) {
    const dispatch = useDispatch();
    const mainPageStore = () => {
        return useSelector(state => ({
            store: state.mainPage,
        }), shallowEqual);
    }; // Store
    const { store } = mainPageStore();
    const { Option } = Select;
    const { Panel } = Collapse;
    const [type, SetType] = useState(4)
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

    const addToCart = (item) => {
        ReactGA.event({
            category: 'Cart',
            action: 'Add to cart',
            value: item.title
        });
        let attributes = document.getElementById(item.id + "_attribute");
        let SizeInfo = attributes.getAttribute('selectedSize');
        let productPrice = attributes.getAttribute('price')
        store.card[store.card.length] = {
            title: i18n.language === "ru" ? item.title : item.titleUA,
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
        <MainLayout t={t} meta={{ title: t("title"), description: t("description") }}>
            {console.log('props', star)}
            <Advantages isMobile={isMobile} t={t} />
            <MainBlock t={t} />
            <Row gutter={{ xs: 2, sm: 2, md: 28, lg: 48 }} justify="center" >
                <Col>
                    <Sort>
                        <Button outline onClick={e => SetType(4)}>{t("sort.all")}</Button>
                        <Button outline onClick={e => SetType(1)}>{t("sort.man")}</Button>
                        <Button outline onClick={e => SetType(0)}>{t("sort.woman")}</Button>
                        <Button outline onClick={e => SetType(3)}>{t("sort.unyversal")}</Button>
                    </Sort>
                </Col>
            </Row>
            <Row gutter={{ xs: 2, sm: 2, md: 16, lg: 16 }} justify="center" style={{ marginTop: '3em' }}>
                {
                    data.map(function (item, it) {
                        return (
                            (type === item.type || type === 4) ?
                                <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                    <Card hoverable>
                                        <Product>
                                            {item.hot ? <span className="hot">{t("hotLable")}</span> : false}
                                            {item.super ? <span className="super">{t("designLable")}</span> : false}

                                            <ProductModal title={item.title} imagePath={mobile().imagePath} imageType={mobile().imageType}>
                                                <LazyLoad height={400} once>
                                                    <img key={item.article} src={mobile().imagePath + item.img[0].src + mobile().imageType} alt={item.title} />
                                                </LazyLoad>
                                            </ProductModal>

                                            <input id={item.id} value={item.price + " грн"} disabled />
                                            <p>{i18n.language === "ru" ? item.title : item.titleUA + ", " + t("material") + ": " + item.material} </p>
                                            <Row >
                                                <Col span={12} id={item.id + "_size"} >
                                                    <Select defaultValue={item.sizes[0].size} onChange={(value) => changePrice(item, value)}>
                                                        {item.sizes.map(function (data, i) {
                                                            return (
                                                                <Option value={data.price} defaultChecked={(i <= 1) ? true : false} key={it + data.size}>{data.size}</Option>
                                                            )
                                                        })}
                                                    </Select>
                                                </Col>
                                                <Col span={12}>
                                                    <Button onClick={e => addToCart(item, it)}>{t("addToCart")}</Button>
                                                </Col>
                                            </Row>
                                            <Collapse >
                                                <Panel header={t("showProductDesk")} >
                                                    <p>{i18n.language === "ru" ? item.text : item.textUA}</p>
                                                </Panel>
                                            </Collapse>
                                        </Product>
                                    </Card>
                                    <div id={item.id + "_attribute"} price={item.price} customWidth={0} CustomSizeHeight={0} selectedSize={item.sizes[0].size}></div>
                                </Col> : null
                        )
                    })
                }
            </Row>

            <Dilivery isMobile={isMobile} t={t} />
            <CallMe t={t} />
            <About t={t} />
            <TellMe t={t}/>
            <div>
                {
                    store.card.length > 0 ?
                        <CartStyle className="shopingCard" onClick={e => goToCart()}>
                            <span>{store.card.length}</span>
                            <img src='/images/ShoppingCart.svg' />
                        </CartStyle> : null
                }
            </div>
        </MainLayout>
    )
}



HomePage.getInitialProps = ({ }) => {
    return {
        namespacesRequired: ['common'],
    }
};


export default withTranslation(['common'])(withRedux(HomePage))
