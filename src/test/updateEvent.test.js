const updateEvent = require('../api/v1/event/controllers/updateEvent');
const eventService = require('../lib/event');

jest.mock('../lib/event');

describe('Update event controller', ()=>{
    let req,res,next;

    beforeEach(()=>{
        req = {
            body:{
                id: '123',
                title: "update event title",
                description: "update event description",
                date: "02-09-2023",
                time: "1:25",
                location: "Dhaka",
                budget: 0,
                status: "complete",
                createdAt: "string",
                updatedAt: "string"
            },
            params: {
                id: '123'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    afterEach(()=>{
        jest.clearAllMocks();
    });

    it('should successfully update an event and return resp0nse', async()=>{
        // define updated event as updated event service return 
        const updatedEvent = {
            id: '123',
            title: "update event title",
            description: "update event description",
            date: "02-09-2023",
            time: "1:25",
            location: "Dhaka",
            budget: 0,
            status: "complete",
            createdAt: "string",
            updatedAt: "string"
        };

        // mock function resolved with event service return
        eventService.updateEvent.mockResolvedValue(updatedEvent);

        // call the controller
        await updateEvent(req,res,next);
        // call updateEvent service
        expect(eventService.updateEvent).toHaveBeenCalledWith(req.params.id,req.body);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            code: 200,
            data: updatedEvent,
            links: {
                self: `/events/${req.params.id}`
            }
        });
    });

    it('should next called with an error,if updating event fails', async()=>{
        eventService.updateEvent.mockRejectedValue(new Error('event update failed'));

        await updateEvent(req,res,next);
        expect(next).toHaveBeenCalledWith(new Error('event update failed'));
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    })

})
