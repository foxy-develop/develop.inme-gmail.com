const chartsDataModel = () => {
  return {
    period: "week",
    periods: [
      {id: "day", name: "День"},
      {id: "week", name: "Неделя"},
      {id: "month", name: "Месяц"}
    ],
    loaded: false,
    data: {
      day: {
        labels: [],
        negative: {
          data: [],
          total: {
            domains: 0,
            links: 0
          }
        },
        positive: {
          data: [],
          total: {
            domains: 0,
            links: 0
          }
        }
      },
      week: {
        labels: [],
        negative: {
          data: [],
          total: {
            domains: 0,
            links: 0
          }
        },
        positive: {
          data: [],
          total: {
            domains: 0,
            links: 0
          }
        }
      },
      month: {
        labels: [],
        negative: {
          data: [],
          total: {
            domains: 0,
            links: 0
          }
        },
        positive: {
          data: [],
          total: {
            domains: 0,
            links: 0
          }
        }
      }
    },
    filter: {
      positive: true,
      negative: true
    }
  }
}

export default chartsDataModel
