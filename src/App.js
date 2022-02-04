import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { connect } from "react-redux";

// Import Routes
import { authProtectedRoutes, publicRoutes } from "./routes/";
import AppRoute from "./routes/route";

// layouts
import VerticalLayout from "./components/VerticalLayout/";

// Import scss
import "./assets/scss/theme.scss";

import { IsFullscreenContext } from './hooks/useIsFullscreen';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFullscreen: false,
    };
    this.getLayout = this.getLayout.bind(this);
  }

  setFullscreen = (val) => {
    this.setState({ isFullscreen: val })
  }

  /**
   * Returns the layout
   */
  getLayout = () => {
    let layoutCls = VerticalLayout;
    return layoutCls;
  };

  render() {
    const Layout = this.getLayout();

    return (
      <IsFullscreenContext.Provider value={{ isFullscreen: this.state.isFullscreen, setIsFullscreen: this.setFullscreen }}>
        <Router>
          <Switch>
            {publicRoutes.map((route, idx) => (
              <AppRoute
                path={route.path}
                layout={Layout}
                component={route.component}
                key={idx}
                isAuthProtected={false}
              />
            ))}

            {authProtectedRoutes.map((route, idx) => (
              <AppRoute
                path={route.path}
                layout={Layout}
                component={route.component}
                key={idx}
                isAuthProtected={false}
                exact
              />
            ))}
          </Switch>
        </Router>
      </IsFullscreenContext.Provider>
    );
  }
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  };
};

App.propTypes = {
  layout: PropTypes.object,
};

export default connect(mapStateToProps, null)(App);
