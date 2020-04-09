
/* eslint-disable promise/param-names */
import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_LOGIN,
  AUTH_SUCCESS,
  AUTH_LOGOUT
} from "../actions/auth";

import AuthService from "../../api/auth.service";
import { TokenService } from "../../services/storage.service";
import router from "../../router";
import { USER_REQUEST } from "../actions/user";
const defaultState = () => {
  return {
      status: false,
      errorMessage: null,
      phone: null,
      token: TokenService.get() || ''
  }
}
const state = defaultState();

const getters = {
  isPhoneApproved: state => state.phone,
  getErrorMessage: state => state.errorMessage,
  isAuthenticated: state => !!state.token
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
      router.push("/").then(() => dispatch(USER_REQUEST));
    } else {
      commit(AUTH_ERROR, r.message);
    }
    return r.status;
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    AuthService.logout();
    commit(AUTH_LOGOUT);
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
  [AUTH_SUCCESS]: (state, token) => {
    state.token = token;
    state.status = true;
    state.phone = true;
    state.errorMessage = "";
  },
  [AUTH_ERROR]: (state, msg) => {
    state.token = TokenService.get() || ''
    state.errorMessage = msg;
    state.status = "false";
  },
  [AUTH_LOGOUT]: state => {
    Object.assign(state, defaultState());
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
