import {
  NEGATIVE_REQUEST,
  NEGATIVE_ERROR,
  NEGATIVE_SUCCESS,
  NEGATIVE_FILTER
} from "../actions/negative";

import { AUTH_LOGOUT } from "../actions/auth";
import MentionsServive from "../../api/mentions.service";


const state = {
  negative: [],
  negative_filter: 1,
  status: false,
  count: 0
};

const getters = {
  isNegativeLoaded: state => state.status,
  getNegative: state => state.negative,
  getCount: state => state.count,
  getNegativeFilterState: state => state.negative_filter
};

const actions = {

  [NEGATIVE_REQUEST]: async ({ commit, dispatch }, period) => {
    commit(NEGATIVE_REQUEST);
    const r = await MentionsServive.getNegativeData({
      region_id: state.negative_filter || "",
      period: period || ""
    });
    r.data.status
      ? commit(NEGATIVE_SUCCESS, r.data )
      : dispatch(NEGATIVE_ERROR);
  },

  [NEGATIVE_FILTER]: ({ commit, dispatch }, { region_id, period }) => {
    console.log(region_id);
    commit(NEGATIVE_FILTER, region_id);
    dispatch(NEGATIVE_REQUEST, period);
  },

  [NEGATIVE_ERROR]: ({commit}) => {
    commit(NEGATIVE_ERROR);
    commit(AUTH_LOGOUT);
  }
};

const mutations = {
  [NEGATIVE_REQUEST]: state => {
    state.status = false;
  },

  [NEGATIVE_SUCCESS]: (state, mentions) => {
    state.negative = mentions.mentions;
    state.count = mentions.mentions_total;
    state.status = true;
  },

  [NEGATIVE_FILTER]: (state, country_id) => {
    state.status = true;
    state.negative_filter = country_id;
  },

  [NEGATIVE_ERROR]: state => {
    state.status = false;
  },

  [AUTH_LOGOUT]: state => {
    state.negative = [];
    state.negative_filter = 1;
    state.status = false;
    state.count = 0;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
