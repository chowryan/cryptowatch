import React, { Component } from 'react';
import {
  Button,
  Icon,
  Container,
  Menu,
} from 'semantic-ui-react'

const FixedMenu = () => (
  <Menu inverted fixed='top' size='large'>
    <Container>
      <Menu.Item header><Icon circular inverted name="eye"/></Menu.Item>
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
)

export default FixedMenu;