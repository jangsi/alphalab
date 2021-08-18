import * as api from '../../helpers/api_helper'

const getHistoricalLongAprs = (filters) => {
  return api.get(`/historical/longaprs/${filters.ticker}`, { params: filters })
}

export default {
  getHistoricalLongAprs: getHistoricalLongAprs
}
