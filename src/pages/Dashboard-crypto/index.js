import React, { Component } from "react"
import { Container, Row, Col } from "reactstrap"
import MetaTags from 'react-meta-tags';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Import Components
import CardWelcome from "./card-welcome"
import MiniWidget from "./mini-widget"
import SpreadTracker from './spread-tracker'
import mirrorGraphql from '../../api/v1/mirror-graphql'


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
          title: "mNFLX Oracle",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/NFLX.png",
          color: "warning",
          value: "",
          arrow: 'mdi-arrow-up text-success',
          series: [{ name: "mNFLX", data: []}],
          options: options1,
        },
        {
          title: "mAAPL Oracle",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/AAPL.png",
          color: "primary",
          arrow: 'mdi-arrow-down text-danger',
          value: "",
          series:  [{ name: "mAAPL", data: []}],
          options: options2,
        },
        {
          title: "mCOIN Oracle",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/COIN.png",
          color: "info",
          arrow: 'mdi-arrow-up text-success',
          value: "",
          series:  [{ name: "mCOIN", data: []}],
          options: options3,
        },
      ],
    }
    this.fetchData1 = this.fetchData1.bind(this)
  }

  fetchData1() {
    let currentTime = new Date().getTime()
    let filters = {
      from: currentTime - 87400000,
      to: currentTime - 300000,
      interval: 5,
      token: "terra1jsxngqasf2zynj5kyh0tgq9mj3zksa5gk35j4k",
    }
    mirrorGraphql.getSpreadData(filters).then(data => {
      let data1 = []
      data.asset.prices.oracleHistory.forEach(obj => {
        data1.push(Number(Number(obj.price).toFixed(2)))
      })
      let newState = JSON.parse(JSON.stringify(this.state))
      newState.reports[0].series[0].data = data1.slice(-10, -1)
      this.setState(newState)

      let newState2 = JSON.parse(JSON.stringify(this.state))
      newState2.reports[0].value = data1.slice(-2,-1)
      this.setState(newState2)


    })
  }

  fetchData2() {
    let currentTime = new Date().getTime()
    let filters = {
      from: currentTime - 87400000,
      to: currentTime - 300000,
      interval: 5,
      token: "terra1vxtwu4ehgzz77mnfwrntyrmgl64qjs75mpwqaz",
    }
    mirrorGraphql.getSpreadData(filters).then(data => {
      let data1 = []
      data.asset.prices.oracleHistory.forEach(obj => {
        data1.push(Number(Number(obj.price).toFixed(2)))
      })
      let newState = JSON.parse(JSON.stringify(this.state))
      newState.reports[1].series[0].data = data1.slice(-10, -1)
      this.setState(newState)

      let newState2 = JSON.parse(JSON.stringify(this.state))
      newState2.reports[1].value = data1.slice(-2,-1)
      this.setState(newState2)
    })
  }

  fetchData3() {
    let currentTime = new Date().getTime()
    let filters = {
      from: currentTime - 87400000,
      to: currentTime - 300000,
      interval: 5,
      token: "terra18wayjpyq28gd970qzgjfmsjj7dmgdk039duhph",
    }
    mirrorGraphql.getSpreadData(filters).then(data => {
      let data1 = []
      data.asset.prices.oracleHistory.forEach(obj => {
        data1.push(Number(Number(obj.price).toFixed(2)))
      })
      let newState = JSON.parse(JSON.stringify(this.state))
      newState.reports[2].series[0].data = data1.slice(-10, -1)
      this.setState(newState)

      let newState2 = JSON.parse(JSON.stringify(this.state))
      newState2.reports[2].value = data1.slice(-2,-1)
      this.setState(newState2)
    })
  }

  componentDidMount() {
    this.fetchData1()
    this.fetchData2()
    this.fetchData3()
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

              <Col xl="12">
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
