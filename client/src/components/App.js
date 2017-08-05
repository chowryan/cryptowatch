import React, { Component } from 'react';
import io from 'socket.io-client';

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
      console.log('client side socket connected!');
      this.socket.emit('hello', 'hi');
    })
  }

  render() {
    return (
      <h1>homepage</h1>
    );
  }
}

export default App;
