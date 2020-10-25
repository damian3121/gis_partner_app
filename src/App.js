import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PageTemplate } from './component/PageTemplate';
import { Users } from './page/user/Users'
import { UsersMap } from './page/usersmap/UsersMap'
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <PageTemplate pageContent={Users()}></PageTemplate>} />
        <Route exact path="/users-map" component={() => <PageTemplate pageContent={UsersMap()}></PageTemplate>} />
      </Switch>
    </Router>
  );
}

export default App;
