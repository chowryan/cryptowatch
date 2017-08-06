import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown, Container, Input, Table, Segment, Button } from 'semantic-ui-react';

import { getGDAXHistoricRates } from '../utils/gdaxHelpers';
import CandleStickChartWithMACDIndicator from './CandleStickChartWithMACDIndicator';
import AreaChartWithEdge from './AreaChartWithEdge';
import AreaChart from './AreaChart';

import {
  updateChart,
  updateStartDate,
  updateEndDate,
  updateGranularity,
  updateDateRange,
  updateProductId,
} from '../actions';

const style = {
  table: {
    margin: '0 0 0 2vw',
    width: '70vw',
    display: 'table-cell',
  },
  col: {
    textAlign: 'right',
  },
};

class StrategyChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: null,
      end: null,
    };
    this.getData = this.getData.bind(this);
    this.handleDateRangeChange = this.handleDateRangeChange.bind(this);
    this.handleProductIdChange = this.handleProductIdChange.bind(this);
    this.setStart = this.setStart.bind(this);
    this.setEnd = this.setEnd.bind(this);
  }

  setStart(event) {
    this.setState({
      start: event.target.value,
    });
  }

  setEnd(event) {
    this.setState({
      end: event.target.value,
    });
  }

  getData() {
    const { updateChart, productId } = this.props;
    let start;
    let end;
    let granularity;
    if (this.state.start && this.state.end) {
      start = new Date(this.state.start);
      end = new Date(this.state.end);
      granularity = (end - start) / (200 * 1000);
    } else {
      start = this.props.start;
      end = this.props.end;
      granularity = this.props.granularity;
    }
    return getGDAXHistoricRates(productId, start, end, granularity)
    .then((res) => {
      updateChart(res.data);
    })
    .catch((err) => {
      console.log('getData error: ', err);
    });
  }

  handleDateRangeChange(event, data) {
    const {
      updateEndDate,
      updateStartDate,
      updateGranularity,
      updateDateRange,
    } = this.props;
    const { value } = data;
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
      startDate.setMonth(1);
    } else if (value === '1 Year') {
      startDate.setYear(startDate.getFullYear() - 1);
    } else if (value === 'Max') {
      startDate.setYear(startDate.getFullYear() - 2);
    }
    updateStartDate(startDate);
    const granularity = (endDate - startDate) / (200 * 1000);
    updateGranularity(granularity);
  }

  handleProductIdChange(event, data) {
    const { updateProductId } = this.props;
    updateProductId(data.value);
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
    start.setMonth(start.getMonth() - 6);
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
    // this.getData();
  }

  render() {
    const { chartData, dateRange, productId, strategyData } = this.props;
    if (chartData.length === 0) {
      return <div>Loading...</div>;
    }
    chartData.forEach((dataPoint) => {
      dataPoint.date = new Date(dataPoint.date * 1000);
    });

    const productIdOptions = [
      { value: 'BTC-USD', text: 'Bitcoin' },
      { value: 'ETH-USD', text: 'Ethereum' },
      { value: 'LTC-USD', text: 'Litecoin' },
    ];
    const dateRangeOptions = [
      { value: '1 Day', text: '1 Day' },
      { value: '1 Week', text: '1 Week' },
      { value: '1 Month', text: '1 Month' },
      { value: '6 Months', text: '6 Months' },
      { value: 'YTD', text: 'YTD' },
      { value: '1 Year', text: '1 Year' },
      { value: 'Max', text: 'Max' },
    ];
    return (
      <div>
        <Container>
          <Table textAlign="center" stackable>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Dropdown
                    defaultValue="BTC-USD"
                    search
                    selection
                    options={productIdOptions}
                    onChange={this.handleProductIdChange}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    defaultValue="6 Months"
                    selection
                    options={dateRangeOptions}
                    onChange={this.handleDateRangeChange}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Input type="date" name="start" onChange={this.setStart}></Input>
                </Table.Cell>
                <Table.Cell>
                  <Input type="date" name="end" onChange={this.setEnd}></Input>
                </Table.Cell>
                <Table.Cell>
                  <Button primary onClick={this.getData}>SEARCH</Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Segment container padded>
            <CandleStickChartWithMACDIndicator data={chartData} />
            {/* <AreaChartWithEdge data={strategyData} />  */}
            {/* <AreaChart data={filteredStrategyData} />  */}
          </Segment>
        </Container>
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
    strategyData: state.strategyChart.strategyData,
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
