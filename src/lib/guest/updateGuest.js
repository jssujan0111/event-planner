const Guest = require('../../model/Guest');
const { notFound } = require('../../utils/error');


const updateGuest = async(id,{name,email,phone,invitationStatus,RSVPs})=>{
    const guest = await Guest.findById(id);
    if(!guest){
        throw notFound('Resource not found');
    };
    const updatedPayload = {name,email,phone,invitationStatus,RSVPs};
    Object.keys(updatedPayload).forEach((key)=>{
        guest[key] = updatedPayload[key] ?? guest[key]
    });
    await guest.save();
    return {
        ...guest._doc,id:guest.id
    }
};

module.exports = updateGuest;