import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PageTemplate } from './component/PageTemplate';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/users" component={() => <PageTemplate></PageTemplate>} />
      </Switch>
    </Router>
  );
}

export default App;
