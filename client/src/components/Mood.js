import React, { Component } from 'react';
import Bar from 'react-chartjs-2';

class Mood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emotionData: {
        labels: ['Anger', 'Joy', 'Disgust', 'Sadness', 'Fear'],
        datasets: [{
          // label: props.songNameAndArtist[0] + ' - ' + props.songNameAndArtist[1],
          label: '12345',
          data: [
            1.5,
            2.0,
            3.3,
            5,
            10,
            // props.watson.anger,
            // props.watson.joy,
            // props.watson.disgust,
            // props.watson.fear,
            // props.watson.sadness
          ],
          backgroundColor: [
            'rgba(252, 61, 57, 1)',
            'rgba(254, 203, 46, 1)',
            'rgba(83, 215, 105, 1)',
            'rgba(20, 126, 251, 1)',
            'rgba(193, 53, 132, 1)',
          ],
          borderColor: [
            'rgba(252, 61, 57, 1)',
            'rgba(254, 203, 46, 1)',
            'rgba(83, 215, 105, 1)',
            'rgba(20, 126, 251, 1)',
            'rgba(193, 53, 132, 1)',
          ],
          borderWidth: 3,
        }],
      },

      emotionOptions: {
        title: {
          display: false,
          text: 'Kanye West - Famous',
          fontSize: 24,
        },
      },
      languageData: {
        labels: ['Analytical', 'Confident', 'Tentative'],
        datasets: [{
          // label: props.songNameAndArtist[0] + ' - ' + props.songNameAndArtist[1],
          label: '54321',
          data: [
            // props.watson.analytical, props.watson.confident, props.watson.tentative
            10,
            1,
            5,
            10,
            20,
            ],
          backgroundColor: [
            'rgba(252, 61, 57, 1)',
            'rgba(254, 203, 46, 1)',
            'rgba(83, 215, 105, 1)',
          ],
          borderColor: [
            'rgba(252, 61, 57, 1)',
            'rgba(254, 203, 46, 1)',
            'rgba(83, 215, 105, 1)',
          ],
          borderWidth: 3,
        }],
      },
      languageOptions: {
        title: {
          display: false,
          // text: props.songNameAndArtist[0] + ' - ' + props.songNameAndArtist[1],
          text: '5555',
          fontSize: 24,
        },
      },
      socialData: {
        labels: ["Openness", "Conscientiousness", "Extraversion", "Agreeableness", "Emotional Range"],
        datasets: [{
          label: 'hahaha',
          data: [
            3,
            2,
            1,
            10,
            5,
            // props.watson.openness,
            // props.watson.conscientiousness,
            // props.watson.extraversion,
            // props.watson.agreeableness,
            // props.watson.emotionalrange
          ],
          backgroundColor: [
            'rgba(252, 61, 57, 1)',
            'rgba(254, 203, 46, 1)',
            'rgba(83, 215, 105, 1)',
            'rgba(20, 126, 251, 1)',
            'rgba(193, 53, 132, 1)',
          ],
          borderColor: [
            'rgba(252, 61, 57, 1)',
            'rgba(254, 203, 46, 1)',
            'rgba(83, 215, 105, 1)',
            'rgba(20, 126, 251, 1)',
            'rgba(193, 53, 132, 1)',
          ],
          borderWidth: 3,
        }],
      },
      socialOptions: {
        title: {
          display: false,
          text: 'hihi',
          fontSize: 24,
        },
      },
    };
  }

  render() {
    return (
      <div className="maingraph">
        <h2>Emotion</h2>
        <Bar data={this.state.emotionData} options={this.state.emotionOptions} width={500} />
      </div>
    );
  }
}

export default Mood;
