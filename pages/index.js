import React, { useState, useEffect, useRef } from 'react'
import { ButtonGroup, UncontrolledCollapse, Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import data from '../data/products';
import ProductModal from '../componenst/productModal';
import NumericInput from 'react-numeric-input';
import Advantages from '../componenst/sections/advantages';
import About from '../componenst/sections/about';
import Dilivery from '../componenst/sections/dilivery';
import MainBlock from '../componenst/sections/mainBlock';
import Header from '../componenst/header'
import CallMe from '../componenst/callMe';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { withRedux } from '../lib/redux'
import { addToCard } from '../actions/mainPage'
import { Select, Button } from 'antd';

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
    const [totalPrice, setTotalPrice] = useState(0)
    const [type, SetType] = useState(2)

    const addToCart = (item, it) => {
        let ProductPriceField = document.getElementById(item.id);
        let ProductCustomHeight = document.getElementById(item.id + "_customHeight").value;
        let ProductCustomWidth = document.getElementById(item.id + "_customWidth").value;
        let ProductCustomSelect = document.getElementsByClassName(item.id + "_standartSelect")[0];
        let SizeInfo = '';

        if (ProductCustomSelect.options[ProductCustomSelect.selectedIndex].innerText !== "Свой размер") {
            SizeInfo = ProductCustomSelect.options[ProductCustomSelect.selectedIndex].innerText;
        } else {
            SizeInfo = ProductCustomWidth + "*" + ProductCustomHeight;
        }

        console.log("SizeInfo:", SizeInfo);

        store.card[store.card.length] = {
            title: item.title,
            price: totalPrice + Number(parseInt(ProductPriceField.value.replace(/\D+/g, ""))),
            id: item.id,
            idOnCard: store.card.length + 1,
            sizeInfo: SizeInfo,
            image: item.img[0].src
        }
        data[it].price = Number(parseInt(ProductPriceField.value.replace(/\D+/g, "")));
        dispatch(addToCard([...store.card]));

        console.log(ProductPriceField)
    }




    const changePrice = (itemId, value) => {
        let ProductPriceField = document.getElementById(itemId);
        let attributes = document.getElementById(itemId + "_attribute");
        attributes.setAttribute('price', value)
        // attributes.setAttribute('selectedSize', e.target.options[e.target.selectedIndex].innerText)
        ProductPriceField.value = value + " грн";
    }





    return (
        <Container fluid={true}>

            <Header />
            <Container className="main">
                <Row>
                    <Col className="section2" sm={12}>
                        <Advantages isMobile={isMobile} />
                        <MainBlock />
                    </Col>
                    <Col className="section3" sm={12} id="productSection">
                        <Row>
                            <ButtonGroup className="mt-5 mr-auto ml-auto" >
                                <Button outline color="info" onClick={e => SetType(2)}>Все</Button>
                                <Button outline color="info" onClick={e => SetType(1)}>Мальчикам</Button>
                                <Button outline color="info" onClick={e => SetType(0)}>Девочкам</Button>
                            </ButtonGroup>
                        </Row>
                        <Row>
                            {
                                data.map(function (item, it) {
                                    return (

                                        (type === item.type || type === 2) ? <Col sm={12} md={6} lg={6} xl={4} className="mt-5" key={`prod_${it}`}>
                                            <Card className="productBlock">
                                                {item.hot ? <div className="hot"></div> : false}

                                                <ProductModal title={item.title} imagePath={mobile().imagePath} imageType={mobile().imageType}>
                                                    <CardImg key={item.article} top width="100%" height="300px" src={mobile().imagePath + item.img[0].src + mobile().imageType} alt="Card image cap" />
                                                </ProductModal>
                                                <CardBody>
                                                    <CardText className="cardText ">
                                                        <p><input id={item.id} value={item.price + " грн"} disabled /></p>
                                                        <p className="mt-2 mb-2 itemIitle">{item.title + ", Материал: " + item.material} </p>
                                                        <Row className="mt-3">
                                                            <Col sm={12} md={6} id={item.id + "_size"} >
                                                                <Select style={{ width: '100%' }} defaultValue={item.sizes[0].size} onChange={(value) => changePrice(item.id, value)}>
                                                                    {item.sizes.map(function (data, i) {
                                                                        return (
                                                                            <Option value={data.price} defaultChecked={(i <= 1) ? true : false} key={it + data.size}>{data.size}</Option>
                                                                        )
                                                                    })}
                                                                </Select>
                                                            </Col>
                                                            <Col sm={12} md={6}>
                                                                <Button onClick={e => addToCart(item, it)} className="addToCart" type="primary">В корзину</Button>
                                                            </Col>
                                                        </Row>


                                                        <span className="togglerInfo" color="primary" id={`toggler` + item.id} style={{ marginBottom: '1rem', marginTop: '1rem' }}>
                                                            Посмотреть описание простынки
                                                        </span>
                                                        <UncontrolledCollapse toggler={`#toggler` + item.id}>
                                                            <p> {item.text} </p>
                                                        </UncontrolledCollapse>
                                                    </CardText>
                                                </CardBody>
                                            </Card>
                                            <div id={item.id + "_attribute"} price={item.price} customWidth={0} CustomSizeHeight={0} selectedSize={item.sizes[0].size}></div>
                                        </Col> : null

                                    )
                                })
                            }
                        </Row>
                    </Col>


                    <Col className="sectio5 mt-5 mb-5" sm={12} id="diliverySection">
                        <Dilivery isMobile={isMobile} />
                    </Col>
                    <CallMe />
                    <Col className="section4 mt-5 mb-5" sm={12} id="aboutSection">
                        <About />
                    </Col>
                </Row>




            </Container >
            <Row className="footer">


            </Row>

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
        </Container >

    )
}


export default withRedux(HomePage)
