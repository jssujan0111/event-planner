const {generateQueryString} = require('./queryString');

const getHATEOASLinks = ({
    url = '/',
    path = '',
    query = {},
    hasPrev = false,
    hasNext = false,
    page = 1
})=>{
    const links = {
        self: url
    };

    if(hasNext){
        const queryStr = generateQueryString({...query,page: page+1});
        links.next = `${path}?${queryStr}`
    };

    if(hasPrev){
        const queryStr = generateQueryString({...query,page: page-1});
        links.prev = `${path}?${queryStr}`
    };
    return links;
};

module.exports = getHATEOASLinks