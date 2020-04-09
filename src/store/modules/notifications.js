import {
NOTIFICATIONS_REQUEST,
NOTIFICATIONS_FILTER,
NOTIFICATIONS_SUCCESS,
NOTIFICATIONS_ERROR,
NOTIFICATIONS_FILTER_CHANGE,
NOTIFICATIONS_READ
} from "../actions/notifications";

import { AUTH_LOGOUT } from "../actions/auth";

import NotificationsService from "../../api/notifications.service";
import NotificationsModel from "../models/notifications";

const state = NotificationsModel();

const getters = {
  isNotifications: state => state.status,
  getNewNotifications: state => state.total_new,
  getTotalNotifications: state => state.total,
  getNotifications: state => state.notifications
};

const actions = {
  [NOTIFICATIONS_REQUEST]: async ( { commit, dispatch } ) => {
    commit(NOTIFICATIONS_REQUEST);
    const r = await NotificationsService.getNotifications(state.filter);

    r.data.status
      ? commit(NOTIFICATIONS_SUCCESS, r.data)
      : dispatch(NOTIFICATIONS_ERROR);
  },

  [NOTIFICATIONS_FILTER_CHANGE]: ({ commit, dispatch }, { options }) => {
    commit(NOTIFICATIONS_REQUEST);
    return new Promise(resolve => {
      commit(NOTIFICATIONS_FILTER_CHANGE, options);
      dispatch(NOTIFICATIONS_REQUEST).then(() => resolve());
    });
  },
  [NOTIFICATIONS_READ]: ({dispatch} ) => {
    dispatch(NOTIFICATIONS_REQUEST);

  },
  [NOTIFICATIONS_ERROR]: ({ commit} ) => {
    commit(NOTIFICATIONS_ERROR);
  }

};

const mutations = {
  [NOTIFICATIONS_REQUEST]: state => {
    state.status = false;
  },
  [NOTIFICATIONS_SUCCESS]: (state, notifications) => {
    state.status = true;
    state.total = notifications.total;
    state.total_new = notifications.total_new;
    state.total_read = notifications.total_read;
    if ( !parseInt(state.offset) ) {
      state.notifications = notifications.notifications;
    } else {
      state.notifications = [...state.notifications, notifications.notifications];
    }

  },
  [NOTIFICATIONS_FILTER_CHANGE]: (state, options) => {
    state.status = false;
    for (let option in options) {
      state.filter[option] = options[option] != "" ? options[option] : state.filter[option];
    }
  },
  [NOTIFICATIONS_ERROR]: state => {
    state.status = false;
  },
  [AUTH_LOGOUT]: state => {
    Object.assign(state, NotificationsModel())
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
