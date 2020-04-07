import ApiService from "../services/api.service";
import { API_NOTIFICATIONS } from "./api.endpoints";

class NotificationsError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}
const NotificationsServive = {
  getNotifications: async ({ date_from = '', date_to = '', limit =  '', offset = 0, type = '' }) => {
    try {
      const response = await ApiService.post(API_NOTIFICATIONS.LIST,  {
        date_from: date_from, date_to: date_to, limit: limit, offset: offset, type: type });
      if (response && response.status && response.status == 200) {
        return { status: response.data.status, data: response.data };
      }
    } catch (error) {
      throw new NotificationsError(error.response.status, error.response.data.detail);
    }
  },
  getCurrentNotification: async ({notification_id}) => {
    try {
      const response = await ApiService.get(API_NOTIFICATIONS.GET_CURRENT + notification_id);
      if (response && response.status && response.status == 200) {
        return { status: response.data.status, data: response.data };
      }
    } catch (error) {
      throw new NotificationsError(error.response.status, error.response.data.detail);
    }
  },
  readNotification: async ({ notification_id }) => {
    try {
      const response = await ApiService.post(API_NOTIFICATIONS.READ, { notification_id: notification_id });
      if (response && response.status && response.status == 200) {
        return { status: response.data.status, data: response.data };
      }
    } catch (error) {
      throw new NotificationsError(error.response.status, error.response.data.detail);
    }
  },
};


export default NotificationsServive;
export { NotificationsServive, NotificationsError };
