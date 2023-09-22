const guestService = require('../../../../lib/guest');

const deleteGuest = async(req,res,next)=>{
    const {guestId:id} = req.params;
    console.log('i am form guest delete controllers',id)
    try {
        // delete guest
        await guestService.deleteGuest(id);
        //generate response
        const response = {
            code: 204,
            message: 'guest remove successfully'
        };
        res.status(204).json(response)
    } catch (err) {
        next(err)
    }
};

module.exports = deleteGuest;