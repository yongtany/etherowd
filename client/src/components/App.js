import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  LandingPage,
  ListPage,
  ProjectPage,
  NewProjectPage,
  RequestPage,
  NewRequestPage
} from 'pages';


const PublicRoutes = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/projects" component={ListPage}/>
    <Route exact path="/project/new" component={NewProjectPage}/>
    <Route exact path="/project/:id" component={ProjectPage}/>
    <Route exact path="/project/:id/requests" component={RequestPage} />
    <Route exact path="/project/:id/requests/new" component={NewRequestPage} />
  </Switch>
);

const App = props => (
  <div>
    <PublicRoutes />
    <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
  </div>
);

export default App;
