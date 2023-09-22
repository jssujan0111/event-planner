const guestService = require('../../../../lib/guest');
const defaultConfig = require('../../../../config/config');
const getDataTransform = require('../../../../utils/dataTransform');
const getPagination = require('../../../../utils/pagination');
const getHATEOASLinks = require('../../../../utils/getHATEOAS');

const findAllGuest = async(req,res,next)=>{
    const {id} = req.params;
    const page = req.query.page || defaultConfig.page;
    const limit = req.query.limit || defaultConfig.limit;
    const sortType = req.query.sort_type || defaultConfig.sort_type;
    const sortBy = req.query.sort_by || defaultConfig.sort_by;
    const search = req.query.search || defaultConfig.search;

    try {
        // find all guest with sorting , searching
        const guests = await guestService.findAllGuest(id,{
            page,
            limit,
            sortType,
            sortBy,
            search
        });
        // data transformation
        const data = getDataTransform({items: guests,select: [ 'id','name','phone','email','invitationStatus','RSVPs'],path: req.path});
        // get totalItems - guests
        const totalItems = await guestService.count(id,search);
        // generate pagination
        const pagination = getPagination({page,limit,totalItems});
        // generate HATEOAS links
        let links = getHATEOASLinks({url: req.url, path: req.path, query: req.query, hasNext: !!pagination.next, hasPrev: !!pagination.prev});
        links.event = `/events/${id}`;

        res.status(200).json({data,pagination,links})

    } catch (err) {
        next(err)
    }
};

module.exports = findAllGuest;