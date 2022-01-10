import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import PrivateRoute from '../common/PrivateRoute';
import NotFound from '../common/notfound'

// import Dashboard from '../App/Dashboard/Dashboard';
import Home from '../App/Home/index';
import Detail from '../App/Detail/index';

const Routes = (
    <div>
        <Switch>
            {/* <Route path="/login" exact strict component={Login} /> */}
           
            {/* <PrivateRoute path="/" exact strict component={Dashboard} /> */}
            {/* <Route path="/" exact strict component={Dashboard} /> */}
            <Route path="/" exact strict component={Home} />
            <Route path="/:id" exact strict component={Detail} />
           
            <Route component={NotFound}/>

        </Switch>
    </div>
)

export default Routes;