import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from '../redux/index'

import MainPage from '../components/main_page'
import Home from '../components/home'

const Root = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={() => <MainPage />} />
          <Route exact path="/home" component={() => <Home />} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default Root
