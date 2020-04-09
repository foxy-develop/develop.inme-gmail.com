import {
  CURRENT_REQUEST,
  CURRENT_ERROR,
  CURRENT_SUCCESS
} from "../actions/current_mentions";
import DataService from "../../api/data.service";
import { AUTH_LOGOUT } from "../actions/auth";

const state = {
  current_mentions: [],
  status: false
};

const getters = {
  isCurrentLoaded: state => state.status,
  getCurrentData: state => state.current_mentions
};

const actions = {
  [CURRENT_REQUEST]: async ({ commit }, { type, period }) => {
    commit(CURRENT_REQUEST);
    const r = await DataService.getCurrentData(type, period);
    r.data.status ? commit(CURRENT_SUCCESS, r.data) : commit(CURRENT_ERROR);
  }
};

const mutations = {
  [CURRENT_REQUEST]: state => {
    state.status = false;
  },
  [CURRENT_SUCCESS]: (state, data) => {
    state.current_mentions = data.mentions;
    state.status = true;
  },
  [CURRENT_ERROR]: state => {
    state.status = false;
  },
  [AUTH_LOGOUT]: state => {
    state.current_mentions = null;
    state.status = false;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
