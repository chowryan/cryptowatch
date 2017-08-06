import React, { Component } from 'react';
import ReactFileReader from 'react-file-reader';
import DataRow from './DataRow';
import StatsTable from './StatsTable';

import CSV from '../utils/csv';
import { calcSummaryStats } from '../utils/dataAnalysis';

import './css/SummaryStats.css';

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
      });
    };
  }

  render() {
    return (
      <div>
        <div className="ui action input">
          <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
            <div>
              <input type="text" placeholder="Upload CSV File" disabled />
              <input type="file" />
            </div>  
          </ReactFileReader>
          <div className="ui icon button">
            <i className="attach icon"></i>
          </div>
        </div>
        <StatsTable summaryStats={this.state.summaryStats} dataLabel={this.state.fileName} />
      </div>
    );
  }
}

export default SummaryStats;
