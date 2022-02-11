import React from 'react';
import {
  Row,
  Col,
  Label,
  Card,
  CardBody
} from "reactstrap"
import historical from '../../api/v1/historical'
import {AgGridColumn, AgGridReact} from 'ag-grid-react'

//Import Date Picker
import "react-datepicker/dist/react-datepicker.css"

import {CartesianGrid, Scatter, ScatterChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from 'recharts'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import dayjs from 'dayjs'
import MiniWidget from "./mini-widget"

import DateTimePicker from 'react-datetime-picker';



const options = {
  chart: { sparkline: { enabled: !0 } },
  stroke: { curve: "smooth", width: 2 },
  colors: ["#f1b44c"],
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      inverseColors: !1,
      opacityFrom: 0.45,
      opacityTo: 0.05,
      stops: [25, 100, 100, 100],
    },
  },
  tooltip: { fixed: { enabled: !1 }, x: { show: !1 }, marker: { show: !1 } },
};

function pctFormatter(params) {
  return Number(params.value * 100).toFixed(2) + "%";
}

function pctFormatter2(params) {
  return Number(params.value).toFixed(2) + "%";
}

function priceFormat(tickItem) {
  return (
    "$" +
    Number(tickItem.value).toLocaleString("en-US", { maximumFractionDigits: 2 })
  );
}

function priceFormat2(tickItem) {
  return Number(tickItem).toLocaleString("en-US", { maximumFractionDigits: 2 });
}

const fetchStats = () => {
  return fetch("https://api.alphadefi.fund/info/liqprofile");
};

const fetchLuna = () => {
  return fetch("https://api.alphadefi.fund/info/liqprofile");
};

function GetSortOrder(prop) {    
  return function(a, b) {    
      if (a[prop] > b[prop]) {    
          return 1;    
      } else if (a[prop] < b[prop]) {    
          return -1;    
      }    
      return 0;    
  }    
} 



