const Event = require('../../model/Event');

const count = async(user,search='')=>{
    return await Event.count({host:user.id,title:{$regex: search, $options: 'i'}})
};

module.exports = count;