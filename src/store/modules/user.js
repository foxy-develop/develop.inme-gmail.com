import {
  USER_REQUEST,
  USER_ERROR,
  USER_SUCCESS,
  USER_SWITCH_THEME
} from "../actions/user";

import UserService from "../../api/user.service";
import { AUTH_LOGOUT } from "../actions/auth";
import { ThemeService } from "../../services/storage.service";
import router from "../../router";

const state = {
  status: "",
  profile: {
    name: "",
    phone: "",
    theme: ThemeService.get() || "dark"
  }
};

const getters = {
  getProfile: state => state.profile,
  isProfileLoaded: state => state.status === "success"
};

const actions = {
  [USER_REQUEST]: async ({ commit, dispatch }) => {
    commit(USER_REQUEST);
    const r = await UserService.profile();
    if ( r && r.status ) {
      commit(USER_SUCCESS, r.profile);
    } else {
      commit(USER_ERROR);
      dispatch(AUTH_LOGOUT);
      router.push("/login").then(r => r);
    }
    return;
  },
  [USER_SWITCH_THEME]: async ({ commit }) => {
    const r = await UserService.theme();
    r && commit(USER_SWITCH_THEME, r.theme);
    return;
  }
};

const mutations = {
  [USER_SWITCH_THEME]: ( state, theme ) => {
    state.profile.theme = theme;
  },
  [USER_REQUEST]: state => {
    state.status = "loading";
  },
  [USER_SUCCESS]: (state, profile) => {
    state.status = "success";
    state.profile = profile;
  },
  [USER_ERROR]: state => {
    state.status = "error";
  },
  [AUTH_LOGOUT]: state => {
    state.status = "";
    state.profile.name = "";
    state.profile.phone = "";
    state.profile.theme = 'dark';
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
