import axios from 'axios';
import React, { Component } from 'react';
import { Feed, Divider } from 'semantic-ui-react';

class HomePageTweets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    axios.get('/fetchTweets')
    .then((res) => {
      // console.log(res.data.statuses[0]);
      this.setState({ data: res.data.statuses });
    })
    .catch(err => console.log(err));
  }

  render() {
    const divStyle = {
      overflow: 'auto',
      height: '100vh',
    };

    return (
      <div style={divStyle}>
        <Feed>
          {this.state.data.map((entry) => {
            return (<Feed.Event>
              <Feed.Label>
                <img src={entry.user.profile_image_url} alt="tweet" />
              </Feed.Label>
              <Feed.Content>
                <Feed.Summary>
                  <Feed.User>{entry.user.name}</Feed.User>{entry.text}
                  {/* <Divider horizontal>{entry.created_at}</Divider> */}
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>);
          })}
        </Feed>
      </div>
    );
  }
}

export default HomePageTweets;
