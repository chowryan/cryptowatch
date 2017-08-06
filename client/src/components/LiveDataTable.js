import RTM from 'satori-rtm-sdk';
import React, { Component } from 'react';
import { Table, Grid, Container } from 'semantic-ui-react';
import { satori } from '../../../config/apiKeys';
import CF from 'currency-formatter';

class LiveDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BTC_Bitstamp: '-',
      BTC_GDAX: '-',
      BTC_Kraken: 'n/a',
      BTC_cexio: '-',
      BTC_POLONIEX: '-',
      BTC_GEMINI: '-',
      ETH_Bitstamp: 'n/a',
      ETH_GDAX: '-',
      ETH_Kraken: '-',
      ETH_cexio: '-',
      ETH_POLONIEX: '-',
      ETH_GEMINI: '-',
      LTC_Bitstamp: '-',
      LTC_GDAX: '-',
      LTC_Kraken: '-',
      LTC_cexio: 'n/a',
      LTC_POLONIEX: '-',
      LTC_GEMINI: 'n/a',
      XRP_Bitstamp: '-',
      XRP_GDAX: 'n/a',
      XRP_Kraken: '-',
      XRP_cexio: 'n/a',
      XRP_POLONIEX: '-',
      XRP_GEMINI: 'n/a',
    };
  }

  componentDidMount() {
    const channel = 'cryptocurrency-market-data';
    const client = new RTM('wss://open-data.api.satori.com', satori);
    client.on('enter-connected');

    const subscription = client.subscribe(channel, RTM.SubscriptionMode.SIMPLE);
    subscription.on('rtm/subscription/data', (pdu) => {
      pdu.body.messages.forEach((msg) => {
        if (msg.basecurrency.startsWith('USD')) {
          let keyStr = null;
          if (msg.exchange === 'CEX.IO') {
            keyStr = `${msg.cryptocurrency}_cexio`;
          } else { keyStr = `${msg.cryptocurrency}_${msg.exchange}`; }
          const newState = {};
          const val = CF.format(msg.price, { code: 'USD' });
          if (val < this.state[keyStr]) {
            newState[`${keyStr}_p`] = false;
            newState[`${keyStr}_n`] = true;
          } else {
            newState[`${keyStr}_p`] = true;
            newState[`${keyStr}_n`] = false;
          }
          newState[keyStr] = val;
          this.setState(newState);
        }
      });
    });

    client.start();
  }


  render() {
    return (
      <div>
<<<<<<< HEAD
        <Table celled selectable color="violet">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine>Exchanges</Table.HeaderCell>
              <Table.HeaderCell>Bitcoin</Table.HeaderCell>
              <Table.HeaderCell>Ethereum</Table.HeaderCell>
              <Table.HeaderCell>Litecoin</Table.HeaderCell>
              <Table.HeaderCell>Ripple</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>Bitstamp</Table.Cell>
              <Table.Cell positive={this.state.BTC_Bitstamp_p} negative={this.state.BTC_Bitstamp_n}>{this.state.BTC_Bitstamp}</Table.Cell>
              <Table.Cell disabled>{this.state.ETH_Bitstamp}</Table.Cell>
              <Table.Cell positive={this.state.LTC_Bitstamp_p} negative={this.state.LTC_Bitstamp_n}>{this.state.LTC_Bitstamp}</Table.Cell>
              <Table.Cell positive={this.state.XRP_Bitstamp_p} negative={this.state.XRP_Bitstamp_n}>{this.state.XRP_Bitstamp}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>GDAX</Table.Cell>
              <Table.Cell positive={this.state.BTC_GDAX_p} negative={this.state.BTC_GDAX_n}>{this.state.BTC_GDAX}</Table.Cell>
              <Table.Cell positive={this.state.ETH_GDAX_p} negative={this.state.ETH_GDAX_n}>{this.state.ETH_GDAX}</Table.Cell>
              <Table.Cell positive={this.state.LTC_GDAX_p} negative={this.state.LTC_GDAX_n}>{this.state.LTC_GDAX}</Table.Cell>
              <Table.Cell disabled>{this.state.XRP_GDAX}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Kraken</Table.Cell>
              <Table.Cell disabled>{this.state.BTC_Kraken}</Table.Cell>
              <Table.Cell positive={this.state.ETH_Kraken_p} negative={this.state.ETH_Kraken_n}>{this.state.ETH_Kraken}</Table.Cell>
              <Table.Cell positive={this.state.LTC_Kraken_p} negative={this.state.LTC_Kraken_n}>{this.state.LTC_Kraken}</Table.Cell>
              <Table.Cell positive={this.state.XRP_Kraken_p} negative={this.state.XRP_Kraken_n}>{this.state.XRP_Kraken}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>CEX.IO</Table.Cell>
              <Table.Cell positive={this.state.BTC_cexio_p} negative={this.state.BTC_cexio_n}>{this.state.BTC_cexio}</Table.Cell>
              <Table.Cell positive={this.state.ETH_cexio_p} negative={this.state.ETH_cexio_n}>{this.state.ETH_cexio}</Table.Cell>
              <Table.Cell disabled>{this.state.LTC_cexio}</Table.Cell>
              <Table.Cell disabled>{this.state.XRP_cexio}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>POLONIEX</Table.Cell>
              <Table.Cell positive={this.state.BTC_POLONIEX_p} negative={this.state.BTC_POLONIEX_n}>{this.state.BTC_POLONIEX}</Table.Cell>
              <Table.Cell positive={this.state.ETH_POLONIEX_p} negative={this.state.ETH_POLONIEX_n}>{this.state.ETH_POLONIEX}</Table.Cell>
              <Table.Cell positive={this.state.LTC_POLONIEX_p} negative={this.state.LTC_POLONIEX_n}>{this.state.LTC_POLONIEX}</Table.Cell>
              <Table.Cell positive={this.state.XRP_POLONIEX_p} negative={this.state.XRP_POLONIEX_n}>{this.state.XRP_POLONIEX}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>GEMINI</Table.Cell>
              <Table.Cell positive={this.state.BTC_GEMINI_p} negative={this.state.BTC_GEMINI_n}>{this.state.BTC_GEMINI}</Table.Cell>
              <Table.Cell positive={this.state.ETH_GEMINI_p} negative={this.state.ETH_GEMINI_n}>{this.state.ETH_GEMINI}</Table.Cell>
              <Table.Cell disabled>{this.state.LTC_GEMINI}</Table.Cell>
              <Table.Cell disabled>{this.state.XRP_GEMINI}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
=======
        <Container>
          <Table celled selectable color='purple'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell singleLine>Exchanges</Table.HeaderCell>
                <Table.HeaderCell>Bitcoin</Table.HeaderCell>
                <Table.HeaderCell>Ethereum</Table.HeaderCell>
                <Table.HeaderCell>Litecoin</Table.HeaderCell>
                <Table.HeaderCell>Ripple</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Bitstamp</Table.Cell>
                <Table.Cell positive={this.state.BTC_Bitstamp_p} negative={this.state.BTC_Bitstamp_n}>{this.state.BTC_Bitstamp}</Table.Cell>
                <Table.Cell disabled>{this.state.ETH_Bitstamp}</Table.Cell>
                <Table.Cell positive={this.state.LTC_Bitstamp_p} negative={this.state.LTC_Bitstamp_n}>{this.state.LTC_Bitstamp}</Table.Cell>
                <Table.Cell positive={this.state.XRP_Bitstamp_p} negative={this.state.XRP_Bitstamp_n}>{this.state.XRP_Bitstamp}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>GDAX</Table.Cell>
                <Table.Cell positive={this.state.BTC_GDAX_p} negative={this.state.BTC_GDAX_n}>{this.state.BTC_GDAX}</Table.Cell>
                <Table.Cell positive={this.state.ETH_GDAX_p} negative={this.state.ETH_GDAX_n}>{this.state.ETH_GDAX}</Table.Cell>
                <Table.Cell positive={this.state.LTC_GDAX_p} negative={this.state.LTC_GDAX_n}>{this.state.LTC_GDAX}</Table.Cell>
                <Table.Cell disabled>{this.state.XRP_GDAX}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Kraken</Table.Cell>
                <Table.Cell disabled>{this.state.BTC_Kraken}</Table.Cell>
                <Table.Cell positive={this.state.ETH_Kraken_p} negative={this.state.ETH_Kraken_n}>{this.state.ETH_Kraken}</Table.Cell>
                <Table.Cell positive={this.state.LTC_Kraken_p} negative={this.state.LTC_Kraken_n}>{this.state.LTC_Kraken}</Table.Cell>
                <Table.Cell positive={this.state.XRP_Kraken_p} negative={this.state.XRP_Kraken_n}>{this.state.XRP_Kraken}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>CEX.IO</Table.Cell>
                <Table.Cell positive={this.state.BTC_cexio_p} negative={this.state.BTC_cexio_n}>{this.state.BTC_cexio}</Table.Cell>
                <Table.Cell positive={this.state.ETH_cexio_p} negative={this.state.ETH_cexio_n}>{this.state.ETH_cexio}</Table.Cell>
                <Table.Cell disabled>{this.state.LTC_cexio}</Table.Cell>
                <Table.Cell disabled>{this.state.XRP_cexio}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>POLONIEX</Table.Cell>
                <Table.Cell positive={this.state.BTC_POLONIEX_p} negative={this.state.BTC_POLONIEX_n}>{this.state.BTC_POLONIEX}</Table.Cell>
                <Table.Cell positive={this.state.ETH_POLONIEX_p} negative={this.state.ETH_POLONIEX_n}>{this.state.ETH_POLONIEX}</Table.Cell>
                <Table.Cell positive={this.state.LTC_POLONIEX_p} negative={this.state.LTC_POLONIEX_n}>{this.state.LTC_POLONIEX}</Table.Cell>
                <Table.Cell positive={this.state.XRP_POLONIEX_p} negative={this.state.XRP_POLONIEX_n}>{this.state.XRP_POLONIEX}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>GEMINI</Table.Cell>
                <Table.Cell positive={this.state.BTC_GEMINI_p} negative={this.state.BTC_GEMINI_n}>{this.state.BTC_GEMINI}</Table.Cell>
                <Table.Cell positive={this.state.ETH_GEMINI_p} negative={this.state.ETH_GEMINI_n}>{this.state.ETH_GEMINI}</Table.Cell>
                <Table.Cell disabled>{this.state.LTC_GEMINI}</Table.Cell>
                <Table.Cell disabled>{this.state.XRP_GEMINI}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table> 
        </Container>
>>>>>>> add container
      </div>
    );
  }
}

export default LiveDataTable;
