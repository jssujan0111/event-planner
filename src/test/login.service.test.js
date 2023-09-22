const login = require('../lib/auth/login');
const {findUserByEmail} = require('../lib/user');
const { hashedMatch } = require('../utils/hashing');
const { badRequest } = require('../utils/error');
const { accessTokenGenerator } = require('../lib/token');

// Mock all the external function 
jest.mock('../lib/user');
jest.mock('../utils/hashing');
jest.mock('../utils/error');
jest.mock('../lib/token');

describe('Login Service',()=>{
    // after all mocking and testing, clear all the mock function
    afterEach(()=>{
        jest.clearAllMocks()
    });

    // first test case - login success and generate access_token
    it('Should login a user successfully and return a access token', async()=>{
        // Mock the findUserByEmail function and resoled with a user object
        const user = {
            id: '123',
            name: 'test user',
            email: 'testuser@gmail.com',
            password: 'hashedPassword'
        };
        findUserByEmail.mockResolvedValue(user);
        // Mock the hashed function to return true
        hashedMatch.mockResolvedValue(true);
        // Mock the access token generator function to return access token
        accessTokenGenerator.mockReturnValue('accessToken');
        // call login service
        const accessToken = await login({email: user.email,password: user.password});

        // testing expectation
        expect(findUserByEmail).toHaveBeenCalledWith(user.email);
        expect(hashedMatch).toHaveBeenCalledWith('hashedPassword',user.password);
        // access generator payload
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email
        }
        expect(accessTokenGenerator).toHaveBeenCalledWith({payload});
        expect(accessToken).toBe('accessToken');
        expect(badRequest).not.toHaveBeenCalled()
    });
  /*
    // to run this test , you should comment out throw new Error inside lib/auth/login
   it('should throw bad request with an error,if login fails',async()=>{
        findUserByEmail.mockResolvedValue(null);
        await expect(login({email:'user@gmail.com',password:'password'})).rejects.toThrowError(new Error('invalid credentials'));
        
        //expect(badRequest).toHaveBeenCalledWith('invalid credentials')
        expect(findUserByEmail).toHaveBeenCalledWith('user@gmail.com');
        expect(hashedMatch).not.toHaveBeenCalled();
        expect(accessTokenGenerator).not.toHaveBeenCalled();
   })
   */
})
