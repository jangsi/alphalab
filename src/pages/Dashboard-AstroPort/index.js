import React, { Component } from "react"
import { Container, Row, Col } from "reactstrap"
import MetaTags from 'react-meta-tags';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Import Components
import CardWelcome from "./card-welcome"
import MiniWidget from "./mini-widget"
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
          title: "LUNA-UST",
          icon: "mdi mdi-email-open",
          imageUrl: "//assets.terra.money/icon/60/Luna.png",
          color: "warning",
          value: "",
          arrow: 'mdi-arrow-up text-success',
          series: [{ name: "LUNA-UST APR", data: []}],
          options: options1,
        },
        {
          title: "PSI-UST",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.anchorprotocol.com/logo/bLUNA.png",
          color: "primary",
          arrow: 'mdi-arrow-down text-danger',
          value: "",
          series:  [{ name: "PSI-UST", data: []}],
          options: options2,
        },
        {
          title: "ANC-UST",
          icon: "mdi mdi-email-open",
          imageUrl: "//alphadefi.fund/wp-content/uploads/2022/01/anch-logo.png",
          color: "info",
          arrow: 'mdi-arrow-up text-success',
          value: "",
          series:  [{ name: "ANC-UST", data: []}],
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
      ticker: 'LUNA-UST',
      precision: precision,
    }
    historical.getHistoricalAstroCommAprs(filters).then(apiData => {
      let formattedData = apiData
        .filter(obj => obj.apr)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY HH:mm:ss'), Price: obj.apr}
        })
        console.log(formattedData)
        //1
        let newState2 = JSON.parse(JSON.stringify(this.state))
        newState2.reports[0].value = Number(formattedData[formattedData.length-1].Price*100).toLocaleString('en-US', {maximumFractionDigits:2})+'%'
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
      ticker: 'LUNA-bLUNA',
      precision: precision,
    }
    historical.getHistoricalAstroCommAprs(filters).then(apiData => {
      let formattedData = apiData
        .filter(obj => obj.apr)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY HH:mm:ss'), Price: obj.apr}
        })
        //2
        let newState2 = JSON.parse(JSON.stringify(this.state))
        newState2.reports[1].value = Number(formattedData[formattedData.length-1].Price*100).toLocaleString('en-US', {maximumFractionDigits:2})+'%'
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
      ticker: 'ANC-UST',
      precision: precision,
    }
    historical.getHistoricalAstroCommAprs(filters).then(apiData => {
      let formattedData = apiData
        .filter(obj => obj.apr)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY HH:mm:ss'), Price: obj.apr}
        })
        //3
        console.log(formattedData)
        let newState2 = JSON.parse(JSON.stringify(this.state))
        newState2.reports[2].value = Number(formattedData[formattedData.length-1].Price*100).toLocaleString('en-US', {maximumFractionDigits:2})+'%'
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
            <Breadcrumbs title="Dashboards" breadcrumbItem="AstroPort" />
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
