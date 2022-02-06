import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';

//Import Breadcrumb
import Breadcrumbs from '../Common/Breadcrumb';

//Import Components
import { DashboardHeader, DashboardHeaderProps } from '../DashboardHeader';
import MiniWidget from '../MiniWidget';

import { fetchData } from './fetchAprData';

// Initialize ChartJS for any child components that might use it
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = (props) => {
  const [reports, setReports] = useState(props.reports)

  // load dashboard apr reports
  useEffect(async () => {
    const reportData = []
    for (let i = 0; i < reports.length; i ++) {
      const report = reports[i];
      const value = await fetchData(report, props.widgetFormatter, props.fieldKey);
      reportData.push({
        ...report,
        value
      });
    }
    setReports(reportData);
  }, []);

  return (
    <div style={props.style} className="page-content">
      <Container fluid>
        <Breadcrumbs title={props.title} breadcrumbItem={props.breadcrumbItem} />
        <Row>
          <Col xl="12">
            <DashboardHeader {...props.headerProps} />
            <Row>
              <MiniWidget reports={reports} />
            </Row>
          </Col>
        </Row>
        {props.aprTrackers.map((Tracker, i) => <Tracker key={`${props.title}-tracker-${i}`} />)}
      </Container>
    </div>
  );
};

Dashboard.propTypes = {
  title: PropTypes.string,
  breadcrumbItem: PropTypes.string,
  reports: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    imgUrl: PropTypes.string,
    value: PropTypes.string,
    action: PropTypes.func,
  })),
  headerProps: PropTypes.shape(DashboardHeaderProps),
  aprTrackers: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.element, PropTypes.func])),
  style: PropTypes.object,
  widgetFormatter: PropTypes.func,
  fieldKey: PropTypes.string,
}

export default Dashboard;
