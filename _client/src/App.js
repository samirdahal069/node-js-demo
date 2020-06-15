import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';


const Login = React.lazy(() => import('./components/login'));
const Admin = React.lazy(() => import('./dashboard/layouts/Admin'));

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;


class App extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/" name="Login Page" render={props => <Login {...props} />} />
            <Route path="/admin" component={Admin} />
          </Switch>
        </React.Suspense>

      </HashRouter>
    );
  }
}

export default App;
