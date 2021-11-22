import * as api from '../../helpers/api_helper'

const getPoolDict = () => {
  return api.get('/info/pooldict')
}

const getNexusDict = () => {
  return api.get('/info/nexusdict')
}

export default {
  getPoolDict: getPoolDict,
  getNexusDict: getNexusDict
}
