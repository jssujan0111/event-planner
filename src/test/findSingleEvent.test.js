const findSingleEvent = require('../api/v1/event/controllers/findSingleEvent');
const eventService = require('../lib/event');

// mock eventService with jest
jest.mock('../lib/event');

describe('Find Single Event Controller',()=>{
    let req,res,next;

    beforeEach(()=>{
        req = {
            params:{
                id: '123'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn()
    });

    afterEach(()=>{
        jest.clearAllMocks()
    });

    it('should successfully find single return response', async()=>{
        // create dummy event as findSingle event service return this
        const event = {
            "id": '123',
            title: "first event title",
            description: "first event description",
            date: "02-09-2023",
            time: "1:25",
            location: "Dhaka",
            budget: 0,
            status: "pending",
            createdAt: "string",
            updatedAt: "string"
        };
        // mock function resolved 
        eventService.findSingleEvent.mockResolvedValue(event);

        // call the findSingle event controller
        await findSingleEvent(req,res,next);

        expect(eventService.findSingleEvent).toHaveBeenCalledWith(req.params.id);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            code: 200,
            data: event,
            links: {
                self: `/events/${event.id}`,
                guests: `/events/${event.id}/guests`
            }
        });
        expect(next).not.toHaveBeenCalled()
    });

    // second test case - next function called with an error
    it('should next call with an error,if finding event fails', async()=>{
        eventService.findSingleEvent.mockRejectedValue(new Error('event not found'));
        await findSingleEvent(req,res,next);
        expect(eventService.findSingleEvent).toHaveBeenCalledWith(req.params.id)
        expect(next).toHaveBeenCalledWith(new Error('event not found'));
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
})

