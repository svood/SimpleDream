import React, { useState, useEffect,useRef } from 'react'
import { Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Slider from '../componenst/sliderProduct'
import data from '../data/products'
import ProductModal from '../componenst/productModal'
import cookie from 'react-cookies'
import NumericInput from 'react-numeric-input';
import MainSlider from '../componenst/mainSlider';
import Header from '../componenst/header';
import Advantages from '../componenst/sections/advantages';
import About from '../componenst/sections/about';
import CartModal from '../componenst/cartModal'





function HomePage() {

    const [cart, setCart] = useState(Array)
    const [totalPrice, setTotalPrice] = useState(0)
    const [type,SetType] = useState(2)
    const AboutRef = useRef(null)
    const executeScroll = () => scrollToRef(myRef)

    const constSortData  = () => {
        let newData = [];
        switch (true) {
            case type === 2:
                newData = data;
            default:
                data.map(i=>{
                    if (i.type = type) {
                        newData.push(i)
                    }
                })
            
        }
        return newData;
    }

    const addToCart = (item, it) => {
        let ProductPriceField = document.getElementById(item.id);
        cart[cart.length] = { title: item.title, price: totalPrice + Number(ProductPriceField.value), id: item.id }
        data[it].price = Number(ProductPriceField.value);
        setCart([...cart])
        console.log(cart)
    }

    const clearCart = () => { setTotalPrice(null) }

    const CustomSizeWidth = (id, startWidth, startHeight, defaultPrice, newWidth, it) => {
        let ProductPriceField = document.getElementById(id);
        let ProductCustomField = document.getElementById(id + "_customHeight").value;
        let WidthPrice = ((defaultPrice / startWidth) * Number(newWidth)) - defaultPrice;
        let HeightPrice = ((defaultPrice / startHeight) * Number(ProductCustomField)) - defaultPrice;
        ProductPriceField.value = WidthPrice + HeightPrice + defaultPrice;
    }

    const CustomSizeHeight = (id, startWidth, startHeight, defaultPrice, newHeight, it) => {
        let ProductPriceField = document.getElementById(id);
        let ProductCustomField = document.getElementById(id + "_customWidth").value;
        let HeightPrice = ((defaultPrice / startHeight) * Number(newHeight)) - defaultPrice;
        let WidthPrice = ((defaultPrice / startWidth) * Number(ProductCustomField)) - defaultPrice;
        ProductPriceField.value = HeightPrice + WidthPrice + defaultPrice;
    }

    const changePrice = (itemId, addedPrice, defaultPrice, startWidth, startHeight, it) => {
        let ProductPriceField = document.getElementById(itemId);
        let ProductCustomField = document.getElementById(itemId + "_customPrice");
        let pricePlus = Number(addedPrice);
        if (pricePlus > 0) {
            ProductCustomField.style.display = "none"
            ProductPriceField.value = pricePlus;
            data[it].price = pricePlus;
        } else {
            let ProductCustomFieldHeight = document.getElementById(itemId + "_customHeight").value;
            let ProductCustomFieldWidth = document.getElementById(itemId + "_customWidth").value;
            let WidthPrice = ((defaultPrice / startWidth) * Number(ProductCustomFieldWidth)) - defaultPrice;
            let HeightPrice = ((defaultPrice / startHeight) * Number(ProductCustomFieldHeight)) - defaultPrice;
            ProductPriceField.value = Number(WidthPrice) + Number(HeightPrice) + defaultPrice;
            ProductCustomField.style.display = "block";
        }
    }


    return (
        <Container fluid={true}>
            <Header />
            <Container className="main">
                <Row>
                    {/* <Col className="section1" sm={12}> <MainSlider /> </Col> */}
                    <Col className="section2 mt-5 mb-5" sm={12}> <Advantages /> </Col>
                    <Col className="section3" sm={12} id="productSection">
                        <Row>
                            <button onClick={e=>SetType(2)}>ALL</button>
                            <button onClick={e=>SetType(1)}>MEN</button>
                            <button onClick={e=>SetType(0)}>NOT A MEN</button>
                        </Row>
                        <Row>
                            {
                                data.map(function (item, it) {
                                    return (
                                    
                                    (type === item.type || type === 2)  ?  <Col sm={12} md={3} className="mt-5" key={`prod_${it}`}>
                                            <Card>
                                                <ProductModal title={item.title}> <CardImg key={item.article} top width="100%" height="300px" src={item.img[0].src} alt="Card image cap" /></ProductModal>
                                                <CardBody>
                                                    <CardTitle className="mt-2 mb-2">{item.title} </CardTitle>

                                                    <CardSubtitle className=" mb-2 text-center">Материал: {item.material}</CardSubtitle>

                                                    <CardText className="cardText mb-3">
                                                        <div className="mb-3">
                                                            <input className="price" id={item.id} value={item.price} disabled />
                                                        </div>
                                                        <p> {item.text} </p>

                                                        <Row className="mt-3">
                                                            <Col sm={12} md={6}>
                                                                <FormGroup>

                                                                    <Input type="select" name="select" id="size" onChange={e => changePrice(item.id, e.target.value, item.price, item.startWidth, item.startHeight, it)}>
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
                                                            <Row className="">
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

                                                    </CardText>
                                                </CardBody>
                                            </Card>
                                        </Col> : null
                                    )
                                })
                            }

                        </Row>
                    </Col>
                    <Col className="section4 mt-5 mb-5" sm={12} id="aboutSection">
                        <About />
                    </Col>
                </Row>

                {cart.length > 0 ?
                    <CartModal data={cart} /> : null
                }


            </Container >
            <Row className="footer"></Row>

        </Container >

    )
}
export default HomePage