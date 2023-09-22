const bcrypt = require('bcryptjs')
const app = require('../app');
const routes = require('../routes');
const request = require('supertest');
const User = require('../model/User');
// const {hashedMatch} = require('../utils/hashing');
// application 
app.use(routes);


// jest.mock('../utils/hashing',()=>({
//     hashedMatch: jest.fn()
// }));
describe('Integration test for Events API',()=>{
    // afterEach(()=>{
    //     jest.clearAllMocks()
    // })
    // Server Okay
    describe('Server is ok',()=>{
        it('GET /ok',async()=>{
            const {body,statusCode} = await request(app).get('/ok');
            expect(statusCode).toBe(200);
            expect(body).toEqual({
                message:'server is okay'
            })
        });
    })
    // Auth Controller
    describe('Auth Controller',()=>{
        // Registration checking
        describe('Register a user', ()=>{
            it('POST -- Should create a user and return 201 & access_token', async()=>{
                const {body,statusCode} = await request(app).post('/api/v1/auth/register').set('content-type','application/json').send({
                    name: 'test user',
                    email: 'testuser@gmail.com',
                    password: 'pass123'
                });
                // 1st expectation
                expect(statusCode).toBe(201);
                //2nd expectation
                expect(body).toHaveProperty('data')
            })
        });
        // login checking;
        describe('Login a user',()=>{
            
            beforeEach(async()=>{
                const salt = await bcrypt.genSalt(10);
                const password = await bcrypt.hash('pass123',salt);
                await User.create({
                    name:'test user',
                    email: 'testuser@gmail.com',
                    password: password
                })
            });
            
            
            it('POST -- Should login a user and return 200 response with access_token',async()=>{
                const { body,statusCode} = await request(app).post('/api/v1/auth/login').set('content-type','application/json').send({
                    email: 'testuser@gmail.com',
                    password: 'pass123'
                });
                // console.log(body);
                // 1st expectation
                expect(statusCode).toBe(200);
                // 2nd expectation
                expect(body).toHaveProperty('data');
                // expect(body.data).toHaveProperty('access_token');
            })
        })
    });
});









