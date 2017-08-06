import React, { Component } from 'react';
import { Grid, Segment, Card } from 'semantic-ui-react';
import LiveDataTable from './LiveDataTable';
import HomePageTweets from './HomePageTweets';

const divStyle= {
  height: '80vh'
};
// const styles = {
//   gridRow: 
//   container: {
//     display: 'flex',
//     flexDirection: 'row',
//   },
//   left: {
//     width: '80%',
//     height: '100%',
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   right: {
//     width: '20%',
//     height: '100%',
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   leftHigh: {
//     display: 'flex',
//     flexDirection: 'row',
//   },
//   leftLow: {
//     display: 'flex',
//     flexDirection: 'row',
//   },
//   card: {
//     width: '50%',
//     height: 300,
//     margin: 5,
//   },
//   column: {
//     width: '100%',
//     height: 300,
//     margin: 5,
//   },
// };

class HomePage extends Component {
  render() {
    return (
      <div>
        <Grid stackable padded style={divStyle}>
          <Grid.Row stretched>
            <Grid.Column width={6}>
              <Segment><LiveDataTable /></Segment>
            </Grid.Column>
            <Grid.Column width={6}>
              <Segment>hello</Segment>
            </Grid.Column>
            <Grid.Column width={4}>
              <Segment>*Reddit*</Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row stretched>
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

      </div>
    );
  }
}

export default HomePage;
