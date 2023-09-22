const createEvent = require('../lib/event/createEvent');
const Event = require('../model/Event');

jest.mock('../model/Event');

describe('Create Event Service',()=>{
    afterEach(()=>{
        jest.clearAllMocks();
    });
    // first test case
    it('should create an event successfully and return an event object',async()=>{
        // create a user/host object -- need just and id
        const host = {
            id:'507f191e810c19729de860ea'
        };
        // create mock event object which resolved when event save method will be called
        const event = {_doc:{
            title: 'test event',
            description: 'test event description',
            date: '12-12-2023',
            time: '2:01',
            location: 'Dhaka',
            budget: 0,
            status: 'pending',
            host: host.id,
        }}
        // create a new event -- which is the result of createEvent service
        const eventResult = new Event({
            title: 'test event',
            description: 'test event description',
            date: '12-12-2023',
            time: '2:01',
            location: 'Dhaka',
            budget: 0,
            status: 'pending',
            host: host.id,
        })
        // mock the Event's prototype save method with _doc object--event properties
        Event.prototype.save.mockResolvedValue(event);
        // create event data
        const eventPayload = {
            title: 'test event',
            description: 'test event description',
            date: '12-12-2023',
            time: '2:01',
            location: 'Dhaka',
            budget: 0,
            status: 'pending',
            host
        };

        const createdEvent = await createEvent({...eventPayload});
        expect(Event.prototype.save).toHaveBeenCalled();
        expect(createdEvent).toEqual({...eventResult._doc,id:eventResult.id});

    });

    // second test case
    it('should throw an error,if missing required fields', async()=>{
        // create a user/host object -- need just and id
        const host = {
            id:'507f191e810c19729de860ea'
        };
        // create event payload with missing required fields
        const eventPayload = {
            date: '12-12-2023',
            time: '2:01',
            location: 'Dhaka',
            budget: 0,
            status: 'pending',
            host
        };
        await expect(createEvent(eventPayload)).rejects.toThrowError('missing required fields');
        expect(Event.prototype.save).not.toHaveBeenCalled();
    })

})