import React, { Component } from 'react';
import { connect } from 'umi';
import { routerRedux } from 'dva/router';
import { Layout, Menu, Carousel, Card, Icon } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

import './style.less';

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
      allSources: [],
      topNews: [],
      everything: [],
      pageSize: 10,
      pageNumber: 1,
      totalShown: 0,
      apiKey: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { sources, pageSize, pageNumber, apiKey } = this.state;

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
      console.log(news, 'NEWS AT END');
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

  menuItemClick = (e) => {
    console.log('menu clicked');
    this.setState({ everything: [] });
    const { dispatch } = this.props;
    let { sources, pageNumber } = this.state;
    const { pageSize, apiKey } = this.state;
    sources = e.key;
    pageNumber = 1;

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
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
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
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
              <Carousel autoplay>
                {news && news.topNews
                  ? news.topNews.map((top) => {
                      return (
                        <Card
                          style={{ width: 300 }}
                          cover={
                            <img
                              src={
                                top.urlToImage === 'null' || top.urlToImage === null
                                  ? 'https://dummyimage.com/300x200/000/fff'
                                  : top.urlToImage
                              }
                              alt="news pic"
                              style={{
                                width: '300px',
                                height: 'auto',
                                margin: 'auto',
                                marginTop: '10px',
                              }}
                            />
                          }
                          key={top.title}
                        >
                          <Meta title={top.title} description={top.description} />
                        </Card>
                      );
                    })
                  : ''}
              </Carousel>
              <div style={{ height: '400px', overflow: 'auto' }}>
                <InfiniteScroll
                  pageStart={0}
                  loadMore={this.loadFunc}
                  hasMore={this.state && this.state.totalShown < 100}
                  loader={
                    <div
                      key={0}
                      style={{
                        textAlign: 'center',
                        marginTop: 10,
                        marginBottom: 10,
                        color: '#4384f5',
                      }}
                    >
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
                            style={{
                              width: 300,
                              display: 'flex',
                              flexDirection: 'row',
                              marginBottom: '20px',
                            }}
                            cover={
                              <img
                                src={
                                  every &&
                                  (every.urlToImage === 'null' || every.urlToImage === null)
                                    ? 'https://dummyimage.com/300x200/000/fff'
                                    : every.urlToImage
                                }
                                alt="news pic"
                                style={{ width: '300px', height: 'auto', margin: 'auto' }}
                              />
                            }
                            onClick={() => {
                              const { dispatch } = this.props;
                              dispatch(
                                routerRedux.push(`/grocery/shops/${every.title}`, { news: every }),
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
                    <div
                      style={{
                        color: '#1890ff',
                        background: '#fff',
                        border: '1px solid #1890ff',
                        padding: '10px',
                      }}
                    >
                      Finished loading all News
                    </div>
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
