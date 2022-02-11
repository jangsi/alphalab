import React from "react";
import { Redirect } from "react-router-dom";

import Dashboard from "../pages/Dashboard/index";
import DashboardSaas from "../pages/Dashboard-saas/index";
import DashboardCrypto from "../pages/Dashboard-crypto/index";
import DashboardTerraSwapApr from "../pages/Dashboard-terraswap-apr";
import DashboardTerraSwapTlvs from "../pages/Dashboard-terraswap-tlvs/index";
import DashboardAnchor from "../pages/Dashboard-Anchor/index";
import DashboardNexus from "../pages/Dashboard-Nexus/index";
import DashboardAstroTradingAprs from "../pages/Dashboard-AstroPort-trading-aprs/index";
import DashboardAstroWithEmissions from "../pages/Dashboard-AstroPortwEmissions/index";
import DashboardTerra from "../pages/Dashboard-terradash/index";
import DashboardFarmers from "../pages/Dashboard-FarmersMarket/index";
import DashboardLiqProfile from "../pages/Dashboard-LiqProfile/index";

// FeeStation
import FeeStationLong from "../pages/FeeStation/fee-station-long";
import FeeStationShort from "../pages/FeeStation/fee-station-short";
import Pages404 from "../pages/Utility/pages-404";
import Pages500 from "../pages/Utility/pages-500";

const authProtectedRoutes = [
  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/pages-404", component: Pages404 },
  { path: "/pages-500", component: Pages500 },

  // moved from  private
  { path: "/dashboard", component: Dashboard },
  { path: "/mirror-aprs", component: DashboardSaas },
  { path: "/terradash", component: DashboardTerra },
  { path: "/terra-pool-aprs", component: DashboardTerraSwapApr },
  { path: "/terra-pool-tlvs", component: DashboardTerraSwapTlvs },
  { path: "/anchor", component: DashboardAnchor },
  { path: "/nexus", component: DashboardNexus },
  { path: "/astro-pool-aprs", component: DashboardAstroTradingAprs },
  {
    path: "/astro-pool-aprs-emissions",
    component: DashboardAstroWithEmissions,
  },
  { path: "/spread-tracker", component: DashboardCrypto },
  { path: "/fee-station-long", component: FeeStationLong },
  { path: "/fee-station-short", component: FeeStationShort },
  { path: "/farmers-market", component: DashboardFarmers },
  { path: "/liq-profile", component: DashboardLiqProfile },
];

export { authProtectedRoutes, publicRoutes };
