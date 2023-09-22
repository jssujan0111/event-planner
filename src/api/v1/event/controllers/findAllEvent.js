const eventService = require('../../../../lib/event');
const defaultConfig = require('../../../../config/config');
const getDataTransform = require('../../../../utils/dataTransform');
const getPagination = require('../../../../utils/pagination');
const getHATEOASLinks = require('../../../../utils/getHATEOAS');


const findAllEvent = async(req,res,next) =>{
    const page = req.query.page || defaultConfig.page;
    const limit = req.query.limit || defaultConfig.limit;
    const sortType = req.query.sort_type || defaultConfig.sort_type;
    const sortBy = req.query.sort_by || defaultConfig.sortBy;
    const search = req.query.search || defaultConfig.search;
    try {
        
        // find all events
        const events = await eventService.findAllEvent(req.user,{
            page,limit,sortType,sortBy,search
        });
        
        // data transform
        const data = getDataTransform({items:events,select:['id','title','description','date','time','location','budget','status','createdAt','updatedAt'],path:'/events'});

        // total events
        const totalItems = await eventService.count(req.user,search);
       
        // generate pagination
        const pagination = getPagination({page,limit,totalItems});
        // generate HATEOAS
        const links = getHATEOASLinks({url: req.url,path: req.path,query:req.query,hasNext:!!pagination.next,hasPrev:!!pagination.prev})
        res.status(200).json({data,pagination,links})
    } catch (err) {
        next(err)
    }
}

module.exports = findAllEvent
