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

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { ConsoleWriter } from "istanbul-lib-report"
import { date } from "language-tags"
import dayjs from 'dayjs'

import ChartHeader from '../../components/ChartHelpers/chartHeader'
import FullscreenComponent from '../../components/FullscreenComponent'

import { Line } from 'react-chartjs-2'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)


function pctFormatter(params) {
  return Number(params.value*100).toFixed(2) + '%';
}

function scoreFormatter(params) {
  return Number(params.value).toFixed(2);
}

function formatXAxis(tickItem) {
  return dayjs(tickItem).format('MM/DD/YYYY')
}

function priceFormat(tickItem) {
  return String(Number(tickItem*100).toFixed(2))+'%'
}

const fetchStats = () => {
  return fetch(
    "https://api.alphadefi.fund/historical/poolhiststats"
  );
};

class AprTrackerShort extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      tickerOptions: [],
      tokenAddresses: {},
      rowData: [],
      rowData2: [],
      selectedShortTicker: 'mAAPL-UST',
      defaultOption: { label: 'mAAPL-UST', value: 'mAAPL-UST' },
      longDates: [dayjs().subtract(6, 'month').toDate(), dayjs().toDate()],
    }
    this.fetchAprData = this.fetchAprData.bind(this)
    this.fetchTickers = this.fetchTickers.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleStartDateChange = this.handleStartDateChange.bind(this)
    this.handleEndDateChange = this.handleEndDateChange.bind(this)

    this.fetchData = this.fetchData.bind(this);
  }

  async fetchData() {
    const response = await fetchStats();
    const data = await response.json();
    console.log(data)
    this.setState({ rowData: data });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    console.log(">> onGridReady");
    this.fetchData();
    //this.gridColumnApi.autoSizeColumns();
    this.gridApi.sizeColumnsToFit();

  }

  fetchTickers() {
    poolDictApi.getPoolDict().then(apiData => {
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
    historical.getHistoricalCommAprs(filters).then(apiData => {
      let formattedData = apiData
        .filter(obj => obj.apr)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY'), APR: obj.apr}
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
      selectedShortTicker: selectedOption.value
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

  render() {
    return (
      <>
        <Col xl="12">
          <FullscreenComponent defaultHeight={600}d defaultWidth={2000}>
            {({ toggleFullscreen, icon, chartParams, isFullscreen }) => {
              const lineChartDimensions = isFullscreen ? chartParams.reverseContainer() : chartParams.container
              return (
                <Card>
                  <CardBody className="card-body-test">
                    <ChartHeader
                      title="TERRASWAP TRADING APRS"
                      callbackOpts={{ action: toggleFullscreen, icon }}
                    />
                    <FormGroup className="w-25 select2-container mb-3 d-inline-block me-2">
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
                    <div style={chartParams.container}>
                      <Line
                        redraw
                        {...lineChartDimensions}
                        data={{
                          datasets: [{
                            label: 'apr',
                            data: this.state.data.map(d => ({ y: d.APR, x: d.xaxis1 })),
                            borderColor: '#8884d8',
                          }]
                        }}
                        options={{
                          responsive: false,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: 'bottom',
                            },
                            title: {
                              display: false,
                            },
                          },
                          scales: {
                            y: {
                              ticks: {
                                callback: (apr) => priceFormat(apr),
                              },
                            },
                          },
                        }}
                      />
                    </div>
                  </CardBody>
                </Card>
              )
            }}
          </FullscreenComponent>
        </Col>
        <Col xl="12">
          <FullscreenComponent defaultHeight={400}>
            {({ toggleFullscreen, icon, chartParams, isFullscreen }) => (
              <Card>
                <CardBody>
                  <ChartHeader
                    title="Hover Mouse for Column Descriptions"
                    callbackOpts={{ action: toggleFullscreen, icon }}
                  />
                  <div className="ag-theme-alpine" style={isFullscreen ? chartParams.reverseContainer(40) : chartParams.container}>
                    <AgGridReact
                      onGridReady={this.onGridReady.bind(this)}
                      rowData={this.state.rowData}
                      defaultColDef={{ resizable: true, minWidth: 200 }}
                      onFirstDataRendered={(params) => {
                        params.api.sizeColumnsToFit();
                      }}
                    >
                      <AgGridColumn field="symbol" sortable={true} filter={true} headerTooltip='Symbol'></AgGridColumn>
                      <AgGridColumn field="AlphaDefi APR Score" sortable={true} filter={true} valueFormatter={scoreFormatter}  headerTooltip='Current Yield / rolling 21 day vol'></AgGridColumn>
                      <AgGridColumn field="current" sortable={true} filter={true} valueFormatter={pctFormatter}  headerTooltip='most recently calculated APY'></AgGridColumn>
                      <AgGridColumn field="mean" sortable={true} filter={true} valueFormatter={pctFormatter}  headerTooltip='mean historical apr, normally the apr this pool trades at'></AgGridColumn>
                      <AgGridColumn field="Three SD" sortable={true} filter={true} valueFormatter={pctFormatter}  headerTooltip='+ three standard deviations from mean'></AgGridColumn>
                      <AgGridColumn field="Neg Three SD" sortable={true} filter={true} valueFormatter={pctFormatter}  headerTooltip='- three standard deviations from mean'></AgGridColumn>
                      <AgGridColumn field="max" sortable={true} filter={true} valueFormatter={pctFormatter}  headerTooltip='max apr last 21 days'></AgGridColumn>
                      <AgGridColumn field="min" sortable={true} filter={true} valueFormatter={pctFormatter}   headerTooltip='min apr last 21 days'></AgGridColumn>
                      <AgGridColumn field="std" sortable={true} filter={true} valueFormatter={pctFormatter}  headerTooltip='std of historical apr'></AgGridColumn>
                      <AgGridColumn field="Historical 5th % Spread" sortable={true} filter={true} valueFormatter={pctFormatter}  headerTooltip='Historical 5th % APR'></AgGridColumn>
                      <AgGridColumn field="Historical 95th % Spread" sortable={true} filter={true} valueFormatter={pctFormatter}  headerTooltip='Historical 95th % APR'></AgGridColumn>
                    </AgGridReact>
                  </div>
                </CardBody>
              </Card>
            )}
          </FullscreenComponent>
        </Col>
      </>
    )
  }
}

export default AprTrackerShort
