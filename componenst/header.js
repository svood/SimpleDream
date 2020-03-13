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


const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToId = (id) => {
    let target = document.getElementById(id);
    window.scrollTo(0, target.offsetTop)
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
                <NavLink onClick={e => scrollToId("aboutSection")}>Product</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={e => scrollToId("productSection")}>Product</NavLink>
              </NavItem>
            </Nav>
            <NavbarText>+38091111111 +38091111111 +38091111111</NavbarText>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;