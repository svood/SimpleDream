import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Slider from '../componenst/sliderProduct'
import data from '../data/products'
import ProductModal from '../componenst/productModal'
import cookie from 'react-cookies'
import NumericInput from 'react-numeric-input';


function HomePage() {

    const [cart, setCart] = useState(Array)
    const [totalPrice, setTotalPrice] = useState(null)
    // var dataMap = new Map(Object.entries(data));

    const addToCart = (data) => {
        cart[cart.length] = data
        setTotalPrice(totalPrice + data.price)
    }

    const clearCart = () => { setTotalPrice(null) }

const CustomSizeWidth = (id,startWidth,startHeight,defaultPrice,newWidth) => {
   
    let ProductPriceField = document.getElementById(id);
    let ProductCustomField = document.getElementById(id + "_customHeight").value;

    let WidthPrice =  ((defaultPrice / startWidth) * Number(newWidth)) - defaultPrice;

    let HeightPrice =  ((defaultPrice / startHeight) * Number(ProductCustomField)) - defaultPrice;
   
    console.log("Итого:"+ WidthPrice + HeightPrice + defaultPrice)

    ProductPriceField.value = WidthPrice + HeightPrice + defaultPrice;
}

const CustomSizeHeight = (id,startWidth,startHeight,defaultPrice,newHeight) => {
   
    let ProductPriceField = document.getElementById(id);
    let ProductCustomField = document.getElementById(id + "_customWidth").value;


    let HeightPrice =  ((defaultPrice / startHeight) * Number(newHeight)) - defaultPrice;
    let WidthPrice =  ((defaultPrice / startWidth) * Number(ProductCustomField)) - defaultPrice;
   

    console.log("Итого:"+HeightPrice + WidthPrice + defaultPrice)

    ProductPriceField.value = HeightPrice + WidthPrice + defaultPrice;

}


    

    const changePrice = (itemId, addedPrice, defaultPrice) => {

        let ProductPriceField = document.getElementById(itemId);
        let ProductCustomField = document.getElementById(itemId + "_customPrice");
        let pricePlus = Number(addedPrice);

        if (addedPrice > 0) {
            ProductCustomField.style.display = "none"
            ProductPriceField.value = pricePlus + defaultPrice;
        } else {
            ProductCustomField.style.display = "block"


        }
    }




    return (
        <Container fluid={true}>
            <Container className="header"></Container>
            <Container className="main">
                <Row>
                    <Col className="section1" sm={12}>
                        {/* <Slider /> */}
                    </Col>
                    <Col className="section2 text-center" sm={12}>Text</Col>
                    <Col className="section3" sm={12}>
                        <Row>
                            {
                                data.map(function (item) {
                                    return (
                                        <Col sm={12} md={3} className="mt-5">
                                            <Card>
                                                <ProductModal title={item.title}> <CardImg key={item.article} top width="100%" height="300px" src={item.img[0].src} alt="Card image cap" /></ProductModal>
                                                <CardBody>
                                                    <CardTitle>{item.title}</CardTitle>
                                                    <CardSubtitle>{item.subtitle}</CardSubtitle>

                                                    <CardText>
                                                        <div>
                                                            <span></span>
                                                            <span> <input id={item.id} value={item.price} disabled /></span>
                                                        </div>
                                                        <div>
                                                            <span></span>
                                                            <span>{item.material}</span>
                                                        </div>

                                                        <div>
                                                            <span></span>
                                                            <span>{item.text}</span>
                                                        </div>
                                                    </CardText>

                                                    <FormGroup>
                                                        <Label for="size">Размер</Label>
                                                        <Input type="select" name="select" id="size" onChange={e => changePrice(item.id, e.target.value, item.price,item.startWidth,item.startHeight)}>
                                                            {item.sizes.map(function (data, i) {
                                                                return (
                                                                    <option value={data.price} defaultChecked={(i <= 1) ? true : false}>{data.size}</option>
                                                                )
                                                            })}
                                                            <option value="0">Свой размер</option>
                                                        </Input>
                                                    </FormGroup>

                                                    <Container id={item.id + "_customPrice"} style={{ display: 'none' }}>
                                                        <Row classID="p-0 m-0">
                                                            <Col sm={12} md={6}>
                                                                <Label for="long">Ширина</Label>
                                                                <NumericInput
                                                                id={item.id + "_customWidth"}
                                                                style={ false }
                                                                name="long"
                                                                defaultValue={item.startWidth}
                                                                min={item.startWidth}
                                                                max={item.maxWidth}
                                                                onChange = {value => CustomSizeWidth(item.id,item.startWidth,item.startHeight,item.price,value)}
                                                                />
                                                            </Col>

                                                            <Col sm={12} md={6}>
                                                                <Label for="width">Длинна</Label>
                                                                <NumericInput 
                                                                    id={item.id + "_customHeight"}
                                                                    style={ false }
                                                                    name="width"
                                                                    defaultValue={item.startHeight}
                                                                    min={item.starHeight}
                                                                    max={item.maxHeight}
                                                                    onChange = {value => CustomSizeHeight(item.id,item.startWidth,item.startHeight,item.price,value)}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </Container>

                                                    <Button onClick={e => addToCart(item)}>В корзину</Button>

                                                </CardBody>
                                            </Card>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Col>
                    <Col className="section4" sm={12}></Col>
                </Row>
            </Container >
            <Row className="footer"></Row>

            {
                (totalPrice) ?
                    <Row className="cart">
                        <div>Цена заказа: {totalPrice}</div>
                        <Button onClick={clearCart}>Очистить</Button>
                    </Row> :
                    null
            }

        </Container >

    )
}
export default HomePage