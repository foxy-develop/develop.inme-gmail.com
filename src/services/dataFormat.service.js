const formatDataService = {
  chart: response => {
    return {
      labels: response.data.statistics.dates,
      positive: {
        data: response.data.statistics.positive.values,
        total: {
          domains: response.data.statistics.positive.total_domains,
          links: response.data.statistics.positive.total_links
        }
      },
      negative: {
        data: response.data.statistics.negative.values,
        total: {
          domains: response.data.statistics.negative.total_domains,
          links: response.data.statistics.negative.total_links
        }
      }
    }
  },
  mapChart: response => {
    const formatData = response.data.stats.map(el => {
      return {
        id: el.country_short_title_ru !== 'HK' ? el.country_short_title_ru : 'CN',
        name: el.country_short_title_ru !== 'HK' ? el.country_title_ru : 'Китай',
        value: el.total,
        value_negative: el.total_negative,
        region_id: el.id_country
      }
    })
    return formatData
  }
}

export { formatDataService }
