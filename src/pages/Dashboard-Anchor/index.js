import React from 'react'

import AnchorDashboard from './AnchorDash';
import historical from '../../api/v1/historical';

import Dashboard from '../../components/Dashboard'

const DashboardAnchor = () => {
  const reports = [
    {
      title: 'depositAPR',
      imageUrl: '//whitelist.mirror.finance/images/UST.png',
      value: '',
      ticker: 'depositAPR',
      action: historical.getHistoricalAnchor,
    },
    {
      title: 'netApr',
      imageUrl: '//whitelist.mirror.finance/images/UST.png',
      value: '',
      ticker: 'netApr',
      action: historical.getHistoricalAnchor,
    },
    {
      title: 'bLunaSupply',
      imageUrl: '//whitelist.mirror.finance/images/Luna.png',
      value: '',
      ticker: 'bLunaSupply',
      action: historical.getHistoricalAnchor,
    },
  ];

  return (
    <Dashboard
      title="Dashboards"
      breadcrumbItem="ANCHOR PROTOCOL"
      headerProps={{
        title: 'Anchor Protocol Data',
        subTitle: 'Select TimeSeries To Analyze',
        desc: 'Visualize Historical Trends',
        imgSrc: '//pbs.twimg.com/media/E1J63l8VUAML6XD?format=png&name=4096x4096'
      }}
      reports={reports}
      aprTrackers={[AnchorDashboard]}
      widgetFormatter={(index) => (data) => {
        if (index < 2) {
          return Number(data.Price*100).toLocaleString('en-US', {maximumFractionDigits:2})+'%';
        }
        return String(Number(data.Price /1000000).toFixed(2)) + ' M';
      }}
      fieldKey="value"
    />
  );
}

export default DashboardAnchor;
