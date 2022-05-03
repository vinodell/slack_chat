import React, { Suspense } from 'react'
import { Provider, useSelector } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router/immutable'
import { Switch, Route, Redirect } from 'react-router-dom'

import store, { history } from '../redux'

import Login from '../components/login'
import Home from '../components/home'
import Startup from './startup'
import Regisrtation from '../components/registartion'

const OnlyAnonymousRoute = ({ component: Component, ...rest }) => {
  const { user, token } = useSelector((s) => s.auth)
  const func = (props) => {
    return !!user && !!token ? <Redirect to="/login" /> : <Component {...props} />
  }
  return <Route {...rest} render={func} />
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, token } = useSelector((s) => s.auth)
  const func = (props) => {
    return !!user && !!token ? <Component {...props} /> : <Redirect to="/login" />
  }
  return <Route {...rest} render={func} />
}

const Admin = React.lazy(() => import('../components/admin'))
const AdminSuspended = () => (
  <Suspense fallback="Loading...">
    <Admin />
  </Suspense>
)

const Root = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Startup>
          <Switch>
            <Route exact path="/" component={() => <Login />} />
            <Route exact path="/admin" component={() => <AdminSuspended />} />
            <OnlyAnonymousRoute exact path="/login" component={() => <Login />} />
            <OnlyAnonymousRoute exact path="/newuser" component={() => <Regisrtation />} />
            <PrivateRoute exact path="/home" component={() => <Home />} />
          </Switch>
        </Startup>
      </ConnectedRouter>
    </Provider>
  )
}

export default Root
