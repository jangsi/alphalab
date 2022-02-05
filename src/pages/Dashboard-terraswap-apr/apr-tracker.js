import React from "react"
import Select from "react-select"
import {
  Col,
  FormGroup,
  Label,
  Card,
  CardBody
} from "reactstrap"
import tokenDictApi from '../../api/v1/token-dictionary'
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

function pctFormatter(params) {
  return '%' + Number(params.value*100).toFixed(2);
}

function formatXAxis(tickItem) {
  return dayjs(tickItem).format('MM/DD/YYYY HH:mm:ss')
}

function priceFormat(tickItem) {
  return String(Number(tickItem*100).toFixed(2))+'%'
}

class AprTracker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      data2: [],
      tickerOptions: [],
      tokenAddresses: {},
      rowData: [],
      rowData2: [],
      selectedLongTicker: 'mSPY',
      defaultOption: { label: 'mSPY', value: 'mSPY' },
      longDates: [dayjs().subtract(6, 'month').toDate(), dayjs().toDate()],
    }
    this.fetchAprData = this.fetchAprData.bind(this)
    this.fetchTickers = this.fetchTickers.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleStartDateChange = this.handleStartDateChange.bind(this)
    this.handleEndDateChange = this.handleEndDateChange.bind(this)

    this.fetchData = this.fetchData.bind(this);
    this.fetchData2 = this.fetchData2.bind(this);
  }

  async fetchData() {
    const response = await fetchStats();
    const data = await response.json();
    this.setState({ rowData: data });
  }

  async fetchData2() {
    const response = await fetchStats2();
    const data = await response.json();
    this.setState({ rowData2: data });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    console.log(">> onGridReady");
    this.fetchData();
    this.gridApi.sizeColumnsToFit()
  }

  fetchTickers() {
    tokenDictApi.getTokenDict().then(apiData => {
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
    if (this.state.selectedLongTicker.length === 0) {
      return
    }
    let precision = 'day'
    let diff = Math.abs(dayjs(this.state.longDates[0]).diff(dayjs(this.state.longDates[1])))
    // 604800000 = 7 days
    if (diff < 604800000) {
      precision = 'hour'
    }
    let filters = {
      token: this.state.tokenAddresses[this.state.selectedLongTicker],
      ticker: this.state.selectedLongTicker,
      from: this.state.longDates[0],
      to: this.state.longDates[1],
      precision: precision,
    }
    historical.getHistoricalLongAprs(filters).then(apiData => {
      let formattedData = apiData
        .filter(obj => obj.apr)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY HH:mm:ss'), APR: obj.apr}
        })
      this.setState(_ => ({
        data: formattedData,
      }))
      console.log(this.state.data)
    })
  }

  handleChange(selectedOption) {
    console.log(selectedOption.value)
    this.setState({
      selectedLongTicker: selectedOption.value
    }, () => this.fetchAprData())
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

 pctFormatter(params) {
    return '%' + params.value*100;
  }

  render() {
    return (
      <React.Fragment>
        <Col xl="12">
        <Card >
            <CardBody className="card-body-test">
              <FormGroup className="w-25 select2-container mb-3 d-inline-block me-2">
                <Label className="control-label">LONG APRS</Label>
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
              <div style={{height: 600}}>
              <ResponsiveContainer width="100%" height="100%">
              <LineChart width={2000} height={600}
                      margin={{top: 20, right: 30, left: 0, bottom: 0}}>
                <XAxis dataKey='xaxis1' type="category" domain={['dataMin', 'dataMax']} tickFormatter={formatXAxis}/>
                <YAxis  domain={['auto', 'auto']}  tickFormatter={priceFormat}/>
                <Tooltip labelFormatter={tick => {return formatXAxis(tick);}} formatter={tick => {return priceFormat(tick);}}/>
                <Legend />
                <Line data={this.state.data} type="linear" dataKey="APR" dot={false} strokeWidth={4} stroke="#8884d8"/>
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

export default AprTracker
