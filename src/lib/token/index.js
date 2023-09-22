const jwt = require('jsonwebtoken');

const accessTokenGenerator = ({payload,algorithm='HS256',secret = process.env.JWT_ACCESS_TOKEN_SECRET,expiresIn = '1h'}) =>{
    try {
        return jwt.sign(payload,secret,{algorithm,expiresIn})
    } catch (err) {
        console.log(err);
    };

};

const refreshTokenGenerator = (
    {
        payload,
        algorithm = 'HS256',
        secret = process.env.JWT_REFRESH__TOKEN_SECRET,
        expiresIn = '1d'
    }
)=>{
    try {
        return jwt.sign(payload,secret,{algorithm,expiresIn})
    } catch (err) {
        console.log(err)
    }
}

const decodeToken = ({token,algorithm}) =>{
    try {
       return jwt.decode(token,{algorithms:[algorithm]}) 
    } catch (err) {
        console.log(err)
    }
}

const verifyToken = ({
    token,
    algorithm = 'HS256',
    secret = process.env.JWT_ACCESS_TOKEN_SECRET
}) =>{
    try {
        return jwt.verify(token,secret,{algorithms:[algorithm]})
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    accessTokenGenerator,
    refreshTokenGenerator,
    decodeToken,
    verifyToken
}

