const register = require('../lib/auth/register');
const {isUserExist,createUser} = require('../lib/user');
const {badRequest} = require('../utils/error');
const { generateHashed } = require('../utils/hashing');

jest.mock('../lib/user');
jest.mock('../utils/error');
jest.mock('../utils/hashing');

describe('Register service',()=>{
    afterEach(()=>{
        jest.clearAllMocks()
    });
    it('should register a new user successfully and return a user object',async()=>{
        // mock the userExist function check to user return false (user doesn't exist)
        isUserExist.mockResolvedValue(false);
        // mock the create user function to return a user object;
        createUser.mockResolvedValue({
            id:'1',
            name: 'test user',
            email: 'testuser@gmail.com'
        });
        //mock the generateHashed function to return a hashed password;
        generateHashed.mockResolvedValue('hashedPassword');
        // call the register function
        const user = await register({name: 'test user',email: 'testuser@gmail.com',password: 'password'});
        expect(isUserExist).toHaveBeenCalledWith('testuser@gmail.com');
        expect(createUser).toHaveBeenCalledWith({name:'test user',email:'testuser@gmail.com',password:'hashedPassword'});
        expect(user).toEqual({
            id:'1',
            name: 'test user',
            email: 'testuser@gmail.com'
        })
    });
    
})