import * as api from '../../helpers/api_helper'

const getAnchorDict = () => {
  return api.get('/info/anchordict')
}

export default {
  getAnchorDict: getAnchorDict
}