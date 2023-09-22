const tokenService = require('../lib/token');
const userService = require('../lib/user');
const {authenticationError} = require('../utils/error')

const checkAuthenticate = async(req,_res,next) =>{
    if(!req.headers){
       throw new Error('No Headers')
    }
    const token = req.headers.authorization.split(' ')[1];
    
    try {
        const decoded = tokenService.verifyToken({token});
        
        const user = await userService.findUserByEmail(decoded.email);
        
        if(!user){
            next(authenticationError('user authentication failed,login required'));
        };
        req.user = {...user._doc,id: user.id};
        next()
    } catch (err) {
        next(authenticationError())
    };
};


module.exports = checkAuthenticate;