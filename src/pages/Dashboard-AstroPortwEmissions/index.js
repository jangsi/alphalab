import React from 'react'

import AprTrackerShort from './apr-tracker-short';
import historical from '../../api/v1/historical';

import Dashboard from '../../components/Dashboard'

const DashboardAstroWithEmissions = () => {
  const reports = [
    {
      title: 'LUNA-UST w Astro Emissions',
      imageUrl: '//assets.terra.money/icon/60/Luna.png',
      value: '',
      ticker: 'LUNA-UST',
      action: historical.getHistoricalAstroAllinAprs,
    },
    {
      title: 'PSI-UST w Astro Emissions',
      imageUrl: '//whitelist.anchorprotocol.com/logo/bLUNA.png',
      value: '',
      ticker: 'PSI-UST',
      action: historical.getHistoricalAstroAllinAprs,
    },
    {
      title: 'ANC-UST w Astro Emissions',
      imageUrl: '//alphadefi.fund/wp-content/uploads/2022/01/anch-logo.png',
      value: '',
      ticker: 'ANC-UST',
      action: historical.getHistoricalAstroAllinAprs,
    },
  ];

  return (
    <Dashboard
      title="Dashboards"
      breadcrumbItem="AstroPort APRs With Emissions"
      headerProps={{
        title: 'AstroPort APRs With Emissions',
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

export default DashboardAstroWithEmissions;
