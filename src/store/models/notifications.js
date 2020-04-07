const NotificationsModel = {
 status: false,
  total: 0,
  total_new: 0,
  total_read: 0,
  filter: {
    date_from: '',
    date_to: '',
    offset: 0,
    limit: '',
    type: ''
  },
  notifications: [
    {
      notification_id: '',
      notification_data: '',
      title: '',
      text: '',
      notification_is_read: 0,
      notification_read_date: ''
    }
  ],
  notifications_header: [
    {
      notification_id: '',
      notification_data: '',
      title: '',
      text: '',
      notification_is_read: 0,
      notification_read_date: ''
    }
  ]
}

export default NotificationsModel;
