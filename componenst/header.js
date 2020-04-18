import React, { useState } from 'react';
import { Menu, Layout, Badge, } from 'antd';


const NavBar = ({ length }) => {
  const [isOpen, setIsOpen] = useState(false);

  const redirectTo = (path) => {
    window.location.href = path
  }

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="logo" >SimpleDreams</div>
      <Menu theme="light" mode="horizontal">
        <Menu.Item key="1" onClick={e => redirectTo("/")}>
          Главная
      </Menu.Item>
        <Menu.Item key="2" onClick={e => redirectTo("/shipment")}>
          Доставка и Оплата
      </Menu.Item>
        <Menu.Item key="3" onClick={e => redirectTo("/card")}>
          Корзина
        </Menu.Item>
      </Menu >
    </>
  );
}


export default NavBar
