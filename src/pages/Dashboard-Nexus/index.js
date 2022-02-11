import React from 'react'

import AprTrackerShort from './apr-tracker-short';
import historical from '../../api/v1/historical';

import Dashboard from '../../components/Dashboard'

const DashboardNexus = () => {
  const reports = [
    {
      title: 'bLuna Vault APR',
      imageUrl: '//whitelist.mirror.finance/images/Luna.png',
      value: '',
      ticker: 'bLunaVaultApr',
      action: historical.getHistoricalNexus,
    },
    {
      title: 'Manual bLuna Vault APR',
      imageUrl: '//whitelist.mirror.finance/images/Luna.png',
      value: '',
      ticker: 'bLunaVaultManualApr',
      action: historical.getHistoricalNexus,
    },
    {
      title: 'bETH Vault APR',
      imageUrl: '//whitelist.mirror.finance/images/ETH.png',
      value: '',
      ticker: 'bEthVaultApr',
      action: historical.getHistoricalNexus,
    },
  ];

  return (
    <Dashboard
      title="Dashboards"
      breadcrumbItem="NEXUS PROTOCOL"
      headerProps={{
        title: 'Nexus Protocol',
        subTitle: 'Select Vault to Analyze',
        desc: 'View Historical Vault APRS',
        imgSrc: '//cdn-images-1.medium.com/fit/t/1600/480/1*u9vVW_EhurWnffRmVZibKA.png'
      }}
      reports={reports}
      aprTrackers={[AprTrackerShort]}
      widgetFormatter={(data) => {
        return Number(data.Price).toLocaleString('en-US', {maximumFractionDigits:2});
      }}
      fieldKey="value"
    />
  );
}

export default DashboardNexus;
