import { getTopNews, getAllSources, getEverythingFromSource } from '@/services/news';

export default {
  namespace: 'news',
  state: {},
  effects: {
    // fetch all the top new and call reducer
    *fetchTopNews({ pageSize, pageNumber, apiKey }, { call, put }) {
      const topNews = yield call(getTopNews, { pageSize, pageNumber, apiKey });
      yield put({
        type: 'setTopNews',
        payload: topNews.articles,
      });
    },

    // fetch all the reducer and call reducer
    *fetchAllSources({ apiKey }, { call, put }) {
      const allSources = yield call(getAllSources, { apiKey });
      yield put({
        type: 'setAllSources',
        payload: allSources.sources,
      });
    },

    // fetch every news for the source and call reducer
    *fetchEverythingFromSources({ pageSize, pageNumber, sources, apiKey }, { call, put }) {
      const everythingFromSources = yield call(getEverythingFromSource, {
        pageSize,
        pageNumber,
        sources,
        apiKey,
      });
      yield put({
        type: 'setEverythingFromSources',
        payload: everythingFromSources.articles,
      });
    },
  },

  reducers: {
    // setting topNews property to the news model object
    setTopNews(state, { payload }) {
      return {
        ...state,
        topNews: payload,
      };
    },
    // setting AllSources property to the news model object
    setAllSources(state, { payload }) {
      return {
        ...state,
        allSources: payload,
      };
    },

    // setting everything property to the news model object
    setEverythingFromSources(state, { payload }) {
      return {
        ...state,
        everything: payload,
      };
    },
  },
};
