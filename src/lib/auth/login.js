const { findUserByEmail } = require('../user/index');
const { hashedMatch } = require('../../utils/hashing')
const { badRequest } = require('../../utils/error');
const { accessTokenGenerator } = require('../token');

const login = async ({email,password}) =>{
    const user = await findUserByEmail(email)
    if(!user){
        throw badRequest('invalid credentials');
        // throw new Error('invalid credentials')
    };
    const matched = await hashedMatch(password,user.password);
    if(!matched){
        throw badRequest('invalid request');
    };

    const payload = {
        id: user.id,
        name: user.name,
        email: user.email
    };

    return accessTokenGenerator({payload})

}

module.exports = login;