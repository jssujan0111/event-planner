const guestService = require('../../../../lib/guest');
const createGuest = async(req,res,next)=>{
   const {id:event} = req.params;
   const {name,email,phone,invitationStatus,RSVPs} = req.body;
   try {
       // create guest
        const guest = await guestService.createGuest({name,email,phone,invitationStatus,RSVPs,event});
        //generate response
        const response = {
            code: 201,
            message: 'Guest added to the event',
            data: guest,
            links: {
                self: `/events/${event}/guests/${guest.id}`,
                event: `/events/${event}`
            }
        };
        res.status(201).json(response);
   } catch (err) {
        next(err)
   };
    
}

module.exports=createGuest