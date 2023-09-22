const defaultConfig = require('../config/config');

const getPagination = ({
    page = defaultConfig.page,
    limit = defaultConfig.limit,
    totalItems = defaultConfig.totalItems
}) =>{
    const totalPage = Math.ceil(totalItems / limit);
    const pagination = {
        page,
        totalItems,
        totalPage
    };
    if(page < totalPage){
        pagination.next = page + 1;
    };
    if( page > totalPage){
        pagination.prev = page - 1;
    }
    return pagination;
}

module.exports = getPagination;