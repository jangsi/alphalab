import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';

//Import Breadcrumb
import Breadcrumbs from '../Common/Breadcrumb';

//Import Components
import DashboardHeader from '../DashboardHeader';
import MiniWidget from '../MiniWidget';

import AprTracker from './apr-tracker'
import AprTrackerShort from './apr-tracker-short'

import { fetchAprData } from './fetchAprData';

const Dashboard = (props) => {
  const [reports, setReports] = useState(props.reports)

  // load dashboard apr reports
  useEffect(async () => {
    const reportData = []
    for (let i = 0; i < reports.length; i ++) {
      const report = reports[i];
      const value = await fetchAprData(report);
      reportData.push({
        ...report,
        value
      });
    }
    setReports(reportData);
  }, []);

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Dashboards" breadcrumbItem="MIRROR APRS" />
        <Row>
          <Col xl="12">
            <DashboardHeader />
            <Row>
              <MiniWidget reports={reports} />
            </Row>
          </Col>
        </Row>
        <Row >
          <AprTracker />
        </Row>
        <Row >
          <AprTrackerShort />
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;