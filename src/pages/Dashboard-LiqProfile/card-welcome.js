import React, { Component } from "react"
import { Row, Col, Card, Label } from "reactstrap"


class CardWelcome extends Component {
  render() {
    return (
      <React.Fragment>
        <Card>
          <div>
            <Row>
              <Col lg="9" sm="8">
                <div className="p-4">
                  <h5 className="text-primary">Liquidation Nodes</h5>
                  <p>Welcome Alpha Astronaut!</p>

                  <div className="text-muted">
                    <p className="mb-1">
                      <i className="mdi mdi-circle-medium align-middle text-primary me-1"/>{" "}
                      Analyze Loan Structure in RealTime
                    </p>
                    <p className="mb-1">
                      <i className="mdi mdi-circle-medium align-middle text-primary me-1"/>{" "}
                      Monitor the $ Value of Loans that Would be Liquidated at Each Luna Price Level
                    </p>
                    <p className="mb-3">
                      <i className="mdi mdi-circle-medium align-middle text-primary me-1"/>{" "}
                      Use Higher Loan Nodes as Support or Areas to Place Liquidatuion Bids at Higher Premiums
                    </p>
                    <p className="mb-1">
                    <Label className="control-label">*** HISTORICAL DATABASE STARTS 2/3/2022 ***</Label>
                    </p>
                    <Label className="control-label">*** REFRESH TO GET BACK TO LIVE PROFILE ***</Label>
                  </div>
                </div>
              </Col>
              <Col lg="3" sm="4" className="align-self-center">
                <div>
                  <img src="//alphadefi.fund/wp-content/uploads/2021/08/1359359-84.png" alt="" className="img-fluid d-block" />
                </div>
              </Col>
            </Row>
          </div>
        </Card>
      </React.Fragment>
    )
  }
}

export default CardWelcome