import React , { Fragment ,useEffect } from 'react';
import './App.css';
import  {BrowserRouter as Router , Route , Switch} from 'react-router-dom';
import Navbar from './component/layout/Navbar';
import Landing from './component/layout/Landing';
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import Dashboard from './component/dashboard/Dashboard';
import CreateProfile from './component/profile-form/CreateProfile';
import PrivateRoute from './component/routing/PrivateRoute';
import EditProfile from './component/profile-form/EditProfile';
import AddExperience from './component/profile-form/AddExperience';
import AddEducation from './component/profile-form/AddEducation';
import Profiles from './component/profiles/Profiles';
import Profile from './component/profile/Profile';
import Posts from './component/posts/Posts';
import Post from './component/post/Post';
//Redux
import {Provider} from 'react-redux'; //Connects react to redux
import store from './store'; //Import the store
import Alert from './component/layout/Alert';
import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  //What does useEffect do? By using this Hook, you tell React that your component needs to do something after render.
  // React will remember the function you passed (we’ll refer to it as our “effect”),
  // and call it later after performing the DOM updates. In this effect, we set the document title,
  // but we could also perform data fetching or call some other imperative API.
  useEffect(() =>{ 
    store.dispatch(loadUser()); // loaduser -> the function useEffect calls , the empty array is a 2nd parameter that tells this function to run only once
  }, []);

  return (
<Provider store={store}>
  <Router>
    <Fragment>
      <Navbar /> { /*Navbar Always Exists*/}
      <Route exact path="/" component = {Landing} />
      <section className="container">
        <Alert/> {/*We place the Alert component here so that in case of an error it will render on the screen*/}
        <Switch>
          <Route exact path='/register' component = {Register} />
          <Route exact path='/login' component = {Login} />
          <Route exact path='/profiles' component = {Profiles} />
          <Route exact path='/profile/:id' component = {Profile} />
          <PrivateRoute exact path='/dashboard' component = {Dashboard} /> {/*Using the login inside PrivateRoute we either show the dashboard or redirect the user to the login page  */}
          <PrivateRoute exact path='/create-profile' component = {CreateProfile}/>
          <PrivateRoute exact path='/edit-profile' component = {EditProfile}/>
          <PrivateRoute exact path='/add-experience' component = {AddExperience}/>
          <PrivateRoute exact path='/add-education' component = {AddEducation}/>
          <PrivateRoute exact path='/posts' component = {Posts}/>
          <PrivateRoute exact path='/posts/:id' component = {Post}/>
          </Switch>
      </section>
    </Fragment>
  </Router>
</Provider>
)};




export default App;
