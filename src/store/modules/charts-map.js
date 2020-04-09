import {
  MAP_REQUEST,
  MAP_SUCCESS,
  MAP_PRELOAD,
  MAP_SWITCH,
  MAP_ERROR
} from "../actions/charts-map";

import DataService from "../../api/data.service";
import { AUTH_LOGOUT } from "../actions/auth";
import mapDataModel from "../models/map";

const state = mapDataModel();

const getters = {
  getMapPeriod: state => state.period,
  getMapData: state => state.data[state.period],
  getCountryData: state => period => state.data(period),
  isMapLoaded: state => state.datasets === 3,
  getSelectedCountry: state => id => state.data[state.period].filter(el => Number(el.region_id) === Number(id)).map(el => {
    return {
      id: el.region_id,
      selected: true,
      title: el.name,
      title_short: el.id,
      value: el.value_negative
    }
  })[0]
};

const actions = {
  [MAP_REQUEST]: async ({ commit, dispatch }, period = state.period) => {
    commit(MAP_REQUEST);
    if (!state.data[period].length) {
      const r = await DataService.getMapData(period);
      r.status.data.status
        ? commit(MAP_SUCCESS, { data: r.data, period: period })
        : dispatch(AUTH_LOGOUT);
    }
    dispatch(MAP_PRELOAD);
  },
  [MAP_PRELOAD]: ({ commit }) => {
    state.periods.forEach(async p => {
      if (!state.data[p.id].length) {
        const r = await DataService.getMapData(p.id);
        commit(MAP_SUCCESS, { data: r.data, period: p.id });
      }
    });
  },
  [MAP_SWITCH]: ({ commit }, period) => {
    commit(MAP_SWITCH, period);
  }
};

const mutations = {
  [MAP_REQUEST]: state => {
    state.loaded = false;
  },
  [MAP_SUCCESS]: (state, response) => {
    state.data[response.period] = response.data;
    state.loaded = true;
    state.datasets += 1;
  },
  [MAP_SWITCH]: (state, period) => {
    state.period = period;
  },
  [AUTH_LOGOUT]: state => {
    Object.assign(state, mapDataModel());
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
