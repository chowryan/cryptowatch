import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getRedditPosts } from '../utils/reddit';
import { Grid, Table, Image } from 'semantic-ui-react';
import { Table, Image, Dropdown, Button } from 'semantic-ui-react';

import './css/News.css'
import {
  updateNews,
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
      sortBy: 'hot',
      subreddit: 'cryptocurrency',
    };
  }

  componentDidMount() {
    const { updateNews } = this.props;
    const count = 0;
    const limit = 100;
    return getRedditPosts(this.state.subreddit, this.state.sortBy, count, limit)
    .then((res) => {
      updateNews(res.data.slice(1));
    })
    .catch((err) => {
      console.log(err);
    });
  }


  render() {
    const { news } = this.props;
    const divStyle= {
      overflow: 'auto',
      height: '100vh'
    };
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <Table padded>
                <Table.Header size="large">
                  <Table.Row>
                    <Table.HeaderCell textAlign='center' colSpan='2'>Reddit</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                <div style={divStyle}>
                    {news.map((item, i) => (
                      <Table.Row key={i}>
                        <Table.Cell><Image src={item.image} size="mini" shape='rounded'/></Table.Cell>
                        <Table.Cell><a href={item.url}>{item.title}</a></Table.Cell>
                      </Table.Row>
                    ))}
                </div>
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column width={8}>
              <Table padded>
                <Table.Header size="large">
                  <Table.Row>
                    <Table.HeaderCell textAlign='center' colSpan='2'>Twitter</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {/*something here for twitter  */}
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
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateNews,
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(News);
