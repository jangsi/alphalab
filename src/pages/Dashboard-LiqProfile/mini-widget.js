import React, { Component } from "react"
import PropTypes from 'prop-types';
import { Row, Col, Card, CardBody } from "reactstrap"

import ReactApexChart from "react-apexcharts"

class MiniWidget extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <React.Fragment>
        {this.props.reports.map((report, key) => (
          <Col sm="4" key={key}>
          
              <CardBody>
                <div className="d-flex align-items-center mb-3">
                  <div className="p-1 avatar-xs me-3">
                    <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-20">
                      <img src={report.imageUrl} width="50" height="50" />{" "}
                    </span>
                  </div>
                  {report.title}{" "}
                </div>
                <Row>
                  <Col xs="4">
                    <h5>{report.value}</h5>
                  </Col>
                </Row>
              </CardBody>
   
          </Col>
        ))}
      </React.Fragment>
    )
  }
}

MiniWidget.propTypes = {
  reports: PropTypes.any
}


export default MiniWidget
