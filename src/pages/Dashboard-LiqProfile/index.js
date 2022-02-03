import React, { Component } from "react"
import { Container, Row, Col } from "reactstrap"
import MetaTags from 'react-meta-tags';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Import Components
import CardWelcome from "./card-welcome"
import AprTrackerShort from './liq-profile'
import historical from '../../api/v1/historical'

import dayjs from 'dayjs'


class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //selectedLongTicker: '',
      
    }
    //this.fetchAprData1= this.fetchAprData1.bind(this)
  }

  fetchAprData1() {

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
    historical.getHistoricalAstroAllinAprs(filters).then(apiData => {
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
    //this.fetchAprData3()
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs title="ALPHALABS" breadcrumbItem="Liquidation Nodes" />
            <Row>
              <Col xl="12">
                <CardWelcome />
              </Col>
            </Row>
            <Row>
            </Row>
            <Row >
            <AprTrackerShort />
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

export default Dashboard
