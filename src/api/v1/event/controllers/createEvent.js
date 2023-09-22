const eventService = require('../../../../lib/event')

const createEvent = async (req,res,next) =>{
    const {title,description,date,time,location,budget,status} = req.body;
    try {
        const event = await eventService.createEvent({
            title,
            description,
            date,
            time,
            location,
            budget,
            status,
            host: req.user
        })

        // response 
        const response = {
            code: 201,
            message: 'Event created successfully',
            data: {
                ...event
            },
            links: {
                self: `/events/${event.id}`,
                guests: `/events/${event.id}/guests`
            }
        }
        res.status(201).json(response)
    } catch (err) {
        next(err)
    }
}

module.exports = createEvent;