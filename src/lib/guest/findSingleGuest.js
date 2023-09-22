const Guest = require('../../model/Guest');
const { badRequest } = require('../../utils/error');

const findSingleGuest = async(id)=>{
    const guest = await Guest.findById(id);
    if(!guest){
        throw badRequest('Resource not found');
    };

    return {
        ...guest._doc, id: guest.id
    }
};

module.exports = findSingleGuest;