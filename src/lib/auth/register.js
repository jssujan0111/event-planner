const { isUserExist, createUser } = require('../user/index');
const { badRequest } = require('../../utils/error')
const { generateHashed } = require('../../utils/hashing')
const register = async ({name,email,password}) =>{
    const userExist = await isUserExist(email)
    if(userExist){
        throw badRequest('user Already exist')
    }
    password = await generateHashed(password);
    const user = await createUser({name,email,password});
    return user;
}

module.exports = register;