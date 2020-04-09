import {
  NOTIFICATIONS_CURRENT_REQUEST,
  NOTIFICATIONS_CURRENT_SUCCESS,
  NOTIFICATIONS_CURRENT_ERROR,
  NOTIFICATIONS_CURRENT_READ
} from "../actions/notifications";

import NotificationsService from "../../api/notifications.service";
import CurrentNotificationModel from "../models/current_notification";
import {AUTH_LOGOUT} from "../actions/auth";

const state = CurrentNotificationModel();

const getters = {
  isNotificationLoaded: state => state.status,
  hasNotificationError: state => state.hasError,
  getNotification: state => state.notification
};

const actions = {
  [NOTIFICATIONS_CURRENT_REQUEST]: async ({ commit, dispatch }, notification_id ) => {
    commit(NOTIFICATIONS_CURRENT_REQUEST);
    const r = await NotificationsService.getCurrentNotification(notification_id);
    if ( r.data.status ) {
      commit(NOTIFICATIONS_CURRENT_SUCCESS, r.data)
      dispatch(NOTIFICATIONS_CURRENT_READ, notification_id);
    } else {
      dispatch(NOTIFICATIONS_CURRENT_ERROR);
    }
  },
  [NOTIFICATIONS_CURRENT_READ]: async  ({ commit }, notification_id) => {
    const r = await NotificationsService.readNotification( notification_id );
    r.data.status && commit(NOTIFICATIONS_CURRENT_READ);
  },

  [NOTIFICATIONS_CURRENT_ERROR]: ({ commit }) => {
    commit(NOTIFICATIONS_CURRENT_ERROR);
  }
};

const mutations = {
  [NOTIFICATIONS_CURRENT_REQUEST]: state => {
    state.status = false;
  },
  [NOTIFICATIONS_CURRENT_SUCCESS]: (state, notification) => {
    state.status = true;
    state.notification = notification.notification;
  },
  [NOTIFICATIONS_CURRENT_READ]: state => {
    state.notification.notification_is_read = 1;
  },
  [NOTIFICATIONS_CURRENT_ERROR]: state => {
    state.status = false;
    state.hasError = true;
  },
  [AUTH_LOGOUT]: state => {
    Object.assign(state, CurrentNotificationModel);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
