import React from 'react';
import { Switch, Route } from "react-router-dom";

import Home from './pages/Home';
import Claim from './pages/Claim';

const App = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/claim" component={Claim} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
