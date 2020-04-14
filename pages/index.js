import React, { useState, useEffect, useRef } from 'react'
import { ButtonGroup, UncontrolledCollapse, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import data from '../data/products';
import ProductModal from '../componenst/productModal';
import NumericInput from 'react-numeric-input';
import Advantages from '../componenst/sections/advantages';
import About from '../componenst/sections/about';
import Dilivery from '../componenst/sections/dilivery';
import MainBlock from '../componenst/sections/mainBlock';
import { Wizard } from 'react-multi-steps'
import Header from '../componenst/header'
import CallMe from '../componenst/callMe';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { withRedux } from '../lib/redux'
import { addPhone, addMailNumber, addFio, addCity, addToCard } from '../actions/mainPage'


function HomePage(props) {
    const dispatch = useDispatch();
    const mainPageStore = () => {
        return useSelector(state => ({
            store: state.mainPage,
        }), shallowEqual);
    }; // Store
    const { store } = mainPageStore();


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


    const CustomSizeWidth = (id, startWidth, startHeight, defaultPrice, newWidth, it) => {
        let ProductPriceField = document.getElementById(id);
        let ProductCustomField = document.getElementById(id + "_customHeight").value;
        let WidthPrice = ((defaultPrice / startWidth) * Number(newWidth)) - defaultPrice;
        let HeightPrice = ((defaultPrice / startHeight) * Number(ProductCustomField)) - defaultPrice;
        ProductPriceField.value = WidthPrice + HeightPrice + defaultPrice + " грн";
    }

    const CustomSizeHeight = (id, startWidth, startHeight, defaultPrice, newHeight, it) => {
        let ProductPriceField = document.getElementById(id);
        let ProductCustomField = document.getElementById(id + "_customWidth").value;
        let HeightPrice = ((defaultPrice / startHeight) * Number(newHeight)) - defaultPrice;
        let WidthPrice = ((defaultPrice / startWidth) * Number(ProductCustomField)) - defaultPrice;
        ProductPriceField.value = HeightPrice + WidthPrice + defaultPrice + " грн";
    }

    const changePrice = (itemId, addedPrice, defaultPrice, startWidth, startHeight, it) => {
        let ProductPriceField = document.getElementById(itemId);
        let ProductCustomField = document.getElementById(itemId + "_customPrice");
        let pricePlus = Number(addedPrice);

        if (pricePlus > 0) {
            ProductCustomField.style.display = "none"
            ProductPriceField.value = pricePlus + " грн";
            data[it].price = pricePlus;
        } else {
            let ProductCustomFieldHeight = document.getElementById(itemId + "_customHeight").value;
            let ProductCustomFieldWidth = document.getElementById(itemId + "_customWidth").value;
            let WidthPrice = ((defaultPrice / startWidth) * Number(ProductCustomFieldWidth)) - defaultPrice;
            let HeightPrice = ((defaultPrice / startHeight) * Number(ProductCustomFieldHeight)) - defaultPrice;
            ProductPriceField.value = Number(WidthPrice) + Number(HeightPrice) + defaultPrice + " грн";
            ProductCustomField.style.display = "block";
        }
    }





    return (
        <Container fluid={true}>
            {console.log("isChrome", props.isChrome)}
            <Header />
            <Container className="main">
                <Row>
                    <Col className="section2" sm={12}>
                        <Advantages />
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

                                        (type === item.type || type === 2) ? <Col sm={12} md={3} className="mt-5" key={`prod_${it}`}>
                                            <Card className="productBlock">
                                                {item.hot ? <div className="hot"></div> : false}

                                                <ProductModal title={item.title}>
                                                    <CardImg key={item.article} top width="100%" height="300px" src={props.imagePath + item.img[0].src + props.imageType} alt="Card image cap" />
                                                </ProductModal>
                                                <CardBody>
                                                    <CardText className="cardText ">
                                                        <p><input id={item.id} value={item.price + " грн"} disabled /></p>
                                                        <p className="mt-2 mb-2 itemIitle">{item.title + ", Материал: " + item.material} </p>
                                                        <Row className="mt-3">
                                                            <Col sm={12} md={6}>
                                                                <FormGroup>
                                                                    <Input type="select" name="select" id="size" className={item.id + "_standartSelect"} onChange={e => changePrice(item.id, e.target.value, item.price, item.startWidth, item.startHeight, it)}>
                                                                        {item.sizes.map(function (data, i) {
                                                                            return (
                                                                                <option value={data.price} defaultChecked={(i <= 1) ? true : false} key={it + data.size}>{data.size}</option>
                                                                            )
                                                                        })}
                                                                        <option value="0">Свой размер</option>
                                                                    </Input>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col sm={12} md={6}>
                                                                <Button onClick={e => addToCart(item, it)} className="addToCart" outline color="success">В корзину</Button>
                                                            </Col>
                                                        </Row>

                                                        <div id={item.id + "_customPrice"} style={{ display: 'none' }}>
                                                            <Row className="CustomInputs" >
                                                                <Col sm={12}>* Впишите размеры в см </Col>
                                                                <Col sm={12} md={6}>
                                                                    <Label for="long">Ширина</Label>
                                                                    <NumericInput
                                                                        id={item.id + "_customWidth"}
                                                                        style={false}
                                                                        name="long"
                                                                        defaultValue={item.startWidth}
                                                                        min={item.startWidth}
                                                                        max={item.maxWidth}
                                                                        onChange={value => CustomSizeWidth(item.id, item.startWidth, item.startHeight, item.price, value, it)}
                                                                    />
                                                                </Col>

                                                                <Col sm={12} md={6}>
                                                                    <Label for="width">Длинна</Label>
                                                                    <form>
                                                                        <NumericInput
                                                                            id={item.id + "_customHeight"}
                                                                            style={false}
                                                                            name="width"
                                                                            defaultValue={item.startHeight}
                                                                            min={item.starHeight}
                                                                            max={item.maxHeight}
                                                                            onChange={value => CustomSizeHeight(item.id, item.startWidth, item.startHeight, item.price, value, it)}
                                                                        />
                                                                    </form>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <span color="primary" id={`toggler` + item.id} style={{ marginBottom: '1rem', marginTop: '1rem' }}>
                                                            Посмотреть описание простынки
                                                        </span>
                                                        <UncontrolledCollapse toggler={`#toggler` + item.id}>
                                                            <p> {item.text} </p>
                                                        </UncontrolledCollapse>
                                                    </CardText>
                                                </CardBody>
                                            </Card>
                                        </Col> : null
                                    )
                                })
                            }
                        </Row>
                    </Col>


                    <Col className="sectio5 mt-5 mb-5" sm={12} id="diliverySection">
                        <Dilivery isChrome={props.isChrome} />
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
HomePage.getInitialProps = ({ req }) => {
    let userAgent;
    let imagePath;
    let imageType;
    if (req) { // if you are on the server and you get a 'req' property from your context
        userAgent = req.headers['user-agent'] // get the user-agent from the headers
    } else {
        userAgent = navigator.userAgent // if you are on the client you can access the navigator from the window object
    }
    // let isChrome = Boolean(userAgent.match(
    //     /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    // ))
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
        imageType: imageType
    }
};

export default withRedux(HomePage)
