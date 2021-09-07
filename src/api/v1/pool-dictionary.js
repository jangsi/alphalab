import * as api from '../../helpers/api_helper'

const getPoolDict = () => {
  return api.get('/info/pooldict')
}

export default {
  getPoolDict: getPoolDict
}
