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
    const { strategyData } = this.props;
    if (strategyData.length === 0) {
      return <div>Loading...</div>;
    }
    let filteredData = [];
    for (let i = 0; i < 100; i += 1) {
      filteredData.push({
        date: new Date(strategyData[i].date),
        close: parseInt(strategyData[i].price, 10),
        high: 0,
        low: 0,
        open: 0,
        volume: 0,
        dividend: '',
        split: '',
      })
    }
    console.log('&&&&&&&&&&&&', filteredData);
    // const filteredData = strategyData.map((dataPoint, i) => {
    //   if (i < 100) {
    //       dataPoint.date = new Date(dataPoint.date);
    //       dataPoint.close = dataPoint.price;
    //       dataPoint.high = 0;
    //       dataPoint.low = 0;
    //       dataPoint.open = 0;
    //       dataPoint.volume = 0;
    //       dataPoint.dividend = '';
    //       dataPoint.split = '';
    //     };
    // });
    return (
      <div>
        {/* <AreaChartWithEdge data={strategyData} />  */}
         <CandleStickChartWithMACDIndicator data={filteredData} /> 
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    strategyData: state.strategyChart.strategyData,
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch);
};


export default connect(mapStateToProps, matchDispatchToProps)(StrategyCSVChart);
