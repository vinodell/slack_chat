import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from '../redux/index'
import MainPage from '../components/main_page'

const Root = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact fpath="/" component={() => <MainPage />} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default Root
