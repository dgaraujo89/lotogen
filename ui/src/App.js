import React from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import GeraJogos from './views/GeraJogos';
import { CssBaseline } from '@material-ui/core';

function App() {
  return (
    <CssBaseline>
      <Router>
        <div>
          <Switch>
            <Route path="/" exact>
              <GeraJogos />
            </Route>
          </Switch>
        </div>
      </Router>
    </CssBaseline>
  );
}

export default App;