class AprTrackerShort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      tokenAddresses: {},
      rowData: [],
      rowData2: [],
      liquidationData: [],
      selectedDate: [new Date()],
      longDates: [dayjs().subtract(1, "month").toDate(), dayjs().toDate()],
      reports: [
        {
          title: "Live",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/Luna.png",
          color: "warning",
          value: "",
          arrow: "mdi-arrow-up text-success",
          series: [{ name: "LUNA", data: [] }],
          options: options,
        },
        {
          title: "Biggest Loan Risk Node",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/Luna.png",
          color: "primary",
          arrow: "mdi-arrow-down text-danger",
          value: "",
          series: [{ name: "Loan Risk", data: [] }],
          options: options,
        },
        {
          title: "Price To Watch",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/Luna.png",
          color: "info",
          arrow: "mdi-arrow-up text-success",
          value: "",
          series: [{ name: "Price to Watch", data: [] }],
          options: options,
        },
      ],
      reports2: [
        {
          title: "Largest Executed Bid (Last 30 Days)",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/Luna.png",
          color: "warning",
          value: "",
          arrow: "mdi-arrow-up text-success",
          series: [{ name: "Biggest Loan Liquidated", data: [] }],
          options: options,
        },
        {
          title: "Best Discount Captured (Last 30 Days)",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/Luna.png",
          color: "primary",
          arrow: "mdi-arrow-down text-danger",
          value: "",
          series: [{ name: "Best Discount Captured", data: [] }],
          options: options,
        },
        {
          title: "Average Discount Captured (Last 30 Days)",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/Luna.png",
          color: "info",
          arrow: "mdi-arrow-up text-success",
          value: "",
          series: [{ name: "Average Discount Captured", data: [] }],
          options: options,
        },
      ],
    };
    this.fetchAprData = this.fetchAprData.bind(this);
    this.fetchHistoricalProfile = this.fetchHistoricalProfile.bind(this);
    this.fetchLiquidations = this.fetchLiquidations.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.fetchLuna = this.fetchLuna.bind(this);

    this.timer = null;
    this.timer2 = null;
    this.timer3 = null;
    this.timer4 = null;
    this.clearTimer = this.clearTimer.bind(this);
    this.scheduleFetch = this.scheduleFetch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async fetchData() {
    const response = await fetchStats();
    const data = await response.json();
    console.log(data);
    this.setState({ rowData: data });
  }

  async fetchLuna() {
    const response = await fetchLuna();
    const data = await response.json();
    console.log(data);
    let newState = JSON.parse(JSON.stringify(this.state));
    newState.reports[0].value =
      "Luna - $" +
      Number(data[0]["luna_price"]).toLocaleString("en-US", {
        maximumFractionDigits: 2,
      });
    newState.reports[1].value =
      "Luna - $" +
      Number(data[0]["bigrisk"]).toLocaleString("en-US", {
        maximumFractionDigits: 2,
      });
    newState.reports[2].value =
      "Luna - $" +
      Number(data[0]["areatowatch"]).toLocaleString("en-US", {
        maximumFractionDigits: 2,
      });
    this.setState(newState);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    console.log(">> onGridReady");
    this.fetchData();
    //this.gridColumnApi.autoSizeColumns();
    this.gridApi.sizeColumnsToFit();
  }

  fetchAprData() {
    historical.getLiquidationProfile().then(apiData => {
      let formattedData = apiData.map(obj => {
        return {
          Luna_Liquidation_Price: obj.Luna_Liquidation_Price,
          Loan_Value: obj.Loan_Value,
        };
      });
      this.setState(_ => ({
        data: formattedData,
      }));
      console.log(this.state.data);
      this.scheduleFetch();
    });
  } 

  fetchHistoricalProfile() {
    let filters = {
      datetime: this.state.selectedDate, 
    }
    historical.getHistoricalLiquidationProfile(filters).then(apiData => {
      let formattedData = apiData.map(obj => {
        return {
          Luna_Liquidation_Price: obj.Luna_Liquidation_Price,
          Loan_Value: obj.Loan_Value,
          collateral_value: obj.collateral_value,
          ltv: obj.ltv,
          percent_of_loans: obj.percent_of_loans,
          luna_price: obj.luna_price,
          bigrisk: obj.bigrisk,
          areatowatch: obj.areatowatch

        };
      });
      this.setState(_ => ({
        data: formattedData.sort(GetSortOrder("Luna_Liquidation_Price")),
        rowData: formattedData 
      }));
      console.log(this.state.data);
      this.clearTimer();

      let newState = JSON.parse(JSON.stringify(this.state));
    newState.reports[0].value =
      "Luna - $" +
      Number(formattedData[0]["luna_price"]).toLocaleString("en-US", {
        maximumFractionDigits: 2,
      });
    newState.reports[1].value =
      "Luna - $" +
      Number(formattedData[0]["bigrisk"]).toLocaleString("en-US", {
        maximumFractionDigits: 2,
      });
    newState.reports[2].value =
      "Luna - $" +
      Number(formattedData[0]["areatowatch"]).toLocaleString("en-US", {
        maximumFractionDigits: 2,
      });
    this.setState(newState);
    });
  }

  fetchLiquidations() {
    
    let filters = {
      from: this.state.longDates[0],
      to: this.state.longDates[1],
    }
    historical.getHistoricalLiquidations(filters).then(apiData => {
      let formattedData = apiData
        .map(obj => {
          return{
          executed_at: obj.executed_at,
          Total_Amount_Paid_for_Collateral: obj.Total_Amount_Paid_for_Collateral,
          Discounted_Price_Per_Unit_Paid: obj.Discounted_Price_Per_Unit_Paid,
          Discount_vs_UST_DEX_Price_at_Liquidation: obj.Discount_vs_UST_DEX_Price_at_Liquidation,
          symbol: obj.symbol,
          max: obj.max_amount,
          best: obj.best_discount,
          average: obj.average_discount
          }
        })
      this.setState(_ => ({
        liquidationData: formattedData,
      }))
      
      let newState = JSON.parse(JSON.stringify(this.state))
      newState.reports2[0].value = '$'+ Number(formattedData[formattedData.length-1].max).toLocaleString('en-US', {maximumFractionDigits:2})
      newState.reports2[1].value = Number(formattedData[formattedData.length-1].best*100).toLocaleString('en-US', {maximumFractionDigits:2})+'%'
      newState.reports2[2].value = Number(formattedData[formattedData.length-1].average*100).toLocaleString('en-US', {maximumFractionDigits:2})+'%'
      this.setState(newState)

      console.log(this.state.liquidationData)
    })
  }

  clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      clearTimeout(this.timer2);
      clearTimeout(this.timer3);
      clearTimeout(this.timer4);
      this.timer = null;
      this.timer2 = null;
      this.timer3 = null;
      this.timer4 = null;
    }
  }

  scheduleFetch() {
    this.clearTimer();
    // set to 1 min, the same as the graphql interval
    this.timer = setTimeout(this.fetchAprData, 60000);
    this.timer2 = setTimeout(this.fetchData, 60000);
    this.timer3 = setTimeout(this.fetchLuna, 60000);
    this.timer4 = setTimeout(this.fetchLiquidations, 300000);
  }

  handleChange(selectedOption) {
    
    let newDate = selectedOption
    console.log(selectedOption)
    this.setState({
      selectedDate: newDate
    }, () => this.fetchHistoricalProfile())
  }


  componentDidMount() {
    this.fetchAprData();
    this.fetchLuna();
    this.fetchLiquidations()
  }

  render() {
    return (
      <React.Fragment>
        <Col xl="12">
        <Card>
          <CardBody>
          <Row>
          <Label className="control-label">ALPHADEFI LIQUIDATION PROFILE</Label>
            <div>
              <DateTimePicker
                value={new Date(this.state.selectedDate)}
                onChange={this.handleChange}
                minDate={dayjs('2/3/2022').toDate()}
              />
            </div>
          </Row>
          </CardBody>
          </Card>

          
          <Card >
          <CardBody >
          <Row>
          <MiniWidget reports={this.state.reports} />
          </Row>
          </CardBody>
          </Card>
          
          <Card>
          <CardBody>
          <Label>
                  Use Datetime Picker Above To Look At Historical Data
          </Label>
          <div style={{height: 1000}}>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                width={400}
                height={400}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
                  >
              <CartesianGrid />
              <XAxis type="number" dataKey="Loan_Value" name="Loan_Value" tickFormatter={priceFormat2} domain={['dataMin', 'dataMax']}/>
              <YAxis type="number" dataKey="Luna_Liquidation_Price" name="Luna_Liquidation_Price" tickFormatter={priceFormat2} domain={['dataMin', 'dataMax']}/>
              <Tooltip cursor={{ strokeDasharray: '3 3' }}  labelFormatter={tick => {return priceFormat(tick);}} formatter={tick => {return priceFormat2(tick);}}/>
              <Legend/>
              <Scatter name="Liquidatuion Prices of Outstanding Loans" data={this.state.data} fill="000000" line={{stroke: 'black', strokeWidth: 3}}/>
              </ScatterChart>
         
             </ResponsiveContainer>
             </div>
            </CardBody>
          </Card>
          *
          <Card>
            <CardBody>
            <Label className="control-label">
                  Use Datetime Picker Above To Look At Historical Data
            </Label>
              <div className="ag-theme-alpine" style={{ height: 800 }}>
                <AgGridReact
                  onGridReady={this.onGridReady.bind(this)}
                  rowData={this.state.rowData}
                >
                  <AgGridColumn
                    field="ltv"
                    sortable={true}
                    filter={true}
                    valueFormatter={pctFormatter}
                    resizable={true}
                    headerTooltip=""
                  ></AgGridColumn>
                  <AgGridColumn
                    field="collateral_value"
                    sortable={true}
                    filter={true}
                    valueFormatter={priceFormat}
                    resizable={true}
                    headerTooltip=""
                  ></AgGridColumn>
                  <AgGridColumn
                    field="Loan_Value"
                    sort="desc"
                    sortable={true}
                    filter={true}
                    valueFormatter={priceFormat}
                    resizable={true}
                    headerTooltip=""
                  ></AgGridColumn>
                  <AgGridColumn
                    field="percent_of_loans"
                    sortable={true}
                    filter={true}
                    valueFormatter={pctFormatter2}
                    resizable={true}
                    headerTooltip=""
                  ></AgGridColumn>
                  <AgGridColumn
                    field="Luna_Liquidation_Price"
                    sortable={true}
                    filter={true}
                    valueFormatter={priceFormat}
                    resizable={true}
                    headerTooltip=""
                  ></AgGridColumn>
                </AgGridReact>
              </div>
            </CardBody>
          </Card>
          
          <Card >
          <CardBody >
          <Row>
          <MiniWidget reports={this.state.reports2} />
          </Row>
          </CardBody>
          </Card>

          <Card>
            <CardBody>
            <Label className="control-label">
                  Liquidations - Last 30 Days
            </Label>
              <div className="ag-theme-alpine" style={{ height: 800 }}>
                <AgGridReact
                  onGridReady={this.onGridReady.bind(this)}
                  rowData={this.state.liquidationData}
                >
                  <AgGridColumn
                    field="executed_at"
                    sort="desc"
                    sortable={true}
                    filter={true}
                    //valueFormatter={pctFormatter}
                    resizable={true}
                    headerTooltip=""
                  ></AgGridColumn>
                  <AgGridColumn
                    field="symbol"
                    sortable={true}
                    filter={true}
                    //valueFormatter={priceFormat}
                    resizable={true}
                    headerTooltip=""
                  ></AgGridColumn>
                  <AgGridColumn
                    field="Total_Amount_Paid_for_Collateral"
                    sortable={true}
                    filter={true}
                    valueFormatter={priceFormat}
                    resizable={true}
                    headerTooltip=""
                  ></AgGridColumn>
                  <AgGridColumn
                    field="Discounted_Price_Per_Unit_Paid"
                    sortable={true}
                    filter={true}
                    valueFormatter={priceFormat}
                    resizable={true}
                    headerTooltip=""
                  ></AgGridColumn>
                  <AgGridColumn
                    field="Discount_vs_UST_DEX_Price_at_Liquidation"
                    sortable={true}
                    filter={true}
                    valueFormatter={pctFormatter}
                    resizable={true}
                    headerTooltip=""
                  ></AgGridColumn>
                </AgGridReact>
              </div>
            </CardBody>
          </Card>
        </Col>
      </React.Fragment>
    );
  }
}

