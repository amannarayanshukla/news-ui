import React from 'react';
import { Card, Carousel } from 'antd';
import styles from './styles.less';

const { Meta } = Card;

const TopNews = (props) => {
  const { news } = props;
  return (
    <Carousel autoplay>
      {news && news.topNews
        ? news.topNews.map((top) => {
            return (
              <Card
                className={styles.carousalCard}
                cover={
                  <img
                    src={
                      top.urlToImage === 'null' || top.urlToImage === null
                        ? 'https://dummyimage.com/300x200/000/fff'
                        : top.urlToImage
                    }
                    alt="news pic"
                    className={styles.carousalCardImage}
                  />
                }
                key={top.title}
              >
                <Meta title={top.title} description={top.description} className={styles.metaData} />
              </Card>
            );
          })
        : ''}
    </Carousel>
  );
};

export default TopNews;
