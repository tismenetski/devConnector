import React , { Fragment } from 'react';
import './App.css';
import  {BrowserRouter as Router , Route , Switch} from 'react-router-dom';
import Navbar from './component/layout/Navbar';
import Landing from './component/layout/Landing';
import Login from './component/auth/Login';
import Register from './component/auth/Register';


const App = () => (
  <Router>
  <Fragment>
  <Navbar /> { /*Navbar Always Exists*/}
  <Route exact path="/" component = {Landing} />
  <section className="container">
  <Switch>
    <Route exact path='/register' component = {Register} />
    <Route exact path='/login' component = {Login} />
  </Switch>
  </section>
  </Fragment>
  </Router>
);




export default App;
