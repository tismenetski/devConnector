import {combineReducers} from "redux";
import alert from './alert';
import auth from  './auth';
export default combineReducers({

    alert,
    auth
});



//The reducers inside combineReducers are always shown inside the redux store,
// for example : the alert Reducer is empty but still shown as an empty array