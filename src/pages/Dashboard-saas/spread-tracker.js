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


import {LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from 'recharts'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { ConsoleWriter } from "istanbul-lib-report"
import { date } from "language-tags"

function pctFormatter(params) {
  return '%' + Number(params.value*100).toFixed(2);
}

function formatXAxis(tickItem) {
  var date = new Date(tickItem)
  var day = date.getDay()
  var month = date.getMonth()
  var year = date.getFullYear()
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();

  var MyDateString = ('0' + date.getDate()).slice(-2) + '/'
             + ('0' + (date.getMonth()+1)).slice(-2) + '/'
             + date.getFullYear()


  return MyDateString + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}

const fetchStats = () => {
  return fetch(
    "https://api.alphadefi.fund/info/longvolrankings"
  );
};

const fetchStats2 = () => {
  return fetch(
    "https://api.alphadefi.fund/info/shortvolrankings"
  );
};


class SpreadTracker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      data2: [],
      tickerOptions: [],
      tokenAddresses: {},
      rowData: [],
      rowData2: []
    }
    this.fetchSpreadData = this.fetchSpreadData.bind(this)
    this.fetchTickers.bind(this)
    this.handleChange = this.handleChange.bind(this)

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
  }

  fetchTickers() {
    tokenDictApi.getTokenDict().then(apiData => {
      let tokenObj = apiData[0] ? apiData[0].token : {}
      this.setState(_ => ({
        tickerOptions: Object.keys(tokenObj).map(ticker => {
          return { value: ticker, label: ticker }
        }),
        tokenAddresses: tokenObj,
      }))
    })
  }
   
  fetchSpreadData(ticker) {
    let filters = {
      token: this.state.tokenAddresses[ticker],
      ticker: ticker
    }
    historical.getHistoricalLongAprs(filters).then(apiData => {
      console.log(apiData)
      let formattedData = apiData
        .filter(obj => isNaN(obj.apr)===false)
        .map(obj => {
          return {xaxis1: new Date(obj.date).getTime(), Price: obj.apr}
        })
      this.setState(_ => ({
        data: formattedData,
      }))
      console.log(this.state.data)
    })
  }

  handleChange(selectedOption) {
    this.fetchSpreadData(selectedOption.value)
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
        <Col xl="10">
        <Card >
            <CardBody className="card-body-test">
              <FormGroup className="select2-container mb-3">
                <Label className="control-label">Assets</Label>
                <Select
                  classNamePrefix="form-control"
                  placeholder="Choose ..."
                  title="mAsset"
                  options={this.state.tickerOptions}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <div style={{height: 600}}>
              <ResponsiveContainer width="100%" height="100%">
              <LineChart width={2000} height={600} 
                      margin={{top: 20, right: 30, left: 0, bottom: 0}}>
                <XAxis dataKey = 'xaxis1' type="number" domain={['dataMin', 'dataMax']} tickFormatter={formatXAxis}/>
                <YAxis  domain={['auto', 'auto']}/>    
                <Tooltip labelFormatter={tick => {return formatXAxis(tick);}}/>
                <Legend />
                <Line data={this.state.data} type="linear" dataKey="Price" dot={false} strokeWidth={2} stroke="#8884d8"/>
             </LineChart>
             </ResponsiveContainer>
             </div>
            </CardBody>
          </Card>
          <Card>
          <CardBody>
            <div className="ag-theme-alpine" style={{height: 400}}>
            <AgGridReact
               onGridReady={this.onGridReady.bind(this)} 
               rowData={this.state.rowData}>
                <AgGridColumn field="symbol" sortable={true} filter={true}></AgGridColumn>
                <AgGridColumn field="mean" sortable={true} filter={true} valueFormatter={pctFormatter}></AgGridColumn>
                <AgGridColumn field="Three SD" sortable={true} filter={true} valueFormatter={pctFormatter}></AgGridColumn>
                <AgGridColumn field="Neg Three SD" sortable={true} filter={true} valueFormatter={pctFormatter}></AgGridColumn>
                <AgGridColumn field="max" sortable={true} filter={true} valueFormatter={pctFormatter}></AgGridColumn>
                <AgGridColumn field="min" sortable={true} filter={true} valueFormatter={pctFormatter}></AgGridColumn>
                <AgGridColumn field="std" sortable={true} filter={true} valueFormatter={pctFormatter}></AgGridColumn>
                <AgGridColumn field="Historical 5th % Spread" sortable={true} filter={true} valueFormatter={pctFormatter}></AgGridColumn>
                <AgGridColumn field="Historical 95th % Spread" sortable={true} filter={true} valueFormatter={pctFormatter}></AgGridColumn>
            </AgGridReact>
            </div>
          </CardBody>
          </Card>
        </Col>
      </React.Fragment>
    )
  }
}

export default SpreadTracker
