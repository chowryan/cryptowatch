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
<<<<<<< HEAD
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
              <Segment>*Watson*</Segment>
            </Grid.Column>
            <Grid.Column width={4}>
              <Segment>*Twitter*</Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
=======
      <div style={styles.container}>
        <div style={styles.left}>
          <div style={styles.leftHigh}>
            <Card fluid style={styles.card}> Something else</Card>
            <Card fluid style={styles.card}> Graph </Card>
          </div>
          <div style={styles.leftLow}>
            <div style={styles.card}><LiveDataTable /></div>
            <Card fluid style={styles.column}><WatsonSummary /></Card>
          </div>
        </div>
        <div style={styles.right}>
          <Card fluid style={styles.column}> <HomePageTweets /> </Card>
          <Card fluid style={styles.column}></Card>
        </div>
>>>>>>> add sample data
      </div>
    );
  }
}

export default HomePage;
