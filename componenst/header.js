import React, { useState } from 'react';
import { Menu, Layout, Badge } from 'antd';


import { useSelector, shallowEqual } from 'react-redux'
import { withRedux } from '../lib/redux'

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { Header } = Layout;

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
    <Header style={{ background: '#fff' }}>
      <div className="logo" >SimpleDreams</div>
      <Menu theme="light" mode="horizontal">
        <Menu.Item key="1" onClick={e => redirectTo("/")}>
          Главная
      </Menu.Item>
        <Menu.Item key="2" onClick={e => redirectTo("/shipment")}>
          Доставка и Оплата
      </Menu.Item>
        <Menu.Item key="3" onClick={e => redirectTo("/card")}>
          Корзина  <Badge count={store.card.length} />
        </Menu.Item>

      </Menu >
    </Header>
  );
}


export default withRedux(Header)
