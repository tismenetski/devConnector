import React, {Fragment,useState} from 'react';
import {Link,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setAlert} from "../../actions/alert";
import {register} from "../../actions/auth";
import PropTypes from 'prop-types';


const Register = ({setAlert,register,isAuthenticated}) => {


    const [formData,setFormData] = useState({
        name : '',
        email : '',
        password: '',
        password2: ''
    });

    const { name,email ,password, password2} = formData;

    //Function for updating state changes in fields
    const onChange  = e => setFormData({...formData,[e.target.name]: e.target.value});

    //Function for submitting form -> Also contains testing axios
    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2)
        {
            setAlert('Passwords do not match','danger');
        }
        else
        {
            register({name,email,password}); //This register calls action 'register' from /actions/auth.js
        }

    }

        //Redirect if logged in
        if(isAuthenticated){
            return <Redirect to="/dashboard" />
        }

    return (
        <Fragment>
            <section className="container">
                <h1 className="large text-primary">Sign Up</h1>
                <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
                <form className="form" onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} required/>
                    </div>
                    <div className="form-group">
                        <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required/>
                        <small className="form-text"
                        >This site uses Gravatar so if you want a profile image, use a
                            Gravatar email</small
                        >
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            minLength="6"
                            value={password} onChange={e => onChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="password2"
                            minLength="6"
                            value={password2} onChange={e => onChange(e)}
                        />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Register"/>
                </form>
                <p className="my-1">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </section>
        </Fragment>
    );
};

Register.propTypes = {
    setAlert : PropTypes.func.isRequired,
    register : PropTypes.func.isRequired,
    isAuthenticated : PropTypes.bool
}

//Get isAuthenticated from auth reducer  to this component
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

/*
The connect() function connects a React component to a Redux store.

It provides its connected component with the pieces of the data it needs from the store, and the functions it can use to dispatch actions to the store.

It does not modify the component class passed to it; instead, it returns a new, connected component class that wraps the component you passed in.
 */

export default connect(mapStateToProps,{setAlert, register}) (Register);
