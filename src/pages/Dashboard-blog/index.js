import React, { useState, useEffect } from "react"
import { Container, Row, Col } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Import Components
import CardWelcome from "./card-welcome"
import MiniWidget from "./mini-widget"
import AprTrackerShort from './apr-tracker-short'
import historical from '../../api/v1/historical'

import dayjs from 'dayjs'
import { useIsOverflowLockContext } from '../../hooks/useIsOverflowLock';

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

const Dashboard = () => {
  const [reports, setReports] = useState([
    {
      title: "mNFLX-UST APR",
      icon: "mdi mdi-email-open",
      imageUrl: "//whitelist.mirror.finance/images/NFLX.png",
      color: "warning",
      value: "",
      arrow: 'mdi-arrow-up text-success',
      series: [{ name: "mNFLX", data: []}],
      options: options1,
    },
    {
      title: "mAAPL-UST APR",
      icon: "mdi mdi-email-open",
      imageUrl: "//whitelist.mirror.finance/images/AAPL.png",
      color: "primary",
      arrow: 'mdi-arrow-down text-danger',
      value: "",
      series:  [{ name: "mAAPL", data: []}],
      options: options2,
    },
    {
      title: "mCOIN-UST APR",
      icon: "mdi mdi-email-open",
      imageUrl: "//whitelist.mirror.finance/images/COIN.png",
      color: "info",
      arrow: 'mdi-arrow-up text-success',
      value: "",
      series:  [{ name: "mCOIN", data: []}],
      options: options3,
    },
  ]);

  const fetchAprData1 = () => {
    let precision = 'day'
    let diff = 605800000
    // 604800000 = 7 days
    if (diff < 604800000) {
      precision = 'hour'
    }
    let filters = {
      ticker: 'mNFLX-UST',
      precision: precision,
    }
    historical.getHistoricalCommAprs(filters).then(apiData => {
      let formattedData = apiData
        .filter(obj => obj.apr)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY HH:mm:ss'), Price: obj.apr}
        })
        console.log(formattedData)
        const newReports = [...reports];
        newReports[0].value = String(Number(formattedData[formattedData.length-1].Price *100).toFixed(2)) + '%'
        setReports(newReports)
    })
  }

  const fetchAprData2 = () => {
    let precision = 'day'
    let diff = 605800000
    // 604800000 = 7 days
    if (diff < 604800000) {
      precision = 'hour'
    }
    let filters = {
      ticker: 'mAAPL-UST',
      precision: precision,
    }
    historical.getHistoricalCommAprs(filters).then(apiData => {
      let formattedData = apiData
        .filter(obj => obj.apr)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY HH:mm:ss'), Price: obj.apr}
        })
        const newReports = [...reports];
        newReports[1].value = String(Number(formattedData[formattedData.length-1].Price *100).toFixed(2)) + '%'
        setReports(newReports)
    })
  }

  const fetchAprData3 = () => {
    let precision = 'day'
    let diff = 605800000
    // 604800000 = 7 days
    if (diff < 604800000) {
      precision = 'hour'
    }
    let filters = {
      ticker: 'mCOIN-UST',
      precision: precision,
    }
    historical.getHistoricalCommAprs(filters).then(apiData => {
      let formattedData = apiData
        .filter(obj => obj.apr)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY HH:mm:ss'), Price: obj.apr}
        })
        const newReports = [...reports];
        newReports[2].value = String(Number(formattedData[formattedData.length-1].Price *100).toFixed(2)) + '%'
        setReports(newReports)
    })
  }

  useEffect(() => {
    fetchAprData1()
    fetchAprData2()
    fetchAprData3()
  }, []);

  // prevent scrolling on the page when in fullscreen mode
  const overflowLock = useIsOverflowLockContext();
  const [styles, setStyles] = useState({});
  useEffect(() => {
    if (overflowLock.isOverflowLock) {
      setStyles({
        position: 'fixed',
        top: `${window.scrollY}px`,
      })
    } else {
      setStyles({
        position: '',
        top: '',
      })
    }
  }, [overflowLock.isOverflowLock])

  return (
    <React.Fragment>
      <div style={styles} className="page-content">
        {/*<MetaTags>
          <title>Crypto Dashboard | Skote - React Admin & Dashboard Template</title>
        </MetaTags>*/}
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Dashboards" breadcrumbItem="TERRASWAP" />
          <Row>
            {/* card user */}
            {/*<CardUser />*/}

            <Col xl="12">
              {/* card welcome */}
              <CardWelcome />

              <Row>
                {/* mini widgets */}
                <MiniWidget reports={reports} />
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
  );
}

export default Dashboard
