import React from "react"
import { Col } from "reactstrap"
import poolDictApi from '../../api/v1/pool-dictionary'
import historical from '../../api/v1/historical'

import LineChart from '../../components/Charts/LineChart';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import dayjs from 'dayjs'
import { numberFormat } from '../../components/utils';

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
    historical.getHistoricalTlvs(filters).then(apiData => {
      let formattedData = apiData
        .filter(obj => obj.value)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY'), LIQUIDITY: obj.value}
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
          title="POOL LIQUIDITY"
          yAxisKey="LIQUIDITY"
          yAxisFormatter={numberFormat}
        />
      </Col>
    );

    /*
    <Card>
      <CardBody>
        <div className="ag-theme-alpine" style={{height: 400}}>
        <Label className="control-label">Hover Mouse for Column Descriptions</Label>
        <AgGridReact
            onGridReady={this.onGridReady.bind(this)}
            rowData={this.state.rowData}>
            <AgGridColumn field="symbol" sortable={true} filter={true} resizable={true} headerTooltip='Symbol'></AgGridColumn>
            <AgGridColumn field="AlphaDefi APR Score" sortable={true} filter={true} valueFormatter={scoreFormatter} resizable={true}  headerTooltip='Current Yield / rolling 21 day vol'></AgGridColumn>
            <AgGridColumn field="current" sortable={true} filter={true} valueFormatter={pctFormatter} resizable={true}  headerTooltip='most recently calculated APY'></AgGridColumn>
            <AgGridColumn field="mean" sortable={true} filter={true} valueFormatter={pctFormatter} resizable={true}  headerTooltip='mean historical apr, normally the apr this pool trades at'></AgGridColumn>
            <AgGridColumn field="Three SD" sortable={true} filter={true} valueFormatter={pctFormatter} resizable={true}  headerTooltip='+ three standard deviations from mean'></AgGridColumn>
            <AgGridColumn field="Neg Three SD" sortable={true} filter={true} valueFormatter={pctFormatter} resizable={true}  headerTooltip='- three standard deviations from mean'></AgGridColumn>
            <AgGridColumn field="max" sortable={true} filter={true} valueFormatter={pctFormatter} resizable={true}  headerTooltip='max apr last 21 days'></AgGridColumn>
            <AgGridColumn field="min" sortable={true} filter={true} valueFormatter={pctFormatter} resizable={true}   headerTooltip='min apr last 21 days'></AgGridColumn>
            <AgGridColumn field="std" sortable={true} filter={true} valueFormatter={pctFormatter} resizable={true}  headerTooltip='std of historical apr'></AgGridColumn>
            <AgGridColumn field="Historical 5th % Spread" sortable={true} filter={true} valueFormatter={pctFormatter} resizable={true}  headerTooltip='Historical 5th % APR'></AgGridColumn>
            <AgGridColumn field="Historical 95th % Spread" sortable={true} filter={true} valueFormatter={pctFormatter} resizable={true}  headerTooltip='Historical 95th % APR'></AgGridColumn>
        </AgGridReact>
        </div>
      </CardBody>
    </Card>
    */
  }
}

export default AprTrackerShort
