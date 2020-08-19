import axios from 'axios';
import {
    REGISTER_SUCCESS,REGISTER_FAIL,USER_LOADED,AUTH_ERROR,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT,CLEAR_PROFILE
} from "./types";
import {setAlert} from "./alert";
import setAuthToken from '../utils/setAuthToken';


//Load User

export const loadUser =  () => async dispatch => { 
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type : USER_LOADED,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type : AUTH_ERROR
        });
    }
}
//Register User

export const register = ({ name,email,password}) => async dispatch => {
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    };
    console.log(name,email,password);
    const body = JSON.stringify({name,email,password});

    try{
        const res =await axios.post('/api/users',body,config);

        dispatch({
            type:REGISTER_SUCCESS,
            payload : res.data //res.data is the token being sent to us back from the server
        });

        dispatch(loadUser());
        /*dispatch() is the method used to dispatch actions and trigger state changes to the store.
        react-redux is simply trying to give you convenient access to it.
        Note, however, that dispatch is not available on props if you do pass in actions to your connect function.
        In other words, in the code below, since I'm passing someAction to connect, dispatch() is no longer available on props.
        The benefit to this approach, however, is that you now have the "connected" action available on your props
        that will automatically be dispatched for you when you invoke it. */


    }catch (err) {
        const errors = err.response.data.errors;

        if (errors)
        {
            errors.forEach(error => dispatch(setAlert(error.msg,'danger'))); // in case we have errors we want to show them to the user using our setAlert
        }
        dispatch({
            type: REGISTER_FAIL
        });
    }
};




//Login User

export const login = (email,password) => async dispatch => {
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    };
    console.log(email,password);
    const body = JSON.stringify({email,password});

    try{
        const res =await axios.post('/api/auth',body,config);

        dispatch({
            type:LOGIN_SUCCESS,
            payload : res.data //res.data is the token being sent to us back from the server
        });

        dispatch(loadUser());
    }catch (err) {
        const errors = err.response.data.errors;

        if (errors)
        {
            errors.forEach(error => dispatch(setAlert(error.msg,'danger'))); // in case we have errors we want to show them to the user using our setAlert
        }
        dispatch({
            type: LOGIN_FAIL
        });
    }
};

//Logout  / Clear Profile
export const logout = () => dispatch =>{

    dispatch({
        type: CLEAR_PROFILE
    });
    dispatch({
        type: LOGOUT
    });
} 