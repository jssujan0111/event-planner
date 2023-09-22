const User = require("../../model/User");

/**
 * 
 * @param {param} email 
 * if user found, return user
 * @returns {user}
 * if user not found, return false
 * @returns {false}
 */
const findUserByEmail = async (email) =>{
    const user = await User.findOne({email});
    return user ? user : false;
};

/**
 * 
 * @param {string} email 
 * If user exist, return true else return false
 * @returns { boolean } true or false
 */

const isUserExist = async (email) => {
	const user = await findUserByEmail(email);
	return user ? true : false;
};
/**
 * 
 * @param { object } user
 * @param { string } user.name
 * @param { string } name.email
 * @param { string } name.password
 * @returns { object } user
 * 
 */
const createUser = async({name, email,password}) => {
    const user = new User({name,email,password});
    await user.save();
    return {
        ...user._doc,
        id: user.id
    }
}


module.exports = {
    findUserByEmail,
    isUserExist,
    createUser
}
