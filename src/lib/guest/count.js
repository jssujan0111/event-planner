const Guest = require('../../model/Guest');

const count = async(id,search='')=>{
    return await Guest.count({event:id,name:{$regex: search, $options: 'i'}})
};

module.exports = count;