import {
  MENTIONS_REQUEST,
  MENTIONS_ERROR,
  MENTIONS_SUCCESS,
  MENTIONS_FILTER_REQUEST,
  MENTIONS_FILTER_SUCCESS,
  MENTIONS_CHANGE_FILTER,
  MENTIONS_CHANGE_TYPE
} from "../actions/mentions";

import { AUTH_LOGOUT } from "../actions/auth";
import MentionsServive from "../../api/mentions.service";
import MentionsModel from "../models/mentions";

const state = MentionsModel();

const getters = {
  isMentionsLoaded: state => state.status && state.filter && state.mentions,
  getMentions: state => state.mentions,
  getMentionsTotal: state => state.total,
  getFilter: state => state.filter,
  getTypes: state => state.type,
  isDataLoaded: state => state.status,
  getFilterState: state => type =>
    state.filter[type].filter(el => el.id === state.filtered[type]),
  isFilter: state => state.filter_status
};

const actions = {
  [MENTIONS_REQUEST]: async ({ commit, dispatch }) => {
    commit(MENTIONS_REQUEST);
    const r = await MentionsServive.getMentions({
      per_page: state.filtered.limit_options || "",
      region_id: state.filtered.countries || "",
      keyword_id: state.filtered.keywords || ""
    });

    r.data.status
      ? commit(MENTIONS_SUCCESS, r.data )
      : dispatch(MENTIONS_ERROR);
  },
  [MENTIONS_FILTER_REQUEST]: async ({ commit, dispatch }) => {
    const r = await MentionsServive.getMentionsFilter();

    r.data.status
      ? commit(MENTIONS_FILTER_SUCCESS, r.data )
      : dispatch(MENTIONS_ERROR);
  },

  [MENTIONS_CHANGE_FILTER]: ({ commit, dispatch }, { options }) => {
    return new Promise(resolve => {
      commit(MENTIONS_CHANGE_FILTER, options);
      dispatch(MENTIONS_REQUEST).then(() => resolve());
    });
  },

  [MENTIONS_CHANGE_TYPE]: ({ commit }, { options }) => {
    commit(MENTIONS_CHANGE_TYPE, options);
  }

};

const mutations = {
  [MENTIONS_REQUEST]: state => {
    state.status = false;
  },
  [MENTIONS_SUCCESS]: (state, mentions) => {
    state.total.negative = mentions.negative_mentions_total;
    state.total.positive = mentions.positive_mentions_total;
    state.mentions = mentions.mentions;
    state.status = true;
    state.filter_status = true;
  },
  [MENTIONS_CHANGE_TYPE]: (state, options) => {
    state.type[options.type] = options.val ? "" : options.type;
  },
  [MENTIONS_CHANGE_FILTER]: (state, options) => {
    state.filter_status = false;
    for (let option in options) {
      state.filtered[option] =
        options[option] != "" ? options[option] : state.filtered[option];
    }
  },
  [MENTIONS_FILTER_SUCCESS]: (state, filter) => {
    state.filter = filter;
  },
  [MENTIONS_ERROR]: state => {
    state.status = false;
  },
  [AUTH_LOGOUT]: state => {
    Object.assign(state, MentionsModel());
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
