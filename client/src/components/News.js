import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getRedditPosts } from '../utils/reddit';
import { Table, Image } from 'semantic-ui-react';
import './css/News.css'
import {
  updateNews,
} from '../actions';


class News extends Component {
  componentDidMount() {
    const { updateNews } = this.props;
    const subreddit = 'cryptocurrency';
    const sortBy = 'hot';
    const count = 0;
    const limit = 100;
    return getRedditPosts(subreddit, sortBy, count, limit)
    .then((res) => {
      updateNews(res.data.slice(1));
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    const { news } = this.props;
    return (
      <div>
        <Table celled striped>
          <Table.Body>
            {news.map((item, i) => (
              <Table.Row key={i}>
                <Table.Cell><Image src={item.image} size="mini" shape='rounded'/></Table.Cell>
                <Table.Cell>{item.title}</Table.Cell>
                <Table.Cell><a href={item.url}>LINK</a></Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    news: state.news.news,
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateNews,
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(News);
