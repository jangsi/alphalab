import React, { useState, useEffect } from 'react'

import AprTrackerShort from './apr-tracker-short';
import historical from '../../api/v1/historical';
import { useIsOverflowLockContext } from '../../hooks/useIsOverflowLock';
import Dashboard from '../../components/Dashboard'

const DashboardTerraSwapTlvs = () => {
  const reports = [
    {
      title: 'ANC-UST Liquidity',
      imageUrl: '//whitelist.mirror.finance/images/UST.png',
      value: '',
      ticker: 'ANC-UST',
      action: historical.getHistoricalTlvs,
    },
    {
      title: 'mAAPL-UST Liquidity',
      imageUrl: '//whitelist.mirror.finance/images/AAPL.png',
      value: '',
      ticker: 'mAAPL-UST',
      action: historical.getHistoricalTlvs,
    },
    {
      title: 'mCOIN-UST Liquidity',
      imageUrl: '//whitelist.mirror.finance/images/COIN.png',
      value: '',
      ticker: 'mCOIN-UST',
      action: historical.getHistoricalTlvs,
    },
  ];

  return (
    <Dashboard
      title="Dashboards"
      breadcrumbItem="POOL LIQUIDITY"
      headerProps={{
        title: 'Terra Liquidity',
        subTitle: 'Select Pool to Analyze',
        desc: 'View Historical Liquidity Data',
        imgSrc: '//alphadefi.fund/wp-content/uploads/2021/08/687474703a2f2f74657272612e6d6f6e65792f6c6f676f732f74657272615f6c6f676f2e737667.svg'
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

export default DashboardTerraSwapTlvs;
