const guestService = require('../../../../lib/guest');


const updateGuest = async(req,res,next)=>{
    const {id:eventId,guestId:gid} = req.params;
    const {name,email,phone,invitationStatus,RSVPs} = req.body;
    try {
        // update guest
        const guest = await guestService.updateGuest(gid,{name,email,phone,invitationStatus,RSVPs});
        // generate response
        const response = {
            code: 200,
            data: guest,
            links: {
                self: req.url,
                event: `/events/${eventId}`
            }
        };
        res.status(200).json(response);
    } catch (err) {
        next(err)
    }
}

module.exports = updateGuest;