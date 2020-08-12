const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function(req,res,next) {

    //Get token from the header
    const token = req.header('x-auth-token'); //the header that posses the key

    //Check if no token
    if(!token){
        return res.status(401).json({msg: 'No token , authorization denied'}); // not authorized
    }

    //Verify token
    try {
        const decoded = jwt.verify(token,config.get('jwtSecret'));
        req.user = decoded.user; // if decoded is successful then we assign the req.user the user extracted from the token
        next(); //Call next function
    } catch (error) {
        res.status(401).json({msg: 'Token is not valid'});
    }
}