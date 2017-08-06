import React, { Component } from 'react';
import StrategyChart from './StrategyChart';
import StrategyCSVChart from './StrategyCSVChart';
import SummaryStats from './SummaryStats';

const style = {
  table: {
    width: '100%',
    display: 'table',
    tableLayout: 'fixed',
  },
  col: {
    textAlign: 'right',
  },
};
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <table style={style.table}>
          <tbody>
            <tr>
              <td>
                <StrategyChart />
              </td>
              <td>
                <StrategyCSVChart />
              </td>
            </tr>
          </tbody>
        </table>
        <SummaryStats />
      </div>
    );
  }
}

export default App;
