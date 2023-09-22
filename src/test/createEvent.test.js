const createEvent = require('../api/v1/event/controllers/createEvent');
const eventService = require('../lib/event');

jest.mock('../lib/event');

describe('Create Event Controller',()=>{
    let req, res, next;

    beforeEach(()=>{
        req = {
            body: {
                title: 'Test Event',
                description: 'This is a test event',
                date: '2023-09-10',
                time: '18:00',
                location: 'Test Location',
                budget: 100,
                status: 'Pending',
            },
            user: {
                id: '123',
                name: 'test user',
                email: 'test@gmail.com'
            }
        },
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        },
        next = jest.fn();
    });

    afterEach(()=>{
        jest.clearAllMocks();
    });


    it('should successfully create an event and return the response', async()=>{
        const event = {
            id: '123',
            title: 'Test Event',
            description: 'This is a test event',
            date: '2023-09-10',
            time: '18:00',
            location: 'Test Location',
            budget: 100,
            status: 'Pending'
        };

        eventService.createEvent.mockResolvedValue(event);

        await createEvent(req,res,next);

        expect(eventService.createEvent).toHaveBeenCalledWith({
            title: 'Test Event',
            description: 'This is a test event',
            date: '2023-09-10',
            time: '18:00',
            location: 'Test Location',
            budget: 100,
            status: 'Pending',
            host: {
                id: '123',
                name: 'test user',
                email: 'test@gmail.com'
            }
        });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            code: 201,
            message: 'Event created successfully',
            data: {
                ...event
            },
            links: {
                self: '/events/123',
                guests: '/events/123/guests'
            }
        });
        expect(next).not.toHaveBeenCalled()
    });

    it('should call next with an error if event creation fails', async()=>{
        eventService.createEvent.mockRejectedValue(new Error('event creation failed'));

        await createEvent(req,res,next);

        expect(eventService.createEvent).toHaveBeenCalledWith({
            title: 'Test Event',
            description: 'This is a test event',
            date: '2023-09-10',
            time: '18:00',
            location: 'Test Location',
            budget: 100,
            status: 'Pending',
            host: {
                id: '123',
                name: 'test user',
                email: 'test@gmail.com'
            }
        });

        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(new Error('event creation failed'))
    });
})
