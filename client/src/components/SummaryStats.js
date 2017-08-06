import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactFileReader from 'react-file-reader';
import DataRow from './DataRow';
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
            <StatsTable summaryStats={this.state.summaryStats} dataLabel={this.state.fileName} />
          </Segment>
        </Container>
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
    updateStrategyData,
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(SummaryStats);
