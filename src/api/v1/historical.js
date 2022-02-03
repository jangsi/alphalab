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

const getHistoricalAstroCommAprs = (filters) => {
  return api.get(`/historical/astrocomaprs/${filters.ticker}`, { params: filters })
}

const getHistoricalAstroAllinAprs = (filters) => {
  return api.get(`/historical/astroallinaprs/${filters.ticker}`, { params: filters })
}

const getHistoricalAPRCompare = (filters) => {
  return api.get(`/historical/aprcompare/${filters.ticker}`, { params: filters })
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

const getLiquidationProfile = (filters) => {
  return api.get('/historical/kujira/profile')
}

const getHistoricalLiquidationProfile = (filters) => {
  return api.get(`/historical/kujira/profiles/`, {params:  filters})
}


const getSpreadHistStats = (filters) => {
  return api.get('/historical/spreadhiststats')
}

export default {
  getHistoricalLongAprs: getHistoricalLongAprs,
  getHistoricalShortAprs: getHistoricalShortAprs,
  getHistoricalTerraDash: getHistoricalTerraDash,
  getHistoricalCommAprs: getHistoricalCommAprs,
  getHistoricalAstroCommAprs:getHistoricalAstroCommAprs,
  getHistoricalAstroAllinAprs:getHistoricalAstroAllinAprs,
  getHistoricalTlvs: getHistoricalTlvs,
  getHistoricalAnchor: getHistoricalAnchor,
  getHistoricalNexus: getHistoricalNexus,
  getSpreadHistStats: getSpreadHistStats,
  getHistoricalAPRCompare:getHistoricalAPRCompare,
  getLiquidationProfile:getLiquidationProfile,
  getHistoricalLiquidationProfile,getHistoricalLiquidationProfile
}
