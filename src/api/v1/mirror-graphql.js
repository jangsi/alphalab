import * as api from '../../helpers/api_helper'

const BASE_GRAPHQL_URL = 'https://graph.mirror.finance/graphql'

const getSpreadData = (filters) => {
  let body = {
    query: `query($from: Float!, $to: Float!, $interval: Float!, $token:String!) {
      asset(token:$token) {
        symbol
        name
        token
        prices {
          price
          oraclePrice
          oracleHistory(from: $from, to: $to, interval: $interval) {
            price
            timestamp
          }
          history(from: $from, to: $to, interval: $interval) {
            price
            timestamp
          }
        }
      }
    }`,
    variables: {
      from: filters.from,
      to: filters.to,
      interval: filters.interval,
      token: filters.token
    }
  }
  return api.post(
    BASE_GRAPHQL_URL,
    body,
    { headers: { 'Content-Type': 'application/json' } }
  ).then(data => data.data)
}

export default {
  getSpreadData: getSpreadData
}
