import React, { Component } from 'react';
import { connect } from 'umi';
import TopNews from '../../../components/TopNews/index';

import styles from './style.less';

@connect((state) => ({
  news: state.news,
}))
class Shops extends Component {
  render() {
    let news;
    // the state passed in the reduxRouter is accessible and used
    if (this.props && this.props.location && this.props.location.state) {
      news = this.props.location.state.news;
    }

    return (
      <div>
        <TopNews news={this.props.news} />
        {news ? (
          <div className={styles.container}>
            <img
              src={
                news.urlToImage === 'null' || news.urlToImage === null
                  ? 'https://dummyimage.com/600x300/000/fff'
                  : news.urlToImage
              }
              alt="news pic"
              className={styles.image}
            />
            <div className={styles.subContainer}>
              <h3>{news.title}</h3>
              <div className={styles.metaData}>
                <h6>{news.source.name}</h6>
                <h6>{news.author}</h6>
              </div>
              <h5 className={styles.description}>Description : {news.description}</h5>
              <p className={styles.content}>
                {news.content}
                <a href={news.url} className={styles.link}>
                  {' '}
                  click know more
                </a>
              </p>
              <h6>
                <scan>{news.publishedAt}</scan>
              </h6>
            </div>
          </div>
        ) : (
          <div className={styles.errorMessage}>Please go back and try again.</div>
        )}
      </div>
    );
  }
}

export default connect(() => ({}))(Shops);
