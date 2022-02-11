import React from "react"
import { Col } from "reactstrap"
import poolDictApi from '../../api/v1/pool-dictionary'
import historical from '../../api/v1/historical'

import dayjs from 'dayjs'

import LineChart from '../../components/Charts/LineChart';

function simpleMovingAverage(prices, window = 5) {
  if (!prices || prices.length < window) {
    return [];
  }

  let index = window - 1;
  const length = prices.length + 1;

  const simpleMovingAverages = [];

  while (++index < length) {
    const windowSlice = prices.slice(index - window, index);
    const sum = windowSlice.reduce((prev, curr) => prev + curr, 0);
    simpleMovingAverages.push(sum / window);
  }

  return simpleMovingAverages;
}

class AprTrackerShort extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      averageData: [],
      averageValues:[],
      averageDates:[],
      tickerOptions: [{ label: 'bLunaVaultApr', value: 'bLunaVaultApr' }],
      averageOptions: [{ label:'10 Period Moving Average', value:10},
      { label:'50 Period Moving Average', value:50},
      { label:'100 Period Moving Average', value:100}],
      tokenAddresses: {},
      rowData: [],
      rowData2: [],
      selectedShortTicker: 'bLunaVaultApr',
      selectedAverage: 10,
      defaultOption: { label: 'bLunaVaultApr', value: 'bLunaVaultApr' },
      longDates: [dayjs().subtract(6, 'month').toDate(), dayjs().toDate()],
    }
    this.fetchAprData = this.fetchAprData.bind(this)
    this.fetchAverages = this.fetchAverages.bind(this)
    this.fetchTickers = this.fetchTickers.bind(this)

    this.handleChange = this.handleChange.bind(this)
    this.handleAverageChange = this.handleAverageChange.bind(this)
    this.handleStartDateChange = this.handleStartDateChange.bind(this)
    this.handleEndDateChange = this.handleEndDateChange.bind(this)
  }

  fetchTickers() {
    poolDictApi.getNexusDict().then(apiData => {
      let tokenObj = apiData[0] ? apiData[0].token : {}
      this.setState({
        tickerOptions: Object.keys(tokenObj).map(ticker => {
          return { value: ticker, label: ticker }
        }),
        tokenAddresses: tokenObj,
      }, () => this.fetchAprData())
    })
  }

  fetchAprData() {
    if (this.state.selectedShortTicker.length === 0) {
      return
    }
    let precision = 'day'
    let diff = Math.abs(dayjs(this.state.longDates[0]).diff(dayjs(this.state.longDates[1])))
    // 604800000 = 7 days
    if (diff < 604800000) {
      precision = 'hour'
    }
    let filters = {
      token: this.state.tokenAddresses[this.state.selectedShortTicker],
      ticker: this.state.selectedShortTicker,
      from: this.state.longDates[0],
      to: this.state.longDates[1],
      precision: precision,
    }
    historical.getHistoricalNexus(filters).then(apiData => {
      let formattedData = apiData
        //.filter(obj => obj.value)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY'), APR: obj.value}
        })
      this.setState(_ => ({
        data: formattedData,
      }))
      console.log(this.state.data)
    })
  }

  fetchAverages() {
    if (this.state.selectedAverage.length === 0) {
      return
    }
    let precision = 'day'
    let diff = Math.abs(dayjs(this.state.longDates[0]).diff(dayjs(this.state.longDates[1])))
    // 604800000 = 7 days
    if (diff < 604800000) {
      precision = 'hour'
    }
    let filters = {
      token: this.state.tokenAddresses[this.state.selectedShortTicker],
      ticker: this.state.selectedShortTicker,
      from: this.state.longDates[0],
      to: this.state.longDates[1],
      precision: precision,
    }
    historical.getHistoricalNexus(filters).then(apiData => {
      const values = []
      const dates = []
      apiData.filter(obj => values.push(obj.value)) 
      apiData.filter(obj => dates.push(obj.date)) 
      const maData = simpleMovingAverage(values, this.state.selectedAverage)
      this.setState(_ => ({
        averageValues: maData,
        averageDates: dates.slice(this.state.selectedAverage-1)
      }))
      console.log(values.length)
      console.log(this.state.averageValues)
      console.log(this.state.averageDates)
    })

    let finalData = []
    for (let i = 0; i < this.state.averageDates.length; i++) {
      finalData.push({xaxis1: dayjs(this.state.averageDates[i]), APR_Average: this.state.averageValues[i]})
      console.log(finalData)
    }
    this.setState(_ => ({
      averageData: finalData
    }))

  }

  handleChange(selectedOption) {
    console.log(selectedOption.value)
    this.setState({
      selectedShortTicker: selectedOption.value
    }, () => this.fetchAprData())
  }

  handleAverageChange(selectedAverage) {
    console.log(selectedAverage.value)
    this.setState({
      selectedAverage: selectedAverage.value
    }, () => this.fetchAverages())
  }

  handleStartDateChange(date) {
    let newDates = [date, this.state.longDates[1]]
    this.setState({
      longDates: newDates,
    }, () => this.fetchAprData())
  }

  handleEndDateChange(date) {
    let newDates = [this.state.longDates[0], date]
    this.setState({
      longDates: newDates,
    }, () => this.fetchAprData())
  }

  componentDidMount() {
    // load latest month by default
    this.fetchTickers()
  }

  render() {
    return (
      <Col xl="12">
        <LineChart
          data={this.state.data}
          defaultOption={this.state.defaultOption}
          onAssetChange={this.handleChange}
          startDate={this.state.longDates[0]}
          onStartDateChange={this.handleStartDateChange}
          endDate={this.state.longDates[1]}
          onEndDateChange={this.handleEndDateChange}
          tickers={this.state.tickerOptions}
          title="Pool APRs"
          yAxisKey="APR"
          yAxisFormatter={(val) => val.toFixed(2) + '%'}
        />
      </Col>
    )
  }
}

export default AprTrackerShort
