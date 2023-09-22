const getDataTransform = ({
    items = [],
    select = [],
    path = '/'
})=>{
    if(!Array.isArray(items) && !Array.isArray(select)){
        throw new Error('invalid data types are not accepted')
    };

    if(select.length === 0){
        return items.map((item)=>({...item, link:`${path}/${item.id}`}))
    };

    return items.map((item)=>{
        const result = {};
        select.forEach((key)=>{ result[key] = item[key]});
        result.link = `${path}/${item.id}`
        return result
    });
};

module.exports = getDataTransform;