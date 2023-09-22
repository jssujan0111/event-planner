const eventService = require("../../../../lib/event");
const updateEvent = async(req,res,next) =>{
    const {id} = req.params;
    try {
        const event = await eventService.updateEvent(id,req.body);
        // generate response
        const response = {
            code: 200,
            data: event,
            links: {
                self: `/events/${event.id}`
            }
        }
        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
};

module.exports = updateEvent;