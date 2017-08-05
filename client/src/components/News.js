import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getRedditPosts } from '../utils/reddit';
import './css/News.css';
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
        <h1>News</h1>
        <table>
          <tbody>
            {news.map((item, i) => (
              <tr key={i}>
                <td><img alt="news-images" className="newsimages" src={item.image} /></td>
                <td>{item.title}</td>
                <td><a href={item.url}>LINK</a></td>
              </tr>
            ))}
          </tbody>
        </table>
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
