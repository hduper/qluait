const jwt = require("jsonwebtoken");
require('dotenv').config();



function jwtGen(userid){
    const payload = {
        user: userid
    }

    return jwt.sign(payload, process.env.jwtSecret,{expiresIn: "1hr"});

}

module.exports = jwtGen;