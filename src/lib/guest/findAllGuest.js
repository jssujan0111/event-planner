const Guest = require('../../model/Guest');
const defaultConfig = require('../../config/config');
const { badRequest } = require('../../utils/error')

const findAllGuest = async(id,{
    page = defaultConfig.page,
    limit = defaultConfig.limit,
    sortType = defaultConfig.sort_type,
    sortBy = defaultConfig.sort_by,
    search = defaultConfig.search
})=>{
    // making sort string
    const sortStr = `${sortType === "dsc" ? '-' : ''}${sortBy}`;
    // finding,sorting and skipping all guest
    const guests = await Guest.find({event: id,name:{$regex: search, $options: 'i'}}).sort(sortStr).skip(limit*page-limit).limit(limit);
    
    return guests.map((guest)=>({
        ...guest._doc,id:guest.id
    }));

};

module.exports = findAllGuest;