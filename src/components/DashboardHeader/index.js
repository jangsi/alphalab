import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card } from 'reactstrap';

const DashboardHeader = (props) => (
  <Card>
    <div>
      <Row>
        <Col lg="9" sm="8">
          <div className="p-4">
            <h5 className="text-primary">{props.title}</h5>
            <p>Welcome Alpha Astronaut!</p>

            <div className="text-muted">
              <p className="mb-1">
                <i className="mdi mdi-circle-medium align-middle text-primary me-1"/>{" "}
                {props.subTitle}
              </p>
              <p className="mb-1">
                <i className="mdi mdi-circle-medium align-middle text-primary me-1"/>{" "}
                {props.desc}
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
            <img src={props.imgSrc} alt="" className="img-fluid d-block" />
          </div>
        </Col>
      </Row>
    </div>
  </Card>
);

DashboardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
}

export default DashboardHeader;