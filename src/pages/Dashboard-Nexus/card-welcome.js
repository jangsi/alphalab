import React, { Component } from "react"
import { Row, Col, Card } from "reactstrap"

//Import Image
import features from "../../assets/images/crypto/features-img/img-2.png"

class CardWelcome extends Component {
  render() {
    return (
      <React.Fragment>
        <Card>
          <div>
            <Row>
              <Col lg="9" sm="8">
                <div className="p-4">
                  <h5 className="text-primary">Nexus Protocol</h5>
                  <p>Welcome Alpha Astronaut!</p>

                  <div className="text-muted">
                    <p className="mb-1">
                      <i className="mdi mdi-circle-medium align-middle text-primary me-1"/>{" "}
                      Select Vault to Analyze
                    </p>
                    <p className="mb-1">
                      <i className="mdi mdi-circle-medium align-middle text-primary me-1"/>{" "}
                      View Historical Vault APRs
                    </p>
                    <p className="mb-0">
                      <i className="mdi mdi-circle-medium align-middle text-primary me-1"/>{" "}
                      Locate Trading Opportunities
                    </p>
                  </div>
                </div>
              </Col>
              <Col lg="3" sm="4" className="align-self-center">
                <div>
                  <img src="//cdn-images-1.medium.com/fit/t/1600/480/1*u9vVW_EhurWnffRmVZibKA.png" alt="" className="img-fluid d-block" />
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