import React, { Component } from 'react';
import { connect } from 'react-redux';
<<<<<<< HEAD
import { bindActionCreators } from 'redux';
=======

>>>>>>> update summaryStats for benchmark
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
    };

    this.handleFiles = this.handleFiles.bind(this);
  }

  componentDidMount() {
  }

  handleFiles(files) {
    const reader = new FileReader();
    reader.readAsText(files[0]);
    reader.onload = (e) => {
      console.log(files[0].name);
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

  render() {
    const { chartData, start, end, dateRange, productId } = this.props;
    const benchmarkStats = calcSummaryStats(chartData, start, end);
    console.log(benchmarkStats);
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
            />
          </Segment>
        </Container>
      </div>
    );
  }
}

// export default SummaryStats;

const mapStateToProps = state => ({
  chartData: state.strategyChart.chartData,
  start: state.strategyChart.start,
  end: state.strategyChart.end,
  granularity: state.strategyChart.granularity,
  dateRange: state.strategyChart.dateRange,
  productId: state.strategyChart.productId,
});

export default connect(mapStateToProps)(SummaryStats);