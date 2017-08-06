import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Table, Image, Button, Loader, Dimmer } from 'semantic-ui-react';
import axios from 'axios';
import { getRedditPosts } from '../utils/reddit';
// import Tweet from 'react-tweet';
import './css/News.css';
import {
  updateNews, updateTweets,
} from '../actions';

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
  }

  updateReddit(sortParam) {
    this.setState({ loading: true });
    const { updateNews } = this.props;
    const subreddit = 'cryptocurrency';
    const sortBy = sortParam;
    const count = 0;
    const limit = 100;
    return getRedditPosts(subreddit, sortBy, count, limit)
    .then((res) => {
      updateNews(res.data.slice(1));
      this.setState({ loading: false });
      this.searchTwitter();
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
        // console.log(response.data);
        console.log('successfully received all tweets');
      })
      .catch((err) => {
        console.error('failed to get tweets!', err);
      });
    }

  render() {
    const { news, tweets } = this.props;
    const divStyle= {
      overflow: 'auto',
      height: '100vh',
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
                      <span style={{ marginRight: 20 }}>Reddit</span>
                      <Button onClick={this.handleClick} color="green">Top</Button>
                      <Button onClick={this.handleClick} color="red">Hot</Button>
                      <Button onClick={this.handleClick} color="violet">New</Button>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                {this.state.loading ?
                  <Table.Row style={{ height: '300vh' }}>
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
                      <span style={{ marginRight: 20 }}>Twitter</span>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <div style={divStyle}>
                    {tweets.map((item, i) => (
                      <Table.Row key={i}>
                        <Table.Cell>
                          <Table.Row>{item.user.name}</Table.Row>
                          <Table.Row><a>{item.text}</a></Table.Row>
                          {/*<Tweet
                            data={{
                                id: item.id,
                                user: {
                                  name: item.user.name,
                                  screen_name: item.user.screen_name,
                                  profile_image_url: item.user.profile_image_url,
                                },
                                text: item.text,
                                created_at: item.created_at,
                                favorite_count: item.favorite_count,
                                retweet_count: item.retweet_count,
                                entities: {
                                  media: item.entities.media,
                                  urls: item.entities.urls,
                                  user_mentions: item.entities.user_mentions,
                                  hashtags: item.entities.hashtags,
                                  symbols: item.entities.symbols
                                }}
                            }
                          />*/}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </div>
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
