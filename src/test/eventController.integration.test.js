const bcrypt = require('bcryptjs')
const app = require('../app');
const routes = require('../routes');
const request = require('supertest');
const User = require('../model/User');
const Event = require('../model/Event');
app.use(routes);

let auth = {};
    


describe('Event routes API crud testing',()=>{
  beforeEach(async function() {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('pass123',salt);
    const user = await User.create({
        name:'test user',
        email: 'testuser@gmail.com',
        password: password
    })
    const {body} = await request(app)
    .post("/api/v1/auth/login")
    .set('content-type','application/json')
    .send({
      email: "testuser@gmail.com",
      password: "pass123"
    });
    // console.log(user);
    // we'll need the token for future requests
    auth.token = body.data.access_token;
    auth.host = user.id;
  });
    it('POST---Create Event',async()=>{
        const {body,statusCode} = await request(app).post('/api/v1/events').set('content-type','application/json').set('Authorization',`Bearer ${auth.token}`).send({
            title: "first event",
            description: "first event's description",
            date: "02-09-2023",
            time: "1:08",
            location: "Dhaka",
            budget: 0,
            status: "pending"
        });
        // console.log(body)
        expect(statusCode).toBe(201);
        expect(Object.keys(body).length).toBe(4)
        expect(body).toHaveProperty('links')
    });
    describe('Get single Event',()=>{
      let event;
      beforeEach(async()=>{
        event = await Event.create({
          title: "first event",
            description: "first event's description",
            date: "02-09-2023",
            time: "1:08",
            location: "Dhaka",
            budget: 0,
            status: "pending",
            host: auth.host
        })
      });
      it('GET---should find an single event and return',async()=>{
        const {body,statusCode} = await request(app).get(`/api/v1/events/${event.id}`).set('content-type','application/json').set('Authorization',`Bearer ${auth.token}`);
        // console.log(body)
        expect(statusCode).toBe(200)
        expect(body).toHaveProperty('code')
      })
    });
    // update endpoint
    describe('Update single Event',()=>{
      let event;
      beforeEach(async()=>{
        event = await Event.create({
          title: "first event",
            description: "first event's description",
            date: "02-09-2023",
            time: "1:08",
            location: "Dhaka",
            budget: 0,
            status: "pending",
            host: auth.host
        })
      });
      it('PATCH---should find an single event and return event',async()=>{
        const {body,statusCode} = await request(app).patch(`/api/v1/events/${event.id}`).set('content-type','application/json').set('Authorization',`Bearer ${auth.token}`).send({
          title: "updated event",
          description: "updated event's description",
          date: "02-09-2023",
          time: "1:08",
          location: "Dhaka",
          budget: 0,
          status: "pending"
      });
        // console.log(body)
        expect(statusCode).toBe(200)
        expect(body).toHaveProperty('code')
      })
    });
    // Delete Endpoint
    describe('Delete single Event',()=>{
      let event;
      beforeEach(async()=>{
        event = await Event.create({
          title: "first event",
            description: "first event's description",
            date: "02-09-2023",
            time: "1:08",
            location: "Dhaka",
            budget: 0,
            status: "pending",
            host: auth.host
        })
      });
      it('DELETE---should find an single event and DELETE',async()=>{
        const {body,statusCode} = await request(app).delete(`/api/v1/events/${event.id}`).set('content-type','application/json').set('Authorization',`Bearer ${auth.token}`)
        // console.log(body)
        expect(statusCode).toBe(204)
      })
    });
    // findAllEvent endpoint
    describe('Find All Event',()=>{
      beforeEach(async()=>{
         await Event.insertMany([
          {
            title: "first event",
              description: "first event's description",
              date: "02-09-2023",
              time: "1:08",
              location: "Dhaka",
              budget: 0,
              status: "pending",
              host: auth.host
          },
          {
            title: "1st event",
              description: "2nd event's description",
              date: "02-09-2023",
              time: "1:08",
              location: "Dhaka",
              budget: 0,
              status: "pending",
              host: auth.host
          },
          {
            title: "2nd event",
              description: "first event's description",
              date: "02-09-2023",
              time: "1:08",
              location: "Dhaka",
              budget: 0,
              status: "pending",
              host: auth.host
          },
          {
            title: "3rd event",
              description: "3rd event's description",
              date: "02-09-2023",
              time: "1:08",
              location: "Dhaka",
              budget: 0,
              status: "pending",
              host: auth.host
          },{
            title: "4th event",
              description: "4th event's description",
              date: "02-09-2023",
              time: "1:08",
              location: "Dhaka",
              budget: 0,
              status: "pending",
              host: auth.host
          }
        ])
      });
      it('GET---should return an array of events',async()=>{
        const {body,statusCode} = await request(app).get(`/api/v1/events`).set('content-type','application/json').set('Authorization',`Bearer ${auth.token}`);
        // console.log(body)
        expect(statusCode).toBe(200)
        expect(body).toHaveProperty('links')
      })
    });
});