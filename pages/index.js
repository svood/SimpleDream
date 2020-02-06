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

    ProductPriceField.value = WidthPrice + HeightPrice + defaultPrice + " грн";
}

const CustomSizeHeight = (id,startWidth,startHeight,defaultPrice,newHeight) => {
   
    let ProductPriceField = document.getElementById(id);
    let ProductCustomField = document.getElementById(id + "_customWidth").value;


    let HeightPrice =  ((defaultPrice / startHeight) * Number(newHeight)) - defaultPrice;
    let WidthPrice =  ((defaultPrice / startWidth) * Number(ProductCustomField)) - defaultPrice;
   

    console.log("Итого:"+HeightPrice + WidthPrice + defaultPrice)

    ProductPriceField.value = HeightPrice + WidthPrice + defaultPrice + " грн";

}


    

    const changePrice = (itemId, addedPrice, defaultPrice) => {

        let ProductPriceField = document.getElementById(itemId);
        let ProductCustomField = document.getElementById(itemId + "_customPrice");
        let pricePlus = Number(addedPrice);

        if (addedPrice > 0) {
            ProductCustomField.style.display = "none"
            ProductPriceField.value = pricePlus + defaultPrice + " грн";
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
                                                    <CardTitle className="mt-2 mb-2">{item.title} </CardTitle>

                                                    <CardSubtitle  className=" mb-2 text-center">Материал: {item.material}</CardSubtitle>

                                                    <CardText className="cardText mb-3">
                                                        <div className="mb-3">
                                                           <input className="price" id={item.id} value={item.price + " грн"} disabled />
                                                        </div>
                                                        <p> {item.text} </p>

                                            <Row className="mt-3">
                                                <Col sm={12} md={6}>
                                                <FormGroup>
                                                     
                                                        <Input type="select" name="select" id="size" onChange={e => changePrice(item.id, e.target.value, item.price,item.startWidth,item.startHeight)}>
                                                            {item.sizes.map(function (data, i) {
                                                                return (
                                                                    <option value={data.price} defaultChecked={(i <= 1) ? true : false}>{data.size}</option>
                                                                )
                                                            })}
                                                            <option value="0">Свой размер</option>
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                                <Col sm={12} md={6}> 
                                                <Button onClick={e => addToCart(item)} className="addToCart" outline color="success">В корзину</Button>
                                                </Col>
                                            </Row>

                                                    <div id={item.id + "_customPrice"} style={{display:'none'}}>
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
                                                                onChange = {value => CustomSizeWidth(item.id,item.startWidth,item.startHeight,item.price,value)}
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
                                                                    onChange = {value => CustomSizeHeight(item.id,item.startWidth,item.startHeight,item.price,value)}
                                                                />
                                                                </form>
                                                            </Col>
                                                        </Row>
                                                    </div>

                                                    </CardText>

                                                    
                                                    

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