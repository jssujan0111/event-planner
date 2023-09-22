const Event = require('../../model/Event');
const { notFound } = require('../../utils/error');

const updateEvent = async(id,{title,description,date,time,location,budget,status})=>{
    const event = await Event.findById(id);
    if(!event){
        throw notFound('resource not found')
    }
    const updatePayload = {title,description,date,time,location,budget,status};
    Object.keys(updatePayload).forEach((key)=>{
        event[key] = updatePayload[key] ?? event[key]
    });
    await event.save();
    return {...event._doc,id:event.id}
};

module.exports = updateEvent;