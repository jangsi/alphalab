import * as api from '../../helpers/api_helper'

const getHistoricalLongAprs = (filters) => {
  return api.get(`/historical/longaprs/${filters.ticker}`, { params: filters })
}

const getHistoricalShortAprs = (filters) => {
  return api.get(`/historical/shortaprs/${filters.ticker}`, { params: filters })
}
const getHistoricalTerraDash = (filters) => {
  return api.get(`/historical/terradashboard/${filters.ticker}`, { params: filters })
}

const getHistoricalCommAprs = (filters) => {
  return api.get(`/historical/comaprs/${filters.ticker}`, { params: filters })
}

const getHistoricalTlvs = (filters) => {
  return api.get(`/historical/ltvs/${filters.ticker}`, { params: filters })
}

const getHistoricalAnchor = (filters) => {
  return api.get(`/historical/anchor/${filters.ticker}`, { params: filters })
}

const getHistoricalNexus = (filters) => {
  return api.get(`/historical/nexus/${filters.ticker}`, { params: filters })
}

const getSpreadHistStats = (filters) => {
  return api.get('/historical/spreadhiststats')
}

export default {
  getHistoricalLongAprs: getHistoricalLongAprs,
  getHistoricalShortAprs: getHistoricalShortAprs,
  getHistoricalTerraDash: getHistoricalTerraDash,
  getHistoricalCommAprs: getHistoricalCommAprs,
  getHistoricalTlvs: getHistoricalTlvs,
  getHistoricalAnchor: getHistoricalAnchor,
  getHistoricalNexus: getHistoricalNexus,
  getSpreadHistStats: getSpreadHistStats
}
