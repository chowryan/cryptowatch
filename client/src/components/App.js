import React, { Component } from 'react';
import io from 'socket.io-client';
import MenuTab from './MenuTab';
import News from './News';
import axios from 'axios';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
} from 'semantic-ui-react'

const FixedMenu = () => (
  <Menu fixed='top' size='large'>
    <Container>
      <Menu.Item as='a' active>Home</Menu.Item>
      <Menu.Item as='a'>Work</Menu.Item>
      <Menu.Item as='a'>Company</Menu.Item>
      <Menu.Item as='a'>Careers</Menu.Item>
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

class App extends Component {
  constructor(props) {
    super(props);

    this.startSocket = this.startSocket.bind(this);
  }

  componentDidMount() {
    this.startSocket();
  }

  startSocket() {
    this.socket = io.connect();
    this.socket.on('connect', () => {
      // console.log('client side socket connected!');
      this.socket.emit('hello', 'hi');
    });
  }

  searchTwitter() {
    axios.get('/searchTwitter')
    .then((response) => {
      // sentimentScore and tweets
      // console.log(response.data);
      console.log('successfully received all tweets');
    })
    .catch((err) => {
      console.error('failed to get tweets!', err);
    });
  }

  render() {
    return (
      <div>
        <MenuTab />
      </div>
    );
  }
}

export default App;
