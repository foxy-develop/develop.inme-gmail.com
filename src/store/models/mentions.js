const MentionsModel = {
  mentions: [],
  filter: {
    countries: [],
    keywords: [],
    limit_options: []
  },
  current_mentions: [],
  status: false,
  total: {
    negative: 0,
    positive: 0
  },
  filter_status: true,
  filtered: {
    countries: "",
    limit_options: 10,
    keywords: ""
  },
  type: {
    positive: "",
    negative: ""
  }
}

export default MentionsModel;
