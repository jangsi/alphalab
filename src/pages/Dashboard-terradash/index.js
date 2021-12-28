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
          title: "UST Market Cap ($)",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/UST.png",
          color: "warning",
          value: "",
          arrow: 'mdi-arrow-up text-success',
          series: [{ name: "UST Market Cap ($)", data: []}],
          options: options1,
        },
        {
          title: "UST Market Cap 7 Day Percent Change Percentile Rank",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/UST.png",
          color: "primary",
          arrow: 'mdi-arrow-down text-danger',
          value: "",
          series:  [{ name: "//whitelist.mirror.finance/images/UST.png", data: []}],
          options: options2,
        },
        {
          title: "UST Market Cap 1 Month Percent Change Percentile Rank",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/UST.png",
          color: "info",
          arrow: 'mdi-arrow-up text-success',
          value: "",
          series:  [{ name: "UST Market Cap 1 Month Percent Change Percentile Ranks", data: []}],
          options: options3,
        },
      ],
      reports2: [
        {
          title: "LUNA UST Market Cap Ratio",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/UST.png",
          color: "warning",
          value: "",
          arrow: 'mdi-arrow-up text-success',
          series: [{ name: "LUNA UST Market Cap Ratio", data: []}],
          options: options1,
        },
        {
          title: "LUNA UST Market Cap Ratio Percentile Rank",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/UST.png",
          color: "primary",
          arrow: 'mdi-arrow-down text-danger',
          value: "",
          series:  [{ name: "LUNA UST Market Cap Ratio Percentile Rank", data: []}],
          options: options2,
        },
        {
          title: "LUNA Staking Return Annualized",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/UST.png",
          color: "info",
          arrow: 'mdi-arrow-up text-success',
          value: "",
          series:  [{ name: "LUNA Staking Return Annualized", data: []}],
          options: options3,
        },
      ],
      reports3: [
        {
          title: "UST Market Cap 1 Month Percent Change Percentile Rank",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/UST.png",
          color: "warning",
          value: "",
          arrow: 'mdi-arrow-up text-success',
          series: [{ name: "UST Market Cap 1 Month Percent Change Percentile Rank", data: []}],
          options: options1,
        },
        {
          title: "LUNA 1 Week Return Percentile Rank",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/UST.png",
          color: "primary",
          arrow: 'mdi-arrow-down text-danger',
          value: "",
          series:  [{ name: "LUNA 1 Week Return Percentile Rank", data: []}],
          options: options2,
        },
        {
          title: "LUNA 1 Month Return Percentile Rank",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/UST.png",
          color: "info",
          arrow: 'mdi-arrow-up text-success',
          value: "",
          series:  [{ name: "LUNA 1 Month Return Percentile Rank", data: []}],
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
      ticker: 'UST Market Cap ($)',
      precision: precision,
    }
    historical.getHistoricalTerraDash(filters).then(apiData => {
      let formattedData = apiData
        .filter(obj => obj.value)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY HH:mm:ss'), Price: obj.value}
        })
        console.log(formattedData)
        let newState2 = JSON.parse(JSON.stringify(this.state))
        newState2.reports[0].value = Number(formattedData[formattedData.length-1].Price).toLocaleString('en-US', {maximumFractionDigits:2})
        this.setState(newState2)
    })
  }

  fetchAprData12() {

    let precision = 'day'
    let diff = 605800000
    // 604800000 = 7 days
    if (diff < 604800000) {
      precision = 'hour'
    }
    let filters = {
      ticker: 'LUNA UST Market Cap Ratio',
      precision: precision,
    }
    historical.getHistoricalTerraDash(filters).then(apiData => {
      let formattedData = apiData
        .filter(obj => obj.value)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY HH:mm:ss'), Price: obj.value}
        })
        console.log(formattedData)
        let newState2 = JSON.parse(JSON.stringify(this.state))
        newState2.reports2[0].value = Number(formattedData[formattedData.length-1].Price*1000000000).toLocaleString('en-US', {maximumFractionDigits:2})+' e-9'
        this.setState(newState2)
    })
  }

  fetchAprData13() {

    let precision = 'day'
    let diff = 605800000
    // 604800000 = 7 days
    if (diff < 604800000) {
      precision = 'hour'
    }
    let filters = {
      ticker: 'UST Market Cap 1 Month Percent Change Percentile Rank',
      precision: precision,
    }
    historical.getHistoricalTerraDash(filters).then(apiData => {
      console.log(apiData)
      let formattedData = apiData
        .filter(obj => obj.value)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY HH:mm:ss'), Price: obj.value}
        })
        console.log(formattedData)
        let newState2 = JSON.parse(JSON.stringify(this.state))
        newState2.reports3[0].value = Number(formattedData[formattedData.length-1].Price*100).toLocaleString('en-US', {maximumFractionDigits:2})+'%'
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
      ticker: 'UST Market Cap 7 Day Percent Change Percentile Rank',
      precision: precision,
    }
    historical.getHistoricalTerraDash(filters).then(apiData => {
      let formattedData = apiData
        .filter(obj => obj.value)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY HH:mm:ss'), Price: obj.value}
        })
        let newState2 = JSON.parse(JSON.stringify(this.state))
        newState2.reports[1].value = Number(formattedData[formattedData.length-1].Price*100).toLocaleString('en-US', {maximumFractionDigits:2})+'%'
        this.setState(newState2)
    })
  }

  fetchAprData22() {

    let precision = 'day'
    let diff = 605800000
    // 604800000 = 7 days
    if (diff < 604800000) {
      precision = 'hour'
    }
    let filters = {
      ticker: 'LUNA UST Market Cap Ratio Percentile Rank',
      precision: precision,
    }
    historical.getHistoricalTerraDash(filters).then(apiData => {
      let formattedData = apiData
        .filter(obj => obj.value)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY HH:mm:ss'), Price: obj.value}
        })
        let newState2 = JSON.parse(JSON.stringify(this.state))
        newState2.reports2[1].value = Number(formattedData[formattedData.length-1].Price*100).toLocaleString('en-US', {maximumFractionDigits:2})+'%'
        this.setState(newState2)
    })
  }

  fetchAprData23() {

    let precision = 'day'
    let diff = 605800000
    // 604800000 = 7 days
    if (diff < 604800000) {
      precision = 'hour'
    }
    let filters = {
      ticker: 'LUNA 1 Week Return Percentile Rank',
      precision: precision,
    }
    historical.getHistoricalTerraDash(filters).then(apiData => {
      let formattedData = apiData
        .filter(obj => obj.value)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY HH:mm:ss'), Price: obj.value}
        })
        let newState2 = JSON.parse(JSON.stringify(this.state))
        newState2.reports3[1].value = Number(formattedData[formattedData.length-1].Price*100).toLocaleString('en-US', {maximumFractionDigits:2})+'%'
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
      ticker: 'UST Market Cap 1 Month Percent Change Percentile Rank',
      precision: precision,
    }
    historical.getHistoricalTerraDash(filters).then(apiData => {
      let formattedData = apiData
        .filter(obj => obj.value)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY HH:mm:ss'), Price: obj.value}
        })
        let newState2 = JSON.parse(JSON.stringify(this.state))
        newState2.reports[2].value = Number(formattedData[formattedData.length-1].Price*100).toLocaleString('en-US', {maximumFractionDigits:2})+'%'
        this.setState(newState2)
    })
  }

  fetchAprData32() {

    let precision = 'day'
    let diff = 605800000
    // 604800000 = 7 days
    if (diff < 604800000) {
      precision = 'hour'
    }
    let filters = {
      ticker: 'LUNA Staking Return Annualized',
      precision: precision,
    }
    historical.getHistoricalTerraDash(filters).then(apiData => {
      let formattedData = apiData
        .filter(obj => obj.value)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY HH:mm:ss'), Price: obj.value}
        })
        let newState2 = JSON.parse(JSON.stringify(this.state))
        newState2.reports2[2].value = Number(formattedData[formattedData.length-1].Price*100).toLocaleString('en-US', {maximumFractionDigits:2})+'%'
        this.setState(newState2)
    })
  }

  fetchAprData33() {

    let precision = 'day'
    let diff = 605800000
    // 604800000 = 7 days
    if (diff < 604800000) {
      precision = 'hour'
    }
    let filters = {
      ticker: 'LUNA 1 Month Return Percentile Rank',
      precision: precision,
    }
    historical.getHistoricalTerraDash(filters).then(apiData => {
      let formattedData = apiData
        .filter(obj => obj.value)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY HH:mm:ss'), Price: obj.value}
        })
        let newState2 = JSON.parse(JSON.stringify(this.state))
        newState2.reports3[2].value = Number(formattedData[formattedData.length-1].Price*100).toLocaleString('en-US', {maximumFractionDigits:2})+'%'
        this.setState(newState2)
    })
  }


  componentDidMount() {
    this.fetchAprData1()
    this.fetchAprData12()
    this.fetchAprData13()
    this.fetchAprData2()
    this.fetchAprData22()
    this.fetchAprData23()
    this.fetchAprData3()
    this.fetchAprData32()
    this.fetchAprData33()
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
            <Breadcrumbs title="Dashboards" breadcrumbItem="TERRA CORE" />
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
                <Row>
                  {/* mini widgets */}
                  <MiniWidget reports={this.state.reports2} />
                </Row>
                <Row>
                  {/* mini widgets */}
                  <MiniWidget reports={this.state.reports3} />
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
