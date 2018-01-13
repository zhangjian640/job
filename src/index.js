import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

import {applyMiddleware, compose, createStore} from "redux";

import App from './app'

import reducers from "./reducer";
import "./config";
import "./index.css";

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

ReactDOM.render(
  (<Provider store={store}>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
)