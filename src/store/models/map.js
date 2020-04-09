const mapDataModel = () => {
  return {
    period: "week",
    periods: [
      {id: "day", name: "День"},
      {id: "week", name: "Неделя"},
      {id: "month", name: "Месяц"}
    ],
    loaded: false,
    data: {
      day: [],
      week:[],
      month: [],
    },
    datasets: 0
  }
}

export default mapDataModel
