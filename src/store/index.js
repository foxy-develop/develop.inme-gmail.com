import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./modules/auth";
import user from "./modules/user";
import charts from "./modules/charts";
import mentions from "./modules/mentions";
import notifications from "./modules/notifications";
import current_notification from "./modules/current_notification";
import map from "./modules/charts-map";
import AxiosPlugin from "vue-axios-cors";
import current_mentions from "./modules/current_mentions"

Vue.use(Vuex);
Vue.use(AxiosPlugin);

export default new Vuex.Store({
  modules: {
    auth, user, charts, map, mentions, notifications, current_notification,current_mentions
  },
  strict: true
});
