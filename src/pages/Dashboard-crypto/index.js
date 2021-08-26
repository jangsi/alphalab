import React, { Component } from "react"
import { Container, Row, Col } from "reactstrap"
import MetaTags from 'react-meta-tags';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Import Components
import CardUser from "./card-user"
import CardWelcome from "./card-welcome"
import MiniWidget from "./mini-widget"
import WalletBalance from "./wallet-balance"
import OverView from "./overview"
import Transactions from "./transactions"
import Notifications from "./notifications"
import BuySell from "./buy-sell"
import SpreadTracker from './spread-tracker'
import mirrorGraphql from '../../api/v1/mirror-graphql'

//LUNA Chart
const options1 = {
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
}

//Etherium Chart
const series2 = [
  { name: "ETH", data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54] },
]
const options2 = {
  chart: { sparkline: { enabled: !0 } },
  stroke: { curve: "smooth", width: 2 },
  colors: ["#3452e1"],
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
}

//LiteCoin Chart
const series3 = [
  { name: "LTC", data: [35, 53, 93, 47, 54, 24, 47, 75, 65, 19, 14] },
]
const options3 = {
  chart: { sparkline: { enabled: !0 } },
  stroke: { curve: "smooth", width: 2 },
  colors: ["#50a5f1"],
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
}

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reports: [
        {
          title: "mAAPL",
          //icon: "mdi mdi-bitcoin",
          color: "warning",
          value: "$ 57,986.76",
          arrow: 'mdi-arrow-up text-success',
          desc: "+ 0.0012 ( 0.2 % )",
          series: [{ name: "mAAPL", data: []}],
          options: options1,
        },
        {
          title: "ANC",
          //icon: "mdi mdi-ethereum",
          color: "primary",
          arrow: 'mdi-arrow-down text-danger',
          value: "$ 2,077.53",
          desc: "- 4.102 ( 0.1 % )",
          series: series2,
          options: options2,
        },
        {
          title: "MIR",
          //icon: "mdi mdi-litecoin",
          color: "info",
          arrow: 'mdi-arrow-up text-success',
          value: "$ 225.01",
          desc: "+ 1.792 ( 0.1 % )",
          series: series3,
          options: options3,
        },
      ],
    }
    this.fetchData = this.fetchData.bind(this)
  }

  fetchData() {
    let currentTime = new Date().getTime()
    let filters = {
      from: currentTime - 87400000,
      to: currentTime - 300000,
      interval: 5,
      token: "terra1vxtwu4ehgzz77mnfwrntyrmgl64qjs75mpwqaz",
    }
    mirrorGraphql.getSpreadData(filters).then(data => {
      let data1 = []
      data.asset.prices.history.forEach(obj => {
        data1.push(Number(Number(obj.price).toFixed(2)))
      })
      let newState = JSON.parse(JSON.stringify(this.state))
      newState.reports[0].series[0].data = data1.slice(0, 10)
      this.setState(newState)
    })
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          {/*<MetaTags>
            <title>Crypto Dashboard | Skote - React Admin & Dashboard Template</title>
          </MetaTags>*/}
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs title="Dashboards" breadcrumbItem="SPREAD TRACKER" />
            <Row>
              {/* card user */}
              {/*<CardUser />*/}

              <Col xl="10">
                {/* card welcome */}
                <CardWelcome />

                <Row>
                  {/* mini widgets */}
                  <MiniWidget reports={this.state.reports} />
                </Row>
              </Col>
            </Row>

            <Row>
              {/* wallet balance
              <WalletBalance />*/}

              {/* overview
              <OverView />*/}
            </Row>

            <Row >
            <SpreadTracker />
            </Row>

            {/*<Row>
               transactions
              <Transactions />

              {/* notifications
              <Notifications />

               buy sell
              <BuySell />
            </Row>*/}
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

export default Dashboard
