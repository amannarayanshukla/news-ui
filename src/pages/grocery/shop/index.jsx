import React from 'react';
import { connect } from 'umi';

const Shops = (props) => {
  const { news } = props.location.state;

  return (
    <div style={{ width: '600px', margin: 'auto', marginTop: '30px' }}>
      <img
        src={
          news.urlToImage === 'null' || news.urlToImage === null
            ? 'https://dummyimage.com/600x300/000/fff'
            : news.urlToImage
        }
        alt="news pic"
        style={{ width: '600px', height: 'auto' }}
      />
      <div style={{ padding: '50px', margin: 'auto', border: '1px solid gray' }}>
        <h3>{news.title}</h3>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <h6>{news.source.name}</h6>
          <h6>{news.author}</h6>
        </div>
        <h5 style={{ marginTop: '20px' }}>Description : {news.description}</h5>
        <p style={{ marginTop: '25px' }}>
          {news.content}
          <a href={news.url} style={{ color: 'gray', textDecoration: 'underline' }}>
            {' '}
            click know more
          </a>
        </p>
        <h6>
          <scan>{news.publishedAt}</scan>
        </h6>
      </div>
    </div>
  );
};

export default connect(() => ({}))(Shops);
