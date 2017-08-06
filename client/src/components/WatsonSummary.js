import React, { Component } from 'react';
import Chart from 'chart.js';
import axios from 'axios';
import './css/WatsonSummary.css';

let ctx;
let barChart;

class WatsonSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      watsonChart: 'watsonChart',
      companiesSummary: [['bitcoin', 2, 0.12], ['ethereum', 13, -0.2], ['dash', 8, 0.21], ['litecoin', 6, 0.11], ['ripple', 4, 0.20], ['IOTA', 2, 0.15], ['Zcash', 1, 0.10]],
    };

    this.generateChart = this.generateChart.bind(this);
    this.update = this.update.bind(this);
  }


  componentDidMount() {
    this.update();
    this.generateChart();
  }

  componentDidUpdate() {
    // this.update();
    this.generateChart();
  }

  update() {
    axios.get('/retrieveCryptoMoods', { list: ['Bitcoin', 'Ethereum', 'Dash', 'Litecoin', 'Ripple'] })
    .then( response => {

    })
    .catch( err => {
      console.error(err);
    }



    this.setState({
      companiesSummary: [['bitcoin', , 0.12], ['ethereum', , -0.2], ['dash', 8, 0.21], ['litecoin', 6, 0.11], ['ripple', 4, 0.20]],
    });
  }

  generateChart() {
    console.log('*** companiesSummary length: ', this.state.companiesSummary.length || 'companiesSummary is empty');

    if (this.state.companiesSummary.length !== 0) {
      const labels = this.state.companiesSummary.map(tuple => tuple[0]);
      const data = this.state.companiesSummary.map(tuple => tuple[2] * 100);

      let axisMax = Math.max(Math.max.apply(null, data), -Math.min.apply(null, data));
      axisMax = Math.min(100, Math.ceil((axisMax / 100) * 4) * 25);

      const colors = data.map((score) => {
        if (score >= 0) {
          return `rgba(31, 122, 31, ${Math.max(score / axisMax, 0.25)})`;
        }
        return `rgba(153, 0, 0, ${Math.max(-score / axisMax, 0.25)})`;
      });

      ctx = document.getElementById('watson-chart');
      ctx.height = '10vh';

      if (barChart !== undefined) barChart.destroy();

      barChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
          labels,
          datasets: [{
            label: 'Watson Score',
            data,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1,
          }],
        },
        options: {
          scales: {
            xAxes: [{
              ticks: {
                min: -axisMax, // Edit the value according to what you need
                max: axisMax,
              },
            }],
            yAxes: [{
              stacked: true,
            }],
          },
        },
      });
    }
  }

  render() {
    return (
      <div className="watson-bg">
        <canvas width="50px" onLoad={this.generateChart} height="100px" id="watson-chart" />
      </div>
    );
  }


}

export default WatsonSummary;