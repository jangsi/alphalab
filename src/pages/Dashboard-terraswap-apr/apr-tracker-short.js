import React from "react"
import { Col } from "reactstrap"
import poolDictApi from '../../api/v1/pool-dictionary'
import historical from '../../api/v1/historical'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import dayjs from 'dayjs'

import LineChart from '../../components/Charts/LineChart';
import Table from '../../components/Charts/Table';
import { scoreFormatter, pctFormatter } from '../../components/utils';

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
      tickerOptions: [{ label: 'mAAPL-UST', value: 'mAAPL-UST' }],
      tokenAddresses: {},
      rowData: [],
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
          <LineChart
            data={this.state.data}
            defaultOption={this.state.defaultOption}
            asset={this.state.tickerOptions.find(o => o.value === this.state.selectedShortTicker)}
            onAssetChange={this.handleChange}
            startDate={this.state.longDates[0]}
            onStartDateChange={this.handleStartDateChange}
            endDate={this.state.longDates[1]}
            onEndDateChange={this.handleEndDateChange}
            tickers={this.state.tickerOptions}
            title="TERRASWAP TRADING APRS"
            yAxisKey="APR"
            yAxisFormatter={pctFormatter}
          />
        </Col>
        <Col xl="12">
          <Table
            stickyColumn={{
              field: 'symbol',
              tooltip: 'Symbol',
            }}
            otherColumns={[
              {
                field: 'AlphaDefi APR Score',
                tooltip: 'Current Yield / rolling 21 day vol',
                formatter: (d) => scoreFormatter(d.value),
                minWidth: 200,
              },
              {
                field: 'current',
                tooltip: 'Most recently calculated APY',
                formatter: (d) => pctFormatter(d.value),
              },
              {
                field: 'mean',
                tooltip: 'Mean historical APR, normally the APR this pool trades at',
                formatter: (d) => pctFormatter(d.value),
              },
              {
                field: 'Three SD',
                tooltip: '+ three standard deviations from mean',
                formatter: (d) => pctFormatter(d.value),
              },
              {
                field: 'Neg Three SD',
                tooltip: '- three standard deviations from mean',
                formatter: (d) => pctFormatter(d.value),
              },
              {
                field: 'max',
                tooltip: 'max apr last 21 days',
                formatter: (d) => pctFormatter(d.value),
              },
              {
                field: 'min',
                tooltip: 'min apr last 21 days',
                formatter: (d) => pctFormatter(d.value),
              },
              {
                field: 'std',
                tooltip: 'std of historical apr',
                formatter: (d) => pctFormatter(d.value),
              },
              {
                field: 'Historical 5th % Spread',
                tooltip: 'Historical 5th % APR',
                formatter: (d) => pctFormatter(d.value),
                minWidth: 200,
              },
              {
                field: 'Historical 95th % Spread',
                tooltip: 'Historical 95th % APR',
                formatter: (d) => pctFormatter(d.value),
                minWidth: 250,
              },
            ]}
            data={this.state.rowData}
            onReady={this.onGridReady.bind(this)}
          />
        </Col>
      </>
    )
  }
}

export default AprTrackerShort
