import React from 'react';
import PropTypes from 'prop-types';
import { Col, Card, CardBody } from 'reactstrap';

const MiniWidget = (props) => (
  <>
    {props.reports.map((report, key) => (
      <Col sm="4" key={key}>
        <Card>
          <CardBody>
            <div className="d-flex align-items-center mb-3">
              <div className="p-1 avatar-xs me-3">
                <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-20">
                  <img src={report.imageUrl} width="50" height="50" />{" "}
                </span>
              </div>
              {report.title}
            </div>
            <div className="text-muted mt-4">
              <h4>
                {report.value}{" "}
                <i className="mdi ms-1 text-success"/>
              </h4>
            </div>
          </CardBody>
        </Card>
      </Col>
    ))}
  </>
);

MiniWidget.propTypes = {
  reports: PropTypes.array,
};

export default MiniWidget;
