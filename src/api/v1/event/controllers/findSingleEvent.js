const eventService = require('../../../../lib/event');

const findSingleEvent = async(req,res,next)=>{
    const {id} = req.params;
    try {
        const event = await eventService.findSingleEvent(id);
        // generate response
        const response = {
            code: 200,
            data: event,
            links: {
                self: `/events/${event.id}`,
                guests: `/events/${event.id}/guests`
            }
        }
        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
};

module.exports = findSingleEvent;