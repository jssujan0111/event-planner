const checkAuthenticate = require('../middleware/checkAuthenticate');
const tokenService = require('../lib/token');
const userService = require('../lib/user');
const {authenticationError} = require('../utils/error');

// mock the token service
jest.mock('../lib/token');
// mock the user service
jest.mock('../lib/user');

describe('Authentication middleware',()=>{
    let req,res,next;

    beforeEach(()=>{
        req = {
            headers:{
                authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Zjk1ZGJmZGJmZjc0YTAwOTYyYzM2MiIsIm5hbWUiOiJqaG9uIERvZSIsImVtYWlsIjoiamhvbkBnbWFpbC5jb20iLCJpYXQiOjE2OTQzMzQ2NDksImV4cCI6MTY5NDMzODI0OX0.1WZujXsguakwqGTF7W9H1AIeacdLUzEsnRbdqvRhF6w'
            }
        };
        res = {};
        next = jest.fn()
    });

    afterEach(()=>{
        jest.clearAllMocks()
    });
    it('should set req.user if token is valid',async()=>{
        const decoded = {email: 'test@gmail.com'};
        tokenService.verifyToken.mockReturnValue(decoded);
        const user = {_doc: {name:'test',email:'test@gmail.com'},id:'1234'};
        userService.findUserByEmail.mockResolvedValue(user);
        await checkAuthenticate(req,res,next);

        expect(req.user).toEqual({...user._doc,id:'1234'});
        expect(next).toHaveBeenCalledTimes(1)

    });

    it('should call next with authentication error if user does not exist',async()=>{
        tokenService.verifyToken.mockReturnValue({email: 'test@gmail.com'});
        userService.findUserByEmail.mockResolvedValue(null);

        await checkAuthenticate(req,res,next);

        expect(next).toHaveBeenCalledWith(authenticationError('user authentication failed,login required'));
    });

    it('should call next with authentication error on token verification error',async()=>{
        tokenService.verifyToken.mockImplementation(()=>{
            throw new Error('token verification error')
        });
        await checkAuthenticate(req,res,next);
        expect(next).toHaveBeenCalledWith(authenticationError())
    })
    // it('should trow an error if headers are missing',async()=>{
    //     // simulate missing headers
    //     req.headers = null
    //     expect(async()=>{
    //         await checkAuthenticate(req,res,next);
    //     }).toThrowError('No Headers');
    //     expect(next).not.toHaveBeenCalled();
    // })
})