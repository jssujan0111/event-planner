const Event = require('../../model/Event');
const {notFound} = require('../../utils/error');
const findSingleEvent = async(id)=>{
    const event = await Event.findById(id)
    if(!event){
        throw notFound('resource not found')
    }
    
    return {
        ...event._doc,id:event.id
    }
};

module.exports = findSingleEvent;