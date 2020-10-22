import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PageTemplate } from './component/PageTemplate';
import { Users } from './page/user/Users'
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/users" component={() => <PageTemplate pageContent={Users()}></PageTemplate>} />
      </Switch>
    </Router>
  );
}

export default App;
