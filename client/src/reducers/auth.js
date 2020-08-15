import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from "../actions/types";

const initialState = {
    token : localStorage.getItem('token'),
    isAuthenticated : null, // Checks if the user already been Authenticated
    loading : true , //Loading will be set to false once we send a request to the server, this way we can validate if the request already been processed or not
    user : null // The user that is currently Connected
}

export default function (state = initialState , action) {

    const {type , payload} = action;
    switch (type) {

        case REGISTER_SUCCESS:
            localStorage.setItem('token',payload.token);
            return {...state,
                ...payload,
                isAuthenticated: true,
                loading: false}
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return{...state,
                token : null,
                isAuthenticated: false,
                loading: false}
        case USER_LOADED : 
                return{
                    ...state,
                    isAuthenticated : true,
                    loading : false,
                    user: payload
                }

        case AUTH_ERROR : 
        localStorage.removeItem('token');
        return{...state,
            token : null,
            isAuthenticated: false,
            loading: false}

        case LOGIN_SUCCESS: //Does exactly what REGISTER_SUCCESS does -> for now keeping them seperate
            localStorage.setItem('token',payload.token);
            return {...state,
                ...payload,
                isAuthenticated: true,
                loading: false}
        case LOGIN_FAIL: //Does exactly what REGISTER_FAIL does -> for now keeping them seperate
            localStorage.removeItem('token');
            return{...state,
                token : null,
                isAuthenticated: false,
                loading: false}
        case LOGOUT: //Does exactly what REGISTER_FAIL does -> for now keeping them seperate
            localStorage.removeItem('token');
            return{...state,
                token : null,
                isAuthenticated: false,
                loading: false}
        default:
            return state;

    }
}