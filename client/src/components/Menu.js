import React, { Component } from 'react';
import { Button, Icon, Container, Menu, Tab } from 'semantic-ui-react'

import {
  openHome,
  closeHome,
  openOrder,
  closeOrder,
  openAnalytics,
  closeAnalytics,
  openNews,
  closeNews
} from '../actions/index.js'

class FixedMenu extends Component {
  constructor(props) {
    super(props);

    this.toggleHome = this.toggleHome.bind(this);
    this.toggleOrder = this.toggleOrder.bind(this);
    this.toggleAnalytics = this.toggleAnalytics.bind(this);
    this.toggleNews= this.toggleNews.bind(this);
  }

  toggleHome() {
    this.props.openHome();
    this.props.closeOrder();
    this.props.closeAnalytics();
    this.props.closeNews();
  }

  toggleOrder() {
    this.props.openOrder();
    this.props.closeHome();
    this.props.closeAnalytics();
    this.props.closeNews();
  }

  toggleAnalytics() {
    this.props.openAnalytics();
    this.props.closeHome();
    this.props.closeOrder();
    this.props.closeNews();
  }

  toggleNews() {
    this.props.openNews();
    this.props.closeHome();
    this.props.closeOrder();
    this.props.closeAnalytics();
  }

render() {
  return (
    <Menu inverted fixed='top' size='large'>
      <Container>
        <Menu.Item name="eye">crypto<Icon name="eye"/></Menu.Item>
        <Menu.Item as='a'>Home</Menu.Item>
        <Menu.Item as='a'>Order Book</Menu.Item>
        <Menu.Item as='a'>Analytics</Menu.Item>
        <Menu.Item as='a'>News</Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item className='item'>
            <Button as='a'>Log in</Button>
          </Menu.Item>
          <Menu.Item>
            <Button as='a' primary>Sign Up</Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
    );
  }
}


export default FixedMenu;