import * as api from '../../helpers/api_helper'

const getTokenDict = () => {
  return api.get('/info/tokendict')
}

export default {
  getTokenDict: getTokenDict
}
