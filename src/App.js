import React, { Component } from 'react';
import { /*BrowserRouter*/ HashRouter as Router, Route, Switch } from 'react-router-dom';

import { inject, observer } from 'mobx-react';

import PrivateRoute from './components/PrivateRoute'
import MainNav from './components/MainNav'

import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import StatisticPage from './pages/StatisticPage'
import ContactPage from './pages/ContactPage'
import ContactDetails from './pages/ContactDetails'
import ContactEdit from './pages/ContactEdit'

import './App.css'
@inject('store')
@observer
class App extends Component {
  
  render() {
    return (
      <div className="app">
        <Router>
          <div>
            {this.props.store.userStore.user && <MainNav />}

            <div className="app-content">
              <Switch>
                <Route path="/signup" component={SignupPage} />
                <PrivateRoute path="/contacts/new" component={ContactEdit} />
                <PrivateRoute path="/contacts/edit/:id?" component={ContactEdit} />
                <PrivateRoute path="/contacts/:id" component={ContactDetails} />
                <PrivateRoute path="/contacts" component={ContactPage} />
                <PrivateRoute path="/statistics" component={StatisticPage} />
                <PrivateRoute exact path="/" component={HomePage} />  
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
