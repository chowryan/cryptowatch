import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Table, Image, Button, Loader, Dimmer } from 'semantic-ui-react';
import './css/News.css'
import { getRedditPosts } from '../utils/reddit';
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
      loading: true,
    };
    this.updateReddit = this.updateReddit.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleClick(e, obj) {
    this.updateReddit(obj.children.toLowerCase());
  }

  render() {
    const { news } = this.props;
    const divStyle = {
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
                    <Table.HeaderCell textAlign="center" colSpan="2">Twitter</Table.HeaderCell>
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
