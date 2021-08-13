import * as api from '../../helpers/api_helper'

const getHistoricalLongAprs = (ticker, _from, _to) => {
  return api.get(`/historical/longaprs/${ticker}`)
}

export default {
  getHistoricalLongAprs: getHistoricalLongAprs
}
