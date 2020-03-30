
/* eslint-disable promise/param-names */
import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_LOGIN,
  AUTH_SUCCESS,
  AUTH_LOGOUT
} from "../actions/auth";

import AuthService from "../../api/auth.service";
import router from "../../router";

const state = {
  status: false,
  errorMessage: null,
  phone: null,
  showUI: false
};

const getters = {
  isPhoneApproved: state => state.phone,
  getErrorMessage: state => state.errorMessage,
  isShowUI: state => state.showUI
};

const actions = {
  [AUTH_REQUEST]: async ({ commit }, phone) => {
    commit(AUTH_REQUEST);
    const r = await AuthService.auth(phone);
    r.status ? commit(AUTH_SUCCESS, phone) : commit(AUTH_ERROR, r.message);
  },
  [AUTH_LOGIN]: async ({ commit, dispatch }, { password, phone }) => {
    commit(AUTH_REQUEST);
    const r = await AuthService.login(password, phone);
    if (r.status) {
      commit(AUTH_SUCCESS, r.token);
      router.push("/").then(function() {
        commit(AUTH_LOGIN);
      });
    } else {
      commit(AUTH_ERROR, r.message);
    }
    return r.status;
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    AuthService.logout();
    commit(AUTH_LOGOUT);
    router.push("/login").then(r => r);
  },
  [AUTH_ERROR]: ({ commit, dispatch }, msg) => {
    commit(AUTH_ERROR, msg);
    dispatch(AUTH_LOGOUT);
  }
};

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = "loading";
  },
  [AUTH_SUCCESS]: state => {
    state.status = "true";
    state.phone = true;
    state.errorMessage = "";
  },
  [AUTH_ERROR]: (state, msg) => {
    state.errorMessage = msg;
    state.status = "false";
  },
  [AUTH_LOGIN]: (state) => {
    state.showUI = true;
  },
  [AUTH_LOGOUT]: () => {
    state.token = null;
    state.phone = false;
    state.errorMessage = null;
    state.showUI = false;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
