import React, { useState, useEffect } from 'react'

import AprTrackerShort from './apr-tracker-short';
import historical from '../../api/v1/historical';
import { useIsOverflowLockContext } from '../../hooks/useIsOverflowLock';
import Dashboard from '../../components/Dashboard'

const DashboardTerraSwap = () => {
  const reports = [
    {
      title: "mNFLX-UST APR",
      imageUrl: "//whitelist.mirror.finance/images/NFLX.png",
      value: "",
      action: historical.getHistoricalCommAprs,
    },
    {
      title: "mAAPL-UST APR",
      imageUrl: "//whitelist.mirror.finance/images/AAPL.png",
      value: "",
      action: historical.getHistoricalCommAprs,
    },
    {
      title: "mCOIN-UST APR",
      imageUrl: "//whitelist.mirror.finance/images/COIN.png",
      value: "",
      action: historical.getHistoricalCommAprs,
    },
  ];

  // prevent scrolling on the page when in fullscreen mode
  const overflowLock = useIsOverflowLockContext();
  const [styles, setStyles] = useState({});
  useEffect(() => {
    if (overflowLock.isOverflowLock) {
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
  }, [overflowLock.isOverflowLock]);

  return (
    <Dashboard
      title="Dashboards"
      breadcrumbItem="MIRROR APRS"
      dashboardHeaderProps={{
        title: 'TERRASWAP',
        subTitle: 'Select Pool to Analyze',
        desc: 'View Historical APR Data',
        imgSrc: '//alphadefi.fund/wp-content/uploads/2021/08/687474703a2f2f74657272612e6d6f6e65792f6c6f676f732f74657272615f6c6f676f2e737667.svg'
      }}
      style={styles}
      reports={reports}
      aprTrackers={[AprTrackerShort]}
    />
  );
}

export default DashboardTerraSwap;
