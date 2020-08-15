const express = require('express');
const router = express.Router();
const { check,validationResult } = require('express-validator'); //Changed from 'express-validator/check' since it was deprecated
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


//@route    POST api/users
//@desc     Register user
//@access   Public
router.post('/',[
    check('name','Name is required').not().isEmpty(), // Make sure the name field is not empty
    check('email','Valid email is required').isEmail(), //Make sure this field is an email
    check('password','Please enter a password with 6 or more characters').isLength({min:6}) // field password is at least 6 chars long
],
 async (req,res)=>{
    console.log(req.body);
    const errors = validationResult(req); //we run the function validationResult that populates errors variable with possible errors
    if(!errors.isEmpty()){ //if errors is not empty return 400 code with the errors array
        console.log("INSIDE USERS POST ROUTER NODEJS");
        return res.status(400).json({errors: errors.array()}); // 400 - Bad Request -send back array of errors
    }

    const  {name, email, password} = req.body;
    try {
        
        //See if user exists
        let user = await User.findOne({email});

        if(user){
           return res.status(400).json({errors : [{msg: 'User already exists'}] });
        }

        //Get the avatar image of the user
        const avatar = gravatar.url(email,{
            s: '200',
            r:'pg',
            d:'mm'
        });

        //Create new user instance and assign it with values 
        user = new User({
            name,
            email,
            avatar,
            password
        });

        //Encrypt password
        const salt = await bcrypt.genSalt(10); //Everything that returns a promise should be written with await 
        user.password = await bcrypt.hash(password,salt); //Hashing the password using user password and the salt

        await user.save(); //Save the user to the database

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn: '5 days'},
             (err,token) => {
                if(err) throw err;
                res.json({token});
            });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }

});


module.exports = router;