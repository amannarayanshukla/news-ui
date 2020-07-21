import { getTopNews, getAllSources, getEverythingFromSource } from '@/services/news';

export default {
  namespace: 'news',
  state: {},
  effects: {
    *fetchTopNews({ pageSize, pageNumber, apiKey }, { call, put }) {
      const topNews = yield call(getTopNews, { pageSize, pageNumber, apiKey });
      yield put({
        type: 'setTopNews',
        payload: topNews.articles,
      });
    },

    *fetchAllSources({ apiKey }, { call, put }) {
      const allSources = yield call(getAllSources, { apiKey });
      yield put({
        type: 'setAllSources',
        payload: allSources.sources,
      });
    },

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
    setTopNews(state, { payload }) {
      return {
        ...state,
        topNews: payload,
      };
    },
    setAllSources(state, { payload }) {
      return {
        ...state,
        allSources: payload,
      };
    },
    setEverythingFromSources(state, { payload }) {
      console.log('--8--');
      return {
        ...state,
        everything: payload,
      };
    },
  },
};
