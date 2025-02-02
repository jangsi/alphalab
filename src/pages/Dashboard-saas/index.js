import React, { Component } from "react"
import { Container, Row, Col } from "reactstrap"
import MetaTags from 'react-meta-tags';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Import Components
import CardWelcome from "./card-welcome"
import MiniWidget from "./mini-widget"
import AprTracker from './apr-tracker'
import AprTrackerShort from './apr-tracker-short'
import mirrorGraphql from '../../api/v1/mirror-graphql'
import historical from '../../api/v1/historical'

import dayjs from 'dayjs'

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
      selectedLongTicker: '',
      reports: [
        {
          title: "Current mNFLX Long APR",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/NFLX.png",
          color: "warning",
          value: "",
          arrow: 'mdi-arrow-up text-success',
          series: [{ name: "mNFLX", data: []}],
          options: options1,
        },
        {
          title: "Current mAAPL Long APR",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/AAPL.png",
          color: "primary",
          arrow: 'mdi-arrow-down text-danger',
          value: "",
          series:  [{ name: "mAAPL", data: []}],
          options: options2,
        },
        {
          title: "Current mCOIN Long APR",
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
    this.fetchAprData1= this.fetchAprData1.bind(this)
  }

fetchAprData1() {

    let precision = 'day'
    let diff = 605800000
    // 604800000 = 7 days
    if (diff < 604800000) {
      precision = 'hour'
    }
    let filters = {
      ticker: 'mNFLX',
      precision: precision,
    }
    historical.getHistoricalLongAprs(filters).then(apiData => {
      let formattedData = apiData
        .filter(obj => obj.apr)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY HH:mm:ss'), Price: obj.apr}
        })
        console.log(formattedData)
        let newState2 = JSON.parse(JSON.stringify(this.state))
        newState2.reports[0].value = String(Number(formattedData[formattedData.length-1].Price *100).toFixed(2)) + '%'
        this.setState(newState2)
    })
  }

  fetchAprData2() {

    let precision = 'day'
    let diff = 605800000
    // 604800000 = 7 days
    if (diff < 604800000) {
      precision = 'hour'
    }
    let filters = {
      ticker: 'mAAPL',
      precision: precision,
    }
    historical.getHistoricalLongAprs(filters).then(apiData => {
      let formattedData = apiData
        .filter(obj => obj.apr)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY HH:mm:ss'), Price: obj.apr}
        })
        let newState2 = JSON.parse(JSON.stringify(this.state))
        newState2.reports[1].value = String(Number(formattedData[formattedData.length-1].Price *100).toFixed(2)) + '%'
        this.setState(newState2)
    })
  }

  fetchAprData3() {

    let precision = 'day'
    let diff = 605800000
    // 604800000 = 7 days
    if (diff < 604800000) {
      precision = 'hour'
    }
    let filters = {
      ticker: 'mCOIN',
      precision: precision,
    }
    historical.getHistoricalLongAprs(filters).then(apiData => {
      let formattedData = apiData
        .filter(obj => obj.apr)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY HH:mm:ss'), Price: obj.apr}
        })
        let newState2 = JSON.parse(JSON.stringify(this.state))
        newState2.reports[2].value = String(Number(formattedData[formattedData.length-1].Price *100).toFixed(2)) + '%'
        this.setState(newState2)
    })
  }

  componentDidMount() {
    this.fetchAprData1()
    this.fetchAprData2()
    this.fetchAprData3()
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
            <Breadcrumbs title="Dashboards" breadcrumbItem="MIRROR APRS" />
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
            <AprTracker />
            </Row>
            <Row >
            <AprTrackerShort />
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
