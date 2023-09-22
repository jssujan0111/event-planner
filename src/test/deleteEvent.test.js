const deleteEvent = require('../api/v1/event/controllers/deleteEvent');
const eventService = require('../lib/event');

jest.mock('../lib/event');

describe('Delete Event Controller',()=>{
    let req,res,next;

    beforeEach(()=>{
        req = {
            params: {
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
        jest.clearAllMocks();
    });

    it('should successfully remove an event and return response', async()=>{
        await deleteEvent(req,res,next);
        expect(eventService.deleteEvent).toHaveBeenCalledWith(req.params.id);
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalledWith({
            code: 204,
            message: 'successfully remove your event'
        })
    });

    it('should call next with an error,if deleting event fails', async()=>{
        eventService.deleteEvent.mockRejectedValue(new Error('deleting an event failed'));
        await deleteEvent(req,res,next);
        expect(eventService.deleteEvent).toHaveBeenCalledWith(req.params.id);
        expect(next).toHaveBeenCalledWith(new Error('deleting an event failed'));
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled()
    })
})