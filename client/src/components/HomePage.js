import React, { Component } from 'react';
import { Grid, Segment, Card } from 'semantic-ui-react';
import LiveDataTable from './LiveDataTable';
import StrategyChart from './StrategyChart';
import HomePageTweets from './HomePageTweets';
import WatsonSummary from './WatsonSummary';

const divStyle= {
  height: '40vh',
};

class HomePage extends Component {
  render() {
    return (
      <div>
        <Grid stackable padded>
          <Grid.Row stretched style={divStyle}>
            <Grid.Column width={6}>
              <Segment>*StrategyChart*</Segment>
            </Grid.Column>
            <Grid.Column width={6}>
              <Segment>hello</Segment>
            </Grid.Column>
            <Grid.Column width={4}>
              <Segment>*Reddit*</Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row stretched style={divStyle}>
            <Grid.Column width={6}>
              <Segment><LiveDataTable /></Segment>
            </Grid.Column>
            <Grid.Column width={6}>
              <Segment><WatsonSummary /></Segment>
            </Grid.Column>
            <Grid.Column width={4}>
              <Segment>*Twitter*</Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default HomePage;
