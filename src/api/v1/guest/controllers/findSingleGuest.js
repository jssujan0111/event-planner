const guestService = require('../../../../lib/guest');


const findSingleGuest = async(req,res,next)=>{
    const {id,guestId} = req.params;
    try {
        // find the guest
        const guest = await guestService.findSingleGuest(guestId);
        // generate response
        const links = {
            self: req.url,
            event: `/events/${id}`
        };
        const response = {
            code: 200,
            data: guest,
            links
        }
        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
};

module.exports = findSingleGuest;