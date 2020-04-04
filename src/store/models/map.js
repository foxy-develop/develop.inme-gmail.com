const mapDataModel = {
  period: "week",
  periods: [
    { id: "day", name: "День" },
    { id: "week", name: "Неделя" },
    { id: "month", name: "Месяц" }
  ],
  loaded: false,
  data: {
    day: {
      data: [
        {
          id: null,
          name: null,
          region_id: null,
          value: 0,
          value_negative: 0
        }
      ],
    },
    week: {
      data: [
        {
          id: null,
          name: null,
          region_id: null,
          value: 0,
          value_negative: 0
        }
      ],
    },
    month: {
      data: [
        {
          id: null,
          name: null,
          region_id: null,
          value: 0,
          value_negative: 0
        }
      ],
    }
  },
  datasets: 0
}

export default mapDataModel
