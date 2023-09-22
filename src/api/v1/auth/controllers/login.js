const authService = require('../../../../lib/auth');

const login = async (req,res,next) =>{
    const {email,password} = req.body;
    try {
        const access_token = await authService.login({email,password});
       
        // generate structural response
        const response = {
            code: 200,
            message: 'successfully logged in',
            data: {
                access_token: access_token
            },
            links: {
                self: req.url
            }
        };
        res.status(200).json(response)
    } catch (err) {
        next(err)
    };
};

module.exports = login