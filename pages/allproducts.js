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
import CallMe from '../componenst/callMe';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { withRedux } from '../lib/redux'
import { addPhone, addMailNumber, addFio, addCity, addToCard } from '../actions/mainPage'
import data2 from '../data/products.json'
function HomePage() {
    const dispatch = useDispatch();
    const mainPageStore = () => {
        return useSelector(state => ({
            store: state.mainPage,
        }), shallowEqual);
    }; // Store
    const { store } = mainPageStore();

    const [cart, setCart] = useState(Array)
    const [totalPrice, setTotalPrice] = useState(0)
    const [type, SetType] = useState(2)
    const [modal, setModal] = useState(false);
    const [payType, setpayType] = useState(false);

    const toggle = () => setModal(!modal);


    const removeProduct = (element) => {
        const newData = [];
        cart.forEach(e => {
            if (e.idOnCard !== element.idOnCard) {
                newData.push(e)
            }
        });
        setCart([...newData])
    }

    const totlalPrice = () => {
        let total = 0;
        cart.map(i => {
            total = total + Number(i.price);
        })
        return total;
    }

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

        cart[cart.length] = {
            title: item.title,
            price: totalPrice + Number(parseInt(ProductPriceField.value.replace(/\D+/g, ""))),
            id: item.id,
            idOnCard: cart.length + 1,
            sizeInfo: SizeInfo,
        }
        data[it].price = Number(parseInt(ProductPriceField.value.replace(/\D+/g, "")));
        dispatch(addToCard([...cart]));
        setCart([...cart]);
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


    const saveDataHendler = (next) => {
        next();
    }

    const CardStep1 = ({ next }) => {
        return (
            <Container style={{
                background: 'rgb(247, 247, 247)',
                padding: '13px',
                borderRadius: '14px',
                border: '4px',
                borderBottomStyle: 'groove',
                borderColor: '#d3ffdd',
            }}>
                <>
                    {
                        cart.map(i => {
                            return (
                                <Col sm={12} className="mt-1">
                                    <Row>
                                        <Col sm={12} md={3}>
                                            <Button onClick={e => removeProduct(i)} outline style={{ borderRadius: '44px', fontSize: '11px', background: 'white' }}>Х</Button>
                                        </Col>
                                        <Col sm={12} md={6} style={{ border: '1px solid #c1c1c1', background: 'white' }}>{i.title}, Размер: {i.sizeInfo}</Col>
                                        <Col sm={12} md={3} style={{ borderRight: '1px solid #c1c1c1', borderTop: '1px solid #c1c1c1', background: 'white', borderBottom: '1px solid #c1c1c1' }}>Цена: {i.price} грн</Col>
                                    </Row>
                                </Col>
                            )
                        })
                    }
                </>
                <Row className="m-3" style={{ textAlign: 'right', display: 'block' }}><strong> Всего: {totlalPrice()} грн </strong></Row>
                <Button className="mt-5" color="success" onClick={next} style={{ float: 'right' }} outline>Перейти к доставке</Button>
            </Container>
        )
    }


    const CardStep2 = ({ next, previous }) => {
        return (
            <>
                <Form style={{
                    width: '80%',
                    margin: '0 auto'
                }}>
                    <Row style={{
                        background: 'rgb(247, 247, 247)',
                        padding: '13px',
                        borderRadius: '14px',
                        border: '4px',
                        borderBottomStyle: 'groove',
                        borderColor: '#d3ffdd',
                    }}>
                        <Col sm={12} md={6}>
                            <FormGroup>
                                <Label for="examplePassword">Ваше ФИО</Label>
                                <Input invalid type="text" name="" id="fio" style={{ background: 'white' }} />

                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Город</Label>
                                <Input type="text" name="city" id="city" style={{ background: 'white' }} />
                            </FormGroup>

                        </Col>
                        <Col sm={12} md={6}>
                            <FormGroup>
                                <Label for="examplePassword">Телефон получателя</Label>
                                <Input type="number" name="" id="phone" style={{ background: 'white' }} onChange={e => handelSetPhone(e)} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="examplePassword">№ отделения НовойПочты</Label>
                                <Input type="text" name="number" id="number" style={{ background: 'white' }} />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <ButtonGroup style={{ margin: '0 auto' }}>
                            <Button className="mt-3" color="success" onClick={previous} style={{ margin: '0 auto', display: 'block' }} outline>Назад</Button>
                            <Button className="mt-3" color="success" onClick={e => saveDataHendler(next)} >Перейти к выбору метода оплаты</Button>
                        </ButtonGroup>
                    </Row>

                </Form>
            </>
        )

    }

    const CardStep3 = ({ previous }) => {
        return (
            <FormGroup>
                <Label for="exampleSelect">Выберите метод оплаты</Label>
                <Input type="select" name="select" id="exampleSelect" onChange={e => setpayType(e.target.value)}>
                    <option value={1}>Наложенный платеж</option>
                    <option value={2}>Приват 24</option>

                </Input>
                <Button className="mt-3" color="success" onClick={previous} style={{ margin: '0 auto', display: 'block' }} outline>Назад</Button>

            </FormGroup>
        )
    }

    const handelSetPhone = (e) => {
        dispatch(addPhone(e.target.value))
    }


    return (
        <Container fluid={true}>
            <Container className="main">
                <Row>
                    <Col className="section3" sm={12} id="productSection">
                    
                        <Row>

                            {
                                data2.map(function (item, it) {
                                    return (

                                       <Col sm={12} md={3} className="mt-5" key={`prod_${it}`}>
                                            <Card className="productBlock">
                                                <ProductModal title={item.name}>
                                                    <CardImg key={item.id} top width="100%" height="300px" src={item.picture[0]} alt="Card image cap" />
                                                </ProductModal>
                                                <CardBody>


                                                    <CardText className="cardText ">
                                                        <p><input id={item.id} value={item.price + " грн"} disabled /></p>
                                                        <p className="mt-2 mb-2 itemIitle">{item.name} </p>



                                                        <Row className="mt-3">
                                                            {/* <Col sm={12} md={6}>
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
                                                            </Col> */}
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
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Col>


                </Row>




            </Container >
            <Row className="footer"></Row>

            {/* CARD */}
            <div>
                {
                    cart.length > 0 ?
                        <div className="shopingCard" onClick={e => setModal(true)}>
                            <span>{cart.length}</span>
                            <img src='/images/ShoppingCart.svg' />
                        </div> : null
                }


                <Modal isOpen={modal} toggle={toggle} size={'lg'}>
                    <ModalHeader toggle={toggle} style={{
                        background: '#efefef', width: '100%', padding: '12px', borderBottom: '1px solid #32da27', textAlign: 'center', display: 'block'
                    }}>Оформление заказа</ModalHeader>
                    <ModalBody>
                        <Wizard>
                            <CardStep1 />
                            <CardStep2 />
                            <CardStep3 />
                        </Wizard>
                    </ModalBody>
                    <ModalFooter> </ModalFooter>
                </Modal>
            </div>
        </Container >

    )
}
HomePage.getInitialProps = (ctx) => {
    return { cookie: ctx.query }
};

export default withRedux(HomePage)
