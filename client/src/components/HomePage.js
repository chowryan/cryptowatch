import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import LiveDataTable from './LiveDataTable';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  left: {
    width: '80%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  right: {
    width: '20%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  leftHigh: {
    display: 'flex',
    flexDirection: 'row',
  },
  leftLow: {
    display: 'flex',
    flexDirection: 'row',
  },
  card: {
    width: '50%',
    height: 300,
    margin: 5,
  },
  column: {
    width: '100%',
    height: 300,
    margin: 5,
  },
};

class HomePage extends Component {
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.left}>
          <div style={styles.leftHigh}>
            <Card fluid style={styles.card}>Something else </Card>
            <Card fluid style={styles.card}> Graph </Card>
          </div>
          <div style={styles.leftLow}>
            <div style={styles.card}><LiveDataTable /></div>
            <Card fluid style={styles.card}>Something else </Card>
          </div>
        </div>
        <div style={styles.right}>
          <Card fluid style={styles.column}> Twitter </Card>
          <Card fluid style={styles.column}> Watson </Card>
        </div>
      </div>
    );
  }
}

export default HomePage;
