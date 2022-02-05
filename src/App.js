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

import { IsOverflowLockContext } from './hooks/useIsOverflowLock';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOverflowLock: false,
    };
    this.getLayout = this.getLayout.bind(this);
  }

  setIsOverflowLock = (val) => {
    this.setState({ isOverflowLock: val })
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
      <IsOverflowLockContext.Provider value={{ isOverflowLock: this.state.isOverflowLock, setIsOverflowLock: this.setIsOverflowLock }}>
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
      </IsOverflowLockContext.Provider>
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
