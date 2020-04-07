// auth data
const API_AUTH = {
  GET_PASS: "auth", // type: "POST" params: "phone"
  LOGIN: "auth/login", // type: "POST" params: "password, phone"
  LOGOUT: "auth/logout" // type: "GET"
};

// charts data
const API_DATA = {
  CHARTS_BY_PERIOD: "mentions/stats_by_", // type: "POST" params: "day, week, month"
  CHARTS_ALL: "mentions/stats", // type: "GET"
  MENTIONS_LIST: "mentions/list", // type: "POST" params: "per_page, region_id, keyword_id"
  MAP_DATA: "mentions/stats_by_country", // type: "POST" params: "period"
  MENTIONS_FILTER: "mentions/control", // type: "GET"
  NEGATIVE_MENTIONS: "mentions/negative_mentions_by_country", // type: "POST" params: "region_id"
  CURRENT_MENTIONS: "mentions/list_by_period" // type: "POST" params: "type, period"
};

const API_NOTIFICATIONS = {
  LIST: "notifications/list",
  // type: "POST" params: "limit (default: 100), offset (default: 0), date_from, date_to (YYYY-MM-DD), type: report, message"
  GET_CURRENT: "notifications/get?notification_id=", //type "GET", params: "notification_id"
  READ: "notifications/mark_as_read", //type "POST", params: "notification_id"
}

// user data
const API_USER = {
  PROFILE: "user/profile", // type: "GET"
  SWITCH_THEME: "user/settheme" // type: "POST" params: "dark, light"
};

export { API_AUTH, API_DATA, API_USER, API_NOTIFICATIONS };
