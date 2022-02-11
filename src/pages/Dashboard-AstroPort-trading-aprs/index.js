import React from 'react'

import AprTrackerShort from './apr-tracker-short';
import historical from '../../api/v1/historical';

import Dashboard from '../../components/Dashboard'

const DashboardAstroTradingAprs = () => {
  const reports = [
    {
      title: 'LUNA-UST',
      imageUrl: '//assets.terra.money/icon/60/Luna.png',
      value: '',
      ticker: 'LUNA-UST',
      action: historical.getHistoricalAstroCommAprs,
    },
    {
      title: 'PSI-UST',
      imageUrl: '//whitelist.anchorprotocol.com/logo/bLUNA.png',
      value: '',
      ticker: 'PSI-UST',
      action: historical.getHistoricalAstroCommAprs,
    },
    {
      title: 'ANC-UST',
      imageUrl: '//alphadefi.fund/wp-content/uploads/2022/01/anch-logo.png',
      value: '',
      ticker: 'ANC-UST',
      action: historical.getHistoricalAstroCommAprs,
    },
  ];

  return (
    <Dashboard
      title="Dashboards"
      breadcrumbItem="AstroPort"
      headerProps={{
        title: 'AstroPort',
        subTitle: 'Select Pool to Analyze',
        desc: 'View Historical Vault APRs',
        imgSrc: '//alphadefi.fund/wp-content/uploads/2022/01/Astroport-FI-1024x538-1.jpeg'
      }}
      reports={reports}
      aprTrackers={[AprTrackerShort]}
      widgetFormatter={(data) => {
        return Number(data.Price*100).toLocaleString('en-US', {maximumFractionDigits:2})+'%';
      }}
      fieldKey="apr"
    />
  );
}

export default DashboardAstroTradingAprs;
