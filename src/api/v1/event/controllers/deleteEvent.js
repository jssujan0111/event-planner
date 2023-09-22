const eventService = require('../../../../lib/event');

const deleteEvent = async(req,res,next)=>{
    const {id} = req.params;
    try {
        await eventService.deleteEvent(id);
        // generate response
        const response = {
            code: 204,
            message: 'successfully remove your event'
        }
        res.status(204).json(response)
    } catch (err) {
        next(err)
    }
};

module.exports = deleteEvent;