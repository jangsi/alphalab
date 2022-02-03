import React from "react";
import { Row, Col, Label, Card, CardBody } from "reactstrap";
import historical from "../../api/v1/historical";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

//Import Date Picker
import "react-datepicker/dist/react-datepicker.css";

import {
  CartesianGrid,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import dayjs from "dayjs";
import MiniWidget from "./mini-widget";

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

function formatXAxis(tickItem) {
  return dayjs(tickItem).format("MM/DD/YYYY HH:mm:ss");
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

class AprTrackerShort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      tickerOptions: [],
      tickerOptions2: [],
      tokenAddresses: {},
      rowData: [],
      rowData2: [],
      selectedShortTicker: "LUNA-UST Astroport",
      defaultOption: {
        label: "LUNA-UST Astroport",
        value: "LUNA-UST Astroport",
      },
      longDates: [dayjs().subtract(6, "month").toDate(), dayjs().toDate()],
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
    };
    this.fetchAprData = this.fetchAprData.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.fetchLuna = this.fetchLuna.bind(this);

    this.timer = null;
    this.timer2 = null;
    this.timer3 = null;
    this.clearTimer = this.clearTimer.bind(this);
    this.scheduleFetch = this.scheduleFetch.bind(this);
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

  clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
      this.timer2 = null;
    }
  }

  scheduleFetch() {
    this.clearTimer();
    // set to 5 min, the same as the graphql interval
    this.timer = setTimeout(this.fetchAprData, 60000);
    this.timer2 = setTimeout(this.fetchData, 60000);
    this.timer3 = setTimeout(this.fetchLuna, 60000);
  }

  componentDidMount() {
    this.fetchAprData();
    this.fetchLuna();
  }

  render() {
    return (
      <React.Fragment>
        <Col xl="12">
          <Card>
            <CardBody className="card-body-test">
              <Row>
                {/* mini widgets */}
                <MiniWidget reports={this.state.reports} />
              </Row>
              <div style={{ height: 1000 }}>
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
                    <XAxis
                      type="number"
                      dataKey="Loan_Value"
                      name="Loan_Value"
                      tickFormatter={priceFormat2}
                      domain={["dataMin", "dataMax"]}
                    />
                    <YAxis
                      type="number"
                      dataKey="Luna_Liquidation_Price"
                      name="Luna_Liquidation_Price"
                      tickFormatter={priceFormat2}
                      domain={["dataMin", "dataMax"]}
                    />
                    <Tooltip
                      cursor={{ strokeDasharray: "3 3" }}
                      labelFormatter={tick => {
                        return priceFormat(tick);
                      }}
                      formatter={tick => {
                        return priceFormat2(tick);
                      }}
                    />
                    <Legend />
                    <Scatter
                      name="Liquidatuion Prices of Outstanding Loans"
                      data={this.state.data}
                      fill="000000"
                      line={{ stroke: "black", strokeWidth: 3 }}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </CardBody>
          </Card>
          *
          <Card>
            <CardBody>
              <div className="ag-theme-alpine" style={{ height: 800 }}>
                <Label className="control-label">
                  Hover Mouse for Column Descriptions
                </Label>
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
