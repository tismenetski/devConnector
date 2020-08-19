import {combineReducers} from "redux";
import alert from './alert';
import auth from  './auth';
import profile from './profile';
import post from './post';
export default combineReducers({

    alert,
    auth,
    profile,
    post
});



//The reducers inside combineReducers are always shown inside the redux store,
// for example : the alert Reducer is empty but still shown as an empty array