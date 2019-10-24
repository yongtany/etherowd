import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContainer from 'containers/auth/AuthContainer';

import {
  LandingPage,
  ListPage,
  ProjectStoryPage,
  ProjectRankingPage,
  NewProjectPage,
  RequestPage,
  NewRequestPage
} from 'pages';


const PublicRoutes = () => (
  <div>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/projects" component={ListPage}/>
      <Route exact path="/project/:id" component={ProjectStoryPage}/>
    </Switch>
    <AuthContainer />
  </div>

);

const PrivateRoutes = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/projects" component={ListPage}/>
    <Route exact path="/project/new" component={NewProjectPage}/>
    <Route exact path="/project/:id" component={ProjectStoryPage}/>
    <Route exact path="/project/:id/investors" component={ProjectRankingPage}/>
    <Route exact path="/project/:id/requests" component={RequestPage} />
    <Route exact path="/project/:id/requests/new" component={NewRequestPage} />
  </Switch>
);

const App = props => (
  <div>
    {props.isLoggedIn ?
      <PrivateRoutes/>
     : <PublicRoutes />
     }
    <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
  </div>
);

export default App;