export default AprTrackerShort;

{
  /*//fetch kujira data (not working because its blocked so might have to make own API to get around it)
const fetchNodes = () => {
  return fetch(
    "https://api.coinhall.org/api/v1/charts/terra/candles?bars=320&from=1641492129&interval=1h&pairAddress=terra1tndcaqxkpc5ce9qee5ggqf430mr2z3pefe5wj6&quoteAsset=uusd&to=1642644129"
    //"https://api.kujira.app/api/terra1vn5s4s7gpp4yu0mtad8recncyh2h2c6l4qesd6/borrowers/summary"
  );
};


//fetch luna data
const fetchHistory = () => {
  return fetch(
    "https://api.coinhall.org/api/v1/charts/terra/candles?bars=320&from=1641492129&interval=1h&pairAddress=terra1tndcaqxkpc5ce9qee5ggqf430mr2z3pefe5wj6&quoteAsset=uusd&to=1642644129"
  );
};

//fetch live terraswap luna price
//formula (number of luna/total share)/(number of UST/total share) 
const fetchLivePrice = () => {
  return fetch(
    "https://fcd.terra.dev/wasm/contracts/terra1tndcaqxkpc5ce9qee5ggqf430mr2z3pefe5wj6/store?query_msg={%22pool%22:{}}"
  );
};*/
}
