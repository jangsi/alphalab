import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { BrowserRouter } from "react-router-dom"
import "./i18n"

import { Provider } from "react-redux"

import store from "./store"

// google analytics
import ReactGA from 'react-ga'
ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID)
ReactGA.pageview(window.location.pathname + window.location.search)

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById("root"))
serviceWorker.unregister()
