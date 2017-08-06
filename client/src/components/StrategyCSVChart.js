import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import AreaChartWithEdge from './AreaChartWithEdge';
import AreaChart from './AreaChart';
import CandleStickChartWithMACDIndicator from './CandleStickChartWithMACDIndicator';


const style = {
  table: {
    margin: '0 0 0 2vw',
    width: '70vw',
    display: 'table-cell',
  },
  col: {
    textAlign: 'right',
  }
};

class StrategyCSVChart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { strategyData, start, end } = this.props;
    const filteredData = [];
    for (let i = 0; i < strategyData.length; i += 1) {
      const dataDate = new Date(strategyData[i].date).getTime();
      if (start.getTime() < dataDate && dataDate < end.getTime()) {
        filteredData.push({
          date: new Date(strategyData[i].date),
          close: parseInt(strategyData[i].price, 10),
          high: 0,
          low: 0,
          open: 0,
          volume: 0,
          dividend: '',
          split: '',
        });
      }
    }
    console.log('&&&&&&&&&&&&', filteredData);
    if (filteredData.length === 0) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        {/* <AreaChartWithEdge data={strategyData} />  */}
        <AreaChart data={filteredData} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    start: state.strategyChart.start,
    end: state.strategyChart.end,
    granularity: state.strategyChart.granularity,
    dateRange: state.strategyChart.dateRange,
    strategyData: state.strategyChart.strategyData,
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch);
};


export default connect(mapStateToProps, matchDispatchToProps)(StrategyCSVChart);
