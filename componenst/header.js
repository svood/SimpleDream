import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Container
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { withRedux } from '../lib/redux'
import { Textbox, Radiobox, Checkbox, Select, Textarea } from 'react-inputs-validation';

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const mainPageStore = () => {
    return useSelector(state => ({
      store: state.mainPage,
    }), shallowEqual);
  }; // Store
  const { store } = mainPageStore();

  const redirectTo = (path) => {
    window.location.href = path
  }

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md" className="fixed-top">
        <Container>
          <NavbarBrand href="/">simple-dream</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink onClick={e => redirectTo("/")}>Главная</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={e => redirectTo("/shipment")}>Доставка и Оплата</NavLink>
              </NavItem>
          
              <NavItem>
                <NavLink onClick={e => redirectTo("/card")}>Корзина <strong style={{
                  border: '1px solid red',
                  borderRadius: '45px',
                  width: '26px',
                  textAlign: 'center',
                  fontSize: '13px',
                  color: 'red',
                  padding: '1px 6px 1px 6px'
                }}>{store.card.length}</strong></NavLink>
              </NavItem>
            </Nav>
            <NavbarText><FontAwesomeIcon icon={faPhone}/> <a href='tel:+380953140133'>+38 (095) 31 40 133 </a></NavbarText>
          </Collapse>
        </Container>
      </Navbar>
    </div >
  );
}
export default withRedux(Header)
