const Event = require('../../model/Event');

const createEvent = async(
    {
        title,
        description,
        date,
        time,
        location,
        budget = 0,
        status = 'pending',
        host
    }
) =>{
    if(!title || !description || !date || !time || !location || !host){
        throw new Error("missing required fields")
    }
    const event = new Event({
        title,
        description,
        date,
        time,
        location,
        budget,
        status,
        host: host.id
    });
    await event.save();
    return {
        ...event._doc,
        id: event.id
    }
};

module.exports = createEvent;