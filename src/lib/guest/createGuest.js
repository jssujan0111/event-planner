const Guest = require('../../model/Guest');
const { badRequest } = require('../../utils/error');

const createGuest = async({name,email,phone,invitationStatus='not_sent',RSVPs='undecided',event})=>{
    if(!name || !email || !phone){
        throw badRequest('Missing Require Field')
    }
    const guest = new Guest({name,email,phone,invitationStatus,RSVPs,event});
    await guest.save();
    return {
        ...guest._doc,id:guest.id
    }
};

module.exports = createGuest;