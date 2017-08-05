import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { Dropdown, Button } from 'semantic-ui-react';
import { TypeChooser } from 'react-stockcharts/lib/helper';

import { getGDAXHistoricRates } from '../utils/gdaxHelpers';

import {
  updateChart,
  updateStartDate,
  updateEndDate,
  updateGranularity,
  updateDateRange,
  updateProductId,
} from '../actions';

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

class StrategyChart extends Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.handleDateRangeChange = this.handleDateRangeChange.bind(this);
    this.handleProductIdChange = this.handleProductIdChange.bind(this);
  }

  getData() {
    const { updateChart, productId, start, end, granularity } = this.props;
    return getGDAXHistoricRates(productId, start, end, granularity)
    .then((res) => {
      updateChart(res.data);
    })
    .catch((err) => {
      console.log('getData error: ', err);
    });
  }

  handleDateRangeChange(event, index, value) {
    const {
      updateEndDate,
      updateStartDate,
      updateGranularity,
      updateDateRange,
    } = this.props;
    updateDateRange(value);
    const endDate = new Date();
    updateEndDate(endDate);
    const startDate = new Date();
    if (value === '1 Day') {
      startDate.setDate(startDate.getDate() - 1);
    } else if (value === '1 Week') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (value === '1 Month') {
      startDate.setMonth(startDate.getMonth() - 1);
    } else if (value === '6 Month') {
      startDate.setMonth(startDate.getMonth() - 6);
    } else if (value === 'YTD') {
      startDate.setDate(startDate.getDate() - 1);
    } else if (value === '1 Year') {
      startDate.setDate(startDate.getDate() - 365);
    } else if (value === 'Max') {
      startDate.setDate(startDate.getDate() - (365 * 2));
    }
    updateStartDate(startDate);
    const granularity = (endDate - startDate) / (200 * 1000);
    updateGranularity(granularity);
  }

  handleProductIdChange(event, index, value) {
    const { updateProductId } = this.props;
    updateProductId(value);
  }

  componentDidMount() {
    const {
      updateChart,
      updateEndDate,
      updateStartDate,
      updateGranularity,
      updateDateRange,
      productId,
    } = this.props;
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 1);
    const granularity = (end - start) / (200 * 1000);
    updateEndDate(end);
    updateStartDate(start);
    updateGranularity(granularity);
    
    return getGDAXHistoricRates(productId, start, end, granularity)
    .then((res) => {
      updateChart(res.data);
    })
    .catch((err) => {
      console.log('componentDidMount error: ', err);
    });
  }

  render() {
    const { chartData, dateRange, productId } = this.props;
    chartData.forEach((dataPoint) => {
      dataPoint.date = new Date(dataPoint.date * 1000);
    });
    if (chartData.length === 0) {
      return <div>Loading...</div>;
    }
    const productIdOptions = [
      { value: 'BTC-USD', text: 'Bitcoin' },
      { value: 'ETH-USD', text: 'Ethereum' },
      { value: 'LTC-USD', text: 'Litecoin' },
    ];
    const dateRangeOptions = [
      { value: '1 Day', text: '1 Day' },
      { value: '1 Week', text: '1 Week' },
      { value: '1 Month', text: '1 Month' },
      { value: '6 Month', text: '6 Month' },
      { value: 'YTD', text: 'YTD' },
      { value: '1 Year', text: '1 Year' },
      { value: 'Max', text: 'Max' },
    ];
    return (
      <div>
        <table style={style.table}>
          <tbody>
            <tr>
              <td>
                <Dropdown placeholder='Currency' search selection options={productIdOptions} />
              </td>
              <td style={style.col}>
                <Dropdown selection options={dateRangeOptions} />
              </td>
              <td style={style.col}>
                <Button primary onClick={this.getData}>SEARCH</Button>
              </td>
            </tr>
          </tbody>
        </table>
        <CandleStickChartWithMACDIndicator data={chartData} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    chartData: state.strategyChart.chartData,
    start: state.strategyChart.start,
    end: state.strategyChart.end,
    granularity: state.strategyChart.granularity,
    dateRange: state.strategyChart.dateRange,
    productId: state.strategyChart.productId,
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateChart,
    updateStartDate,
    updateEndDate,
    updateGranularity,
    updateDateRange,
    updateProductId,
  }, dispatch);
};


export default connect(mapStateToProps, matchDispatchToProps)(StrategyChart);
