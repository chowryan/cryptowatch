import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Table, Image, Button, Loader, Dimmer, Header } from 'semantic-ui-react';
import axios from 'axios';
import { getRedditPosts } from '../utils/reddit';
// import Tweet from 'react-tweet';
import './css/News.css';
import {
  updateNews, updateTweets,
} from '../actions';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.updateReddit = this.updateReddit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.searchTwitter = this.searchTwitter.bind(this);
  }

  componentDidMount() {
    this.updateReddit('top');
    this.searchTwitter();
  }

  updateReddit(sortParam) {
    this.setState({ loading: true });
    const { updateNews } = this.props;
    const subreddit = 'cryptocurrency';
    const sortBy = sortParam;
    const count = 0;
    const limit = 200;
    return getRedditPosts(subreddit, sortBy, count, limit)
    .then((res) => {
      updateNews(res.data.slice(1));
      this.setState({ loading: false });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleClick(e, obj) {
    this.updateReddit(obj.children.toLowerCase());
  }

    searchTwitter() {
      const { updateTweets } = this.props;
      axios.get('/retrieveCryptoMood/twitter/bitcoin')
      .then((response) => {
        console.log('hello: ', response.data.tweets);
        updateTweets(response.data.tweets);
        // sentimentScore and tweets
        console.log('successfully received all tweets');
      })
      .catch((err) => {
        console.error('failed to get tweets!', err);
      });
    }

  render() {
    const { news, tweets } = this.props;

    const divStyle = {
      overflow: 'auto',
      height: '70vh',
    };

    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <Table padded>
                <Table.Header size="large">
                  <Table.Row>
                    <Table.HeaderCell textAlign="center" colSpan="2">
                      <Header as="h3">Reddit</Header>
                      <Button onClick={this.handleClick} color="green" size="mini">Top</Button>
                      <Button onClick={this.handleClick} color="red" size="mini">Hot</Button>
                      <Button onClick={this.handleClick} color="blue" size="mini">New</Button>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                {this.state.loading ?
                  <Table.Row>
                    <Dimmer active inverted>
                      <Loader inverted>loading</Loader>
                    </Dimmer>
                  </Table.Row> :
                  <div style={divStyle}>
                    {news.map((item, i) => (
                      <Table.Row key={i}>
                        <Table.Cell>
                          <Image src={item.image} size="mini" shape="rounded" />
                        </Table.Cell>
                        <Table.Cell><a href={item.url}>{item.title}</a></Table.Cell>
                      </Table.Row>
                    ))}
                  </div>}
                </Table.Body>
              </Table>
            </Grid.Column>

            <Grid.Column width={8}>
              <Table padded>
                <Table.Header size="large">
                  <Table.Row>
                    <Table.HeaderCell textAlign="center" colSpan="2">
                      <Header as="h3">Twitter</Header>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                {this.state.loading ?
                  <Table.Row>
                    <Dimmer active inverted>
                      <Loader inverted>loading</Loader>
                    </Dimmer>
                  </Table.Row> :
                  <div style={divStyle}>
                    {tweets.map((item, i) => (
                      <Table.Row key={i}>
                        <Table.Cell>
                          <Table.Row>{item.user.name}</Table.Row>
                          <Table.Row><a>{item.text}</a></Table.Row>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </div>}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    news: state.news.news,
    tweets: state.news.tweets,
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateNews,
    updateTweets,
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(News);
