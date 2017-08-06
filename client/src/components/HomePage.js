import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import LiveDataTable from './LiveDataTable';
import HomePageTweets from './HomePageTweets';
import HomePageStrategyChart from './HomePageStrategyChart';
import WatsonSummary from './WatsonSummary';
import Calculator from './Calculator';

const divStyle = {
  height: '45vh',
};

class HomePage extends Component {
  render() {
    return (
      <div>
        <Grid stackable padded>
          <Grid.Row stretched style={divStyle}>
            <Grid.Column width={6}>
              <Segment><HomePageStrategyChart /></Segment>
            </Grid.Column>
            <Grid.Column width={6}>
              <Segment><WatsonSummary /></Segment>
            </Grid.Column>
            <Grid.Column width={4} height={3}>
              <Segment><HomePageTweets /></Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row stretched style={divStyle}>
            <Grid.Column width={12} >
              <LiveDataTable />
            </Grid.Column>
            <Grid.Column width={4}>
              <Segment> <Calculator /></Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default HomePage;
