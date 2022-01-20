import React from "react"
import Select from "react-select"
import {
  Col,
  FormGroup,
  Label,
  Card,
  CardBody
} from "reactstrap"
import poolDictApi from '../../api/v1/pool-dictionary'
import mirrorGraphql from '../../api/v1/mirror-graphql'
import historical from '../../api/v1/historical'
import {AgGridColumn, AgGridReact} from 'ag-grid-react'

//Import Date Picker
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import {LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from 'recharts'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { ConsoleWriter } from "istanbul-lib-report"
import { date } from "language-tags"
import dayjs from 'dayjs'

function formatXAxis(tickItem) {
  return dayjs(tickItem).format('MM/DD/YYYY HH:mm:ss')
}

function priceFormat(tickItem) {
  return Number(tickItem).toLocaleString('en-US', {maximumFractionDigits:2})+'%'
}

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
      tickerOptions: [],
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

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    console.log(">> onGridReady");
    //this.gridColumnApi.autoSizeColumns();
    this.gridApi.sizeColumnsToFit();

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
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY HH:mm:ss'), APR: obj.value}
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
      console.log('i am here')
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
      <React.Fragment>
        <Col xl="12">
        <Card >
            <CardBody className="card-body-test">
              <FormGroup className="w-25 select2-container mb-3 d-inline-block me-2">
                <Label className="control-label">POOL APRs</Label>
                <Select
                  classNamePrefix="form-control"
                  placeholder="TYPE or CHOOSE ..."
                  title="mAsset"
                  options={this.state.tickerOptions}
                  defaultValue={this.state.defaultOption}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup className="w-25 d-inline-block pb-2 me-2">
                <DatePicker
                  className="form-control"
                  selected={this.state.longDates[0]}
                  onChange={this.handleStartDateChange}
                />
              </FormGroup>
              <div className="d-inline-block me-2">~</div>
              <FormGroup className="w-25 d-inline-block pb-2">
                <DatePicker
                  className="form-control"
                  selected={this.state.longDates[1]}
                  onChange={this.handleEndDateChange}
                />
              </FormGroup>
             {/* <FormGroup className="w-25 select2-container mb-3 d-inline-block me-2">
                <Label className="control-label">Apply Moving Average</Label>
                <Select
                  classNamePrefix="form-control2"
                  placeholder="TYPE or CHOOSE ..."
                  title="mAsset"
                  options={this.state.averageOptions}
                  onChange={this.handleAverageChange}
              />
              </FormGroup>*/}
              <div style={{height: 600}}>
              <ResponsiveContainer width="100%" height="100%">
              <LineChart width={2000} height={600}
                      margin={{top: 20, right: 30, left: 0, bottom: 0}}>
                <XAxis xAxisId="one" dataKey='xaxis1' type="category" domain={['dataMin', 'dataMax']} tickFormatter={formatXAxis}/>
                <YAxis  domain={['auto', 'auto']} tickFormatter={priceFormat}/>


                <Tooltip labelFormatter={tick => {return formatXAxis(tick);}} formatter={tick => {return priceFormat(tick);}}/>
                <Legend />


                <Line data={this.state.data} xAxisId="one" type="linear" dataKey="APR" dot={false} strokeWidth={4} stroke="#8884d8"/>
                {/*<Line data={this.state.averageData} xAxisId="one" type="linear" dataKey="APR_Average" dot={false} strokeWidth={1} stroke="#8884d8"/>*/}
             </LineChart>
             </ResponsiveContainer>
             </div>
            </CardBody>
          </Card>
        </Col>
      </React.Fragment>
    )
  }
}

export default AprTrackerShort
