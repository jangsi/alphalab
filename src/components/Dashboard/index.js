import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import { useIsOverflowLockContext } from '../../hooks/useIsOverflowLock'

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
  const [reports, setReports] = useState(props.reports);
  const overflowLockContext = useIsOverflowLockContext();
  const location = useLocation();
  useEffect(() => {
    // reset the overflow lock if the user navigates
    overflowLockContext.setIsOverflowLock(false);
  }, [location.pathname, location.search, location.hash]);

  // load dashboard apr reports
  useEffect(async () => {
    const reportData = []
    for (let i = 0; i < reports.length; i ++) {
      const report = reports[i];
      let formatter = props.widgetFormatter;
      if (typeof props.widgetFormatter(0) === 'function') {
        formatter = props.widgetFormatter(i);
      }
      const value = await fetchData(report, formatter, props.fieldKey);
      reportData.push({
        ...report,
        value
      });
    }
    setReports(reportData);
  }, []);

  // prevent scrolling on the page when in fullscreen mode
  const [styles, setStyles] = useState({});
  useEffect(() => {
    if (overflowLockContext.isOverflowLock) {
      setStyles({
        position: 'fixed',
        top: `${window.scrollY}px`,
      });
    } else {
      setStyles({
        position: '',
        top: '',
      });
    }
  }, [overflowLockContext.isOverflowLock]);

  return (
    <div style={styles} className="page-content">
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
  widgetFormatter: PropTypes.func,
  fieldKey: PropTypes.string,
}

export default Dashboard;
