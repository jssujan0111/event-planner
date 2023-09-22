const register = require('../api/v1/auth/controllers/register');
const authService = require('../lib/auth');
const {accessTokenGenerator} = require('../lib/token');

jest.mock('../lib/auth');
jest.mock('../lib/token');

describe('Register controller',()=>{
    let req,res,next;

    beforeEach(()=>{
        req = {
            body:{
                name: 'test',
                email: 'test@gmail.com',
                password: 'pass1234'
            },
            url : '/register'
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        },
        next = jest.fn();
    });

    afterEach(()=>{
        jest.clearAllMocks()
    });


    it('should successfully register and return access token', async()=>{
        const user = {
            id: '123',
            name: 'test',
            email: 'test@gmail.com',
        };

        authService.register.mockResolvedValue(user);

        const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Zjk1ZGJmZGJmZjc0YTAwOTYyYzM2MiIsIm5hbWUiOiJqaG9uIERvZSIsImVtYWlsIjoiamhvbkBnbWFpbC5jb20iLCJpYXQiOjE2OTQzMzQ2NDksImV4cCI6MTY5NDMzODI0OX0.1WZujXsguakwqGTF7W9H1AIeacdLUzEsnRbdqvRhF6w';

        accessTokenGenerator.mockReturnValue(access_token);

        await register(req,res,next);
        
        expect(authService.register).toHaveBeenCalledWith({
            name: 'test',
            email: 'test@gmail.com',
            password: 'pass1234'
        })
        const payload = {
            id:'123',
            name: 'test',
            email: 'test@gmail.com'
        }
        expect(accessTokenGenerator).toHaveBeenCalledWith({payload});

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            code: 201,
            message: 'registration successful',
            data: {
                access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Zjk1ZGJmZGJmZjc0YTAwOTYyYzM2MiIsIm5hbWUiOiJqaG9uIERvZSIsImVtYWlsIjoiamhvbkBnbWFpbC5jb20iLCJpYXQiOjE2OTQzMzQ2NDksImV4cCI6MTY5NDMzODI0OX0.1WZujXsguakwqGTF7W9H1AIeacdLUzEsnRbdqvRhF6w'
            },
            links: {
                self: '/register',
                login: '/auth/login'
            }
        });
        expect(next).not.toHaveBeenCalled()
    });

    it('should have call next if registration fails',async()=>{
        authService.register.mockRejectedValue(new Error('registration failed'));

        await register(req,res,next);

        expect(authService.register).toHaveBeenCalledWith({
            name: 'test',
            email: 'test@gmail.com',
            password: 'pass1234'
        });
        expect(next).toHaveBeenCalledWith(new Error('registration failed'));
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled()
    })

})