import axios from 'axios';
import React, { Component } from 'react';
import { Input, Label, Header } from 'semantic-ui-react';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      to: '',
      from: '',
    };
  }

  componentDidMount() {
    // axios.get('/fetchTweets')
    // .then((res) => {
    //   // console.log(res.data.statuses[0]);
    //   this.setState({ data: res.data.statuses });
    // })
    // .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <Header as="h4">Crypto Calculator</Header>
        <div>
          <Input list="currencies" placeholder="Choose currency..." >
            <Label basic>From</Label>
            <input />
          </Input>
          <datalist id="currencies">
            <option value="USD" />
            <option value="EUR" />
            <option value="CNY" />
            <option value="JPY" />
          </datalist>
        </div>
        <Input focus labelPosition="right" type="number" placeholder="Amount">
          <input />
          <Label basic></Label>
        </Input>
        <br />
        <br />
        <div>
          <Input list="coins" placeholder="Choose coin..." >
            <Label basic>To</Label>
            <input />
          </Input>
          <datalist id="coins">
            <option value="BTC" />
            <option value="LTC" />
            <option value="ETH" />
            <option value="XRP" />
          </datalist>
        </div>
        <Input labelPosition="right" type="number" placeholder="Amount">
          <input />
          <Label basic></Label>
        </Input>
      </div>
    );
  }
}

export default Calculator;
