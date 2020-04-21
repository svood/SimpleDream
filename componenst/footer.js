import React from 'react';
import { Nav, NavItem, NavLink, Container, Row, Col } from 'reactstrap';

const Footer = () => {

    const redirectTo = (path) => {
        window.location.href = path
    }

    return (
        <Container fluid={true}>
            <Container className='main pt-3 pb-3'>
                <Row>
                    <Col sm={24} md={9}>
                        <Nav>
                            <NavItem>
                                <NavLink onClick={e => redirectTo("/")}>Главная</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={e => redirectTo("/shipment")}>Доставка и Оплата</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={e => redirectTo("/return")}>Обмен и возврат</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={e => redirectTo("/offerta")}>Договор оферты</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={e => redirectTo("/about")}>О Нас</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={e => redirectTo("/card")}>Корзина</NavLink>
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col sm={24} md={3}>
                        <img src="/images/vizamaster.svg" className="viza" className="footerLogo" />
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default Footer;