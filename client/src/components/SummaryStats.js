import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactFileReader from 'react-file-reader';
import StatsTable from './StatsTable';

import CSV from '../utils/csv';
import { calcSummaryStats } from '../utils/dataAnalysis';
import { Icon, Container, Input, Divider, Segment, Button } from 'semantic-ui-react';
import './css/SummaryStats.css';

import {
  updateStrategyData,
} from '../actions';

class SummaryStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      strategyData: [],
      summaryStats: {},
      fileName: '',
      benchmarkStats: {
        timePeriod: '',
        annualizedReturn: '',
        annualizedVolatility: '',
        countMonthlyReturns: '',
        maxDrawdown: '',
        maxDrawdownDate: '',
        percentMonthlyPositive: '',
        sharpe: '',
        monthlyAverage: '',
        worstMonth: '',
        ytdReturn: '',
      },
    };

    this.handleFiles = this.handleFiles.bind(this);
    this.handleUpdateBenchmark = this.handleUpdateBenchmark.bind(this);
  }

  componentDidMount() {
  }

  handleFiles(files) {
    const reader = new FileReader();
    reader.readAsText(files[0]);
    reader.onload = (e) => {
      const fileName = files[0].name;
      CSV.parseCSV(reader.result).then((strategyData) => {
        const summaryStats = calcSummaryStats(strategyData, '1/1/00', '9/1/17');
        this.setState({ strategyData, summaryStats, fileName });
        console.log(summaryStats);
        const { updateStrategyData } = this.props;
        updateStrategyData(strategyData);
      });
    };
  }

  handleUpdateBenchmark() {
    const { chartData, start, end, dateRange, productId } = this.props;
    const benchmarkData = chartData.map(dataPoint => ({
      date: dataPoint.date,
      price: dataPoint.close,
    }));
    const benchmarkStats = calcSummaryStats(benchmarkData);
    this.setState({ benchmarkStats });
  }

  render() {
    const { chartData, start, end, dateRange, productId } = this.props;
    return (
      <div>
        <Container>
          <Segment>
            <div className="ui action input">
              <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                <Input type="text" placeholder="Upload CSV File" disabled />
                <Input type="file" />
              </ReactFileReader>
              <Button icon>
                <Icon name="attach"/>
              </Button>
            </div>
            <Divider hidden />
            <StatsTable
              summaryStats={this.state.summaryStats}
              dataLabel={this.state.fileName}
              productId={productId}
              benchmarkStats={this.state.benchmarkStats}
            />
          </Segment>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chartData: state.strategyChart.chartData,
  start: state.strategyChart.start,
  end: state.strategyChart.end,
  granularity: state.strategyChart.granularity,
  dateRange: state.strategyChart.dateRange,
  productId: state.strategyChart.productId,
});

export default connect(mapStateToProps)(SummaryStats);