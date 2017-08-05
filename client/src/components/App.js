import React, { Component } from 'react';
import io from 'socket.io-client';

import FixedMenu from './Menu'
import News from './News';

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

  render() {
    return (
      <div>
        <FixedMenu />
        <News />
      </div>
    );
  }
}

export default App;
