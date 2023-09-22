const login = require('../api/v1/auth/controllers/login');
const authService = require('../lib/auth');

jest.mock('../lib/auth')
describe("Login Controllers",()=>{
    let req,res,next;
    
    beforeEach(()=>{
        req = {
            body: {
                email: 'jhon@gmail.com',
                password: 'pass123'
            },
            url: '/login'
        },
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        },
        next = jest.fn()
    });

    afterEach(()=>{
        jest.clearAllMocks()
    });
    it('should successfully logged in and return access token',async()=>{
        let access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Zjk1ZGJmZGJmZjc0YTAwOTYyYzM2MiIsIm5hbWUiOiJqaG9uIERvZSIsImVtYWlsIjoiamhvbkBnbWFpbC5jb20iLCJpYXQiOjE2OTQzMzQ2NDksImV4cCI6MTY5NDMzODI0OX0.1WZujXsguakwqGTF7W9H1AIeacdLUzEsnRbdqvRhF6w';
        authService.login.mockResolvedValue(access_token);

        await login(req,res,next);
        expect(authService.login).toHaveBeenCalledWith({
            email: 'jhon@gmail.com',
            password: 'pass123'
        })
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            code: 200,
            message: 'successfully logged in',
            data: {
                access_token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Zjk1ZGJmZGJmZjc0YTAwOTYyYzM2MiIsIm5hbWUiOiJqaG9uIERvZSIsImVtYWlsIjoiamhvbkBnbWFpbC5jb20iLCJpYXQiOjE2OTQzMzQ2NDksImV4cCI6MTY5NDMzODI0OX0.1WZujXsguakwqGTF7W9H1AIeacdLUzEsnRbdqvRhF6w',
            },
            links:{
                self: '/login'
            }
        });
        expect(next).not.toHaveBeenCalled()
    });

    it('should call next with an error if login fails ',async()=>{
        authService.login.mockRejectedValue(new Error('login failed'));

        await login(req,res,next);
        expect(authService.login).toHaveBeenCalledWith({
            email: 'jhon@gmail.com',
            password: 'pass123'
        });
        expect(next).toHaveBeenCalledWith(new Error('login failed'));
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled()
    });

})