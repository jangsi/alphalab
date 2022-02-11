import React, { useState, useEffect } from 'react'

import AprTrackerShort from './apr-tracker-short';
import historical from '../../api/v1/historical';
import { useIsOverflowLockContext } from '../../hooks/useIsOverflowLock';
import Dashboard from '../../components/Dashboard'

const DashboardTerraSwapApr = () => {
  const reports = [
    {
      title: 'mNFLX-UST APR',
      imageUrl: '//whitelist.mirror.finance/images/NFLX.png',
      value: '',
      ticker: 'mNFLX-UST',
      action: historical.getHistoricalCommAprs,
    },
    {
      title: 'mAAPL-UST APR',
      imageUrl: '//whitelist.mirror.finance/images/AAPL.png',
      value: '',
      ticker: 'mAAPL-UST',
      action: historical.getHistoricalCommAprs,
    },
    {
      title: 'mCOIN-UST APR',
      imageUrl: '//whitelist.mirror.finance/images/COIN.png',
      value: '',
      ticker: 'mCOIN-UST',
      action: historical.getHistoricalCommAprs,
    },
  ];

  return (
    <Dashboard
      title="Dashboards"
      breadcrumbItem="MIRROR APRS"
      headerProps={{
        title: 'TERRASWAP',
        subTitle: 'Select Pool to Analyze',
        desc: 'View Historical APR Data',
        imgSrc: '//alphadefi.fund/wp-content/uploads/2021/08/687474703a2f2f74657272612e6d6f6e65792f6c6f676f732f74657272615f6c6f676f2e737667.svg'
      }}
      reports={reports}
      aprTrackers={[AprTrackerShort]}
      widgetFormatter={(data) => {
        return `${String(Number(data.Price * 100).toFixed(2))}%`;
      }}
      fieldKey="apr"
    />
  );
}

export default DashboardTerraSwapApr;
