const Event = require('../../model/Event');
const Guest = require('../../model/Guest');
const { notFound } = require('../../utils/error');

const deleteEvent = async(id)=>{
    const event = await Event.findById(id);
    if(!event){
        throw notFound();
    };
    // delete guests associate with this event
    await Guest.deleteMany({event: id})
    return await Event.findByIdAndDelete(id)
};

module.exports = deleteEvent;