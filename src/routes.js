import React from 'react';
import {BrowserRouter,  Route,  Switch} from 'react-router-dom';

import Home from '././projects/Full/projects/Home/Home';
import Login from '././projects/Login/Login';
import Register from '././projects/Register/Register';
import NotFound from '././projects/NotFound/NotFound';


const Routes = () => (
  <BrowserRouter >
      <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="*" component={NotFound}/>
      </Switch>
  </BrowserRouter>
);

export default Routes;
