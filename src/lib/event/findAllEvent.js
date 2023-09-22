const Event = require('../../model/Event');
const defaultConfig = require('../../config/config');

const findAllEvent = async(user,{
    page = defaultConfig.page,
    limit = defaultConfig.limit,
    sortType = defaultConfig.sort_type,
    sortBy = defaultConfig.sort_by,
    search = defaultConfig.search
})=>{
    const sortStr = `${sortType === 'dsc' ? '-' : ''}${sortBy}`;
    const usersEvents = await Event.find({host:user.id,title:{$regex: search, $options: 'i'}}).sort(sortStr).skip(page*limit - limit).limit(limit);

    return usersEvents.map((event)=>({
        ...event._doc,id:event.id
    }))
}

module.exports = findAllEvent;