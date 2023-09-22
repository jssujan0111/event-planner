const authService = require('../../../../lib/auth');
const { accessTokenGenerator } = require('../../../../lib/token');
const register = async (req,res,next) =>{
    const {name, email, password} = req.body
    try {
        const user = await authService.register({name,email,password});
        
        // to generate access_token
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        const access_token = accessTokenGenerator({payload});
        // generate structural response object
        const response = {
            code: 201,
            message: 'registration successful',
            data: {
                access_token
            },
            links:{
                self: req.url,
                login: '/auth/login'
            }
        };
        res.status(201).json(response);
    } catch (err) {
        // console.log(err)
        next(err)
    }
}

module.exports = register;