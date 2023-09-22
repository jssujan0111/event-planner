const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const app = require('../app');
const routes = require('../routes');
const request = require('supertest');
const User = require('../model/User');
const Event = require('../model/Event');
const Guest = require('../model/Guest');
app.use(routes);

let auth = {};
let eventID = {};   


describe('Guest routes API crud testing',()=>{
  beforeEach(async function() {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('pass123',salt);
    const user = await User.create({
        name:'test user',
        email: 'testuser@gmail.com',
        password: password
    });
    const event = await Event.create({
        title: "test event",
          description: "test event's description",
          date: "02-09-2023",
          time: "1:08",
          location: "Dhaka",
          budget: 0,
          status: "pending",
          host: auth.host
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
    eventID.id = event.id
  });
  afterEach(async()=>{
    const collections = mongoose.connection.collections;
    for(const key in collections){
        const collection =collections[key];
        await collection.deleteMany()
    }
  });
    it('POST---Create Guest',async()=>{
        const {body,statusCode} = await request(app).post(`/api/v1/events/${eventID.id}/guests`).set('content-type','application/json').set('Authorization',`Bearer ${auth.token}`).send({
            name: "jhon doe",
            email: "user@gmail.com",
            phone: "+8801712345678",
            invitationStatus: "not_sent",
            RSVPs: "undecided"
        });
        // console.log(body)
        expect(statusCode).toBe(201);
        expect(body).toHaveProperty('data');
    });
    describe('Get single Guest',()=>{
      let guest;
      beforeEach(async()=>{
        guest = await Guest.create({
            name: "jhon doe",
            email: "user@gmail.com",
            phone: "+8801712345678",
            invitationStatus: "not_sent",
            RSVPs: "undecided",
            event: eventID.id
        })
      });
      it('GET---should find an single guest and return',async()=>{
        const {body,statusCode} = await request(app).get(`/api/v1/events/${eventID.id}/guests/${guest.id}`).set('content-type','application/json').set('Authorization',`Bearer ${auth.token}`);
        // console.log(body)
        expect(statusCode).toBe(200)
        expect(body).toHaveProperty('code')
      })
    });
    // update endpoint
    describe('Update single Guest',()=>{
      let guest;
      beforeEach(async()=>{
        guest = await Guest.create({
            name: "jhon doe",
            email: "user@gmail.com",
            phone: "+8801712345678",
            invitationStatus: "not_sent",
            RSVPs: "undecided",
            event: eventID.id
        })
      });
      it('PATCH---should find an single guest and update',async()=>{
        const {body,statusCode} = await request(app).patch(`/api/v1/events/${eventID.id}/guests/${guest.id}`).set('content-type','application/json').set('Authorization',`Bearer ${auth.token}`).send({
            name: "J doe",
            email: "user@gmail.com",
            phone: "+8801712345678",
            invitationStatus: "sent",
            RSVPs: "attending"
      });
        // console.log(body)
        expect(statusCode).toBe(200)
        expect(body).toHaveProperty('code')
      })
    });
    // Delete Endpoint
    describe('Delete single guest',()=>{
      let guest;
      beforeEach(async()=>{
        guest = await Guest.create({
            name: "jhon doe",
            email: "user@gmail.com",
            phone: "+8801712345678",
            invitationStatus: "not_sent",
            RSVPs: "undecided",
            event: eventID.id
        })
      });
      it('DELETE---should find an single guest and DELETE',async()=>{
        const {body,statusCode} = await request(app).delete(`/api/v1/events/${eventID.id}/guests/${guest.id}`).set('content-type','application/json').set('Authorization',`Bearer ${auth.token}`)
        // console.log(body)
        expect(statusCode).toBe(204);
      })
    });
    // FindAll guest event endpoint
    describe('Find All Event',()=>{
      beforeEach(async()=>{
         await Guest.insertMany([
          {
            name: "A doe",
            email: "user@gmail.com",
            phone: "+8801712345678",
            invitationStatus: "not_sent",
            RSVPs: "undecided",
            event: eventID.id
          },
          {
            name: "B doe",
            email: "user@gmail.com",
            phone: "+8801712345678",
            invitationStatus: "not_sent",
            RSVPs: "undecided",
            event: eventID.id
          },
          {
            name: "C doe",
            email: "user@gmail.com",
            phone: "+8801712345678",
            invitationStatus: "not_sent",
            RSVPs: "undecided",
            event: eventID.id
          },
          {
            name: "D doe",
            email: "user@gmail.com",
            phone: "+8801712345678",
            invitationStatus: "not_sent",
            RSVPs: "undecided",
            event: eventID.id
          },{
            name: "E doe",
            email: "user@gmail.com",
            phone: "+8801712345678",
            invitationStatus: "not_sent",
            RSVPs: "undecided",
            event: eventID.id
          }
        ])
      });
      it('GET---should return an array of guests',async()=>{
        const {body,statusCode} = await request(app).get(`/api/v1/events/${eventID.id}/guests`).set('content-type','application/json').set('Authorization',`Bearer ${auth.token}`);
        // console.log(body)
        expect(statusCode).toBe(200)
        expect(body).toHaveProperty('links')
      })
    });
});