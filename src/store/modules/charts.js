import {
  DATA_REQUEST,
  DATA_SUCCESS,
  DATA_PRELOAD,
  DATA_SWITCH,
  DATA_FILTER,
  DATA_ERROR
} from "../actions/charts";

import DataService from "../../api/data.service";
import { AUTH_LOGOUT } from "../actions/auth";
import chartsDataModel from "../models/charts";

const state = Object.assign({}, chartsDataModel);

const getters = {
  getPeriod: state => state.period,
  getChartFilters: state => state.filter,
  getChartData: state => state.data[state.period],
  isChartDataLoaded: state => state.loaded,
  getPeriods: state => state.periods,
};

const actions = {
  [DATA_REQUEST]: async ({ commit, dispatch }) => {
    commit(DATA_REQUEST);
    if (!state.data[state.period].labels.length) {
      const r = await DataService.getChartsData(state.period);
      r.status.data.status
        ? commit(DATA_SUCCESS, { data: r.data, period: state.period })
        : dispatch(AUTH_LOGOUT);
    }
    dispatch(DATA_PRELOAD);
  },
  [DATA_PRELOAD]: ({ commit }) => {
    state.periods.forEach(async p => {
      if (!state.data[p.id].labels.length) {
        const r = await DataService.getChartsData(p.id);
        commit(DATA_SUCCESS, { data: r.data, period: p.id });
      }
    });
  },
  [DATA_SWITCH]: ({ commit }, period) => {
    commit(DATA_SWITCH, period);
  },
  [DATA_FILTER]: ({ commit }, { type }) => {
    commit(DATA_FILTER, type);
  }
};

const mutations = {
  [DATA_REQUEST]: state => {
    state.loaded = false;
  },
  [DATA_SUCCESS]: (state, response) => {
    state.data[response.period] = response.data;
    state.loaded = true;
  },
  [DATA_FILTER]: (state, type) => {
    state.filter[type] = !state.filter[type];
  },
  [DATA_SWITCH]: (state, period) => {
    state.period = period;
  },
  [AUTH_LOGOUT]: state => {
    state = Object.assign({}, chartsDataModel);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
