import React, { Component } from 'react';
import { connect } from 'umi';
import { routerRedux } from 'dva/router';
import { Layout, Menu, Card, Icon } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

import styles from './style.less';
import TopNews from '../../../components/TopNews/index';

const { Content, Footer, Sider } = Layout;
const { Meta } = Card;

@connect((state) => ({
  news: state.news,
}))
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: 'abc-news',
      everything: [],
      pageSize: 10,
      pageNumber: 1,
      totalShown: 0,
      apiKey: 'd6bf9a9eb5714d16a3e1c31d8cf6df6d',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { sources, pageSize, pageNumber, apiKey } = this.state;

    // once all the dispatch is called and state is updated
    // error is already handled at the service
    Promise.all([
      dispatch({
        type: 'news/fetchAllSources',
        apiKey,
      }),
      dispatch({
        type: 'news/fetchTopNews',
        pageSize,
        pageNumber,
        apiKey,
      }),
      dispatch({
        type: 'news/fetchEverythingFromSources',
        pageSize,
        pageNumber,
        sources,
        apiKey,
      }),
    ]).then(() => {
      const { news } = this.props;
      this.setState((prevState) => {
        return {
          ...prevState,
          pageNumber: prevState.pageNumber + 1,
          totalShown: prevState.totalShown + prevState.pageSize,
          everything: news.everything,
        };
      });
    });
  }

  // whenever we reach the bottom of the screen new data is loaded and thus enabling infinite loading
  // this will only load first 100 since that is only free.
  loadFunc = () => {
    const { dispatch, news } = this.props;
    const { sources, pageSize, pageNumber, apiKey } = this.state;
    dispatch({
      type: 'news/fetchEverythingFromSources',
      pageSize,
      pageNumber,
      sources,
      apiKey,
    })
      .then(() => {
        // concatenating the values of everything
        this.setState((prevState) => {
          return {
            ...prevState,
            pageNumber: prevState.pageNumber + 1,
            everything: prevState.everything.concat(news.everything),
            totalShown: prevState.totalShown + prevState.pageSize,
          };
        });
      })
      .catch((err) => {
        console.log(err, 'ERROR');
        this.setState({ hasMore: false });
      });
  };

  // News is updated from the source selected
  menuItemClick = (e) => {
    console.log('menu clicked');
    this.setState({ everything: [] });
    const { dispatch } = this.props;
    let { sources, pageNumber } = this.state;
    const { pageSize, apiKey } = this.state;
    sources = e.key;
    pageNumber = 1;

    // once the dispatch is resolved the state is updated with the new props value
    dispatch({
      type: 'news/fetchEverythingFromSources',
      pageSize,
      pageNumber,
      sources,
      apiKey,
    })
      .then(() => {
        const { news } = this.props;
        this.setState((prevState) => {
          return {
            ...prevState,
            sources: e.key,
            pageNumber: 2,
            everything: news.everything,
            totalShown: 0 + prevState.pageSize,
          };
        });
      })
      .catch((err) => {
        console.log(err, 'ERROR');
        this.setState({ hasMore: false });
      });
  };

  render() {
    const { news } = this.props;
    return (
      <Layout>
        <Sider className={styles.sider}>
          <div className="logo" />
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={['abc-news']}
            onClick={this.menuItemClick}
          >
            {news && news.allSources
              ? news.allSources.map((source) => {
                  return <Menu.Item key={source.id}>{source.name}</Menu.Item>;
                })
              : ''}
          </Menu>
        </Sider>
        <Layout className={`site-layout ${styles.layout}`}>
          <Content className={styles.content}>
            <div className={`site-layout-background ${styles.subContent}`}>
              <TopNews news={news} />
              <div className={styles.infiniteContainer}>
                <InfiniteScroll
                  pageStart={0}
                  loadMore={this.loadFunc}
                  hasMore={this.state && this.state.totalShown < 100}
                  loader={
                    <div key={0} className={styles.infiniteDiv}>
                      <Icon type="loading" />
                      &nbsp;Loading
                    </div>
                  }
                  initialLoad={false}
                  useWindow={false}
                >
                  {this.state && this.state.everything && this.state.everything.length > 0
                    ? this.state.everything.map((every) => {
                        return (
                          <Card
                            className={styles.infiniteCard}
                            cover={
                              <img
                                src={
                                  every &&
                                  (every.urlToImage === 'null' || every.urlToImage === null)
                                    ? 'https://dummyimage.com/300x200/000/fff'
                                    : every.urlToImage
                                }
                                alt="news pic"
                                className={styles.infiniteCardImage}
                              />
                            }
                            onClick={() => {
                              const { dispatch } = this.props;
                              dispatch(
                                routerRedux.push(`/news/one/${every.title}`, { news: every }),
                                // routerRedux.push(`/news/one/${every.title}`),
                              );
                            }}
                            key={every.title}
                          >
                            <Meta title={every.title} description={every.description} />
                          </Card>
                        );
                      })
                    : ''}
                  {this.state && this.state.totalShown && this.state.totalShown > 100 ? (
                    <div className={styles.finish}>Finished loading all News</div>
                  ) : (
                    ''
                  )}
                </InfiniteScroll>
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default connect(() => ({}))(Search);
