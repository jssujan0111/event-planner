const Guest = require('../../model/Guest');
const {badRequest} = require('../../utils/error')

const deleteGuest = async(id)=>{

    const guest = await Guest.findById(id);

    if(!guest){
        throw badRequest('resource not found');
    };

    return await Guest.findByIdAndDelete(id);
};

module.exports = deleteGuest;