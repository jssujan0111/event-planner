const findAllEvent = require('../api/v1/event/controllers/findAllEvent');
const eventService = require('../lib/event');
const getDataTransform = require('../utils/dataTransform');
const getPagination = require('../utils/pagination');
const getHATEOASLinks = require('../utils/getHATEOAS');

jest.mock('../lib/event')
jest.mock('../lib/event/findAllEvent');
jest.mock('../utils/dataTransform');
jest.mock('../utils/pagination');
jest.mock('../utils/getHATEOAS');

describe('FindAllEvent Controller',()=>{
    let req,res,next;

    beforeEach(()=>{
        req= {
            //simulate user
            user: {
                id: '123',
                name: 'test',
                email: 'test@gmail.com'
            },
            query: {
                page: 1,
                limit: 10,
                sort_type: 'asc',
                sort_by: 'updatedAt',
                search: ''
            },
            url: '/events',
            path: '/events?page=1&limit=10&sort_type=asc&sort_by=updatedAt&search=title'
        },
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        },
        next = jest.fn()
    });


    afterEach(()=>{
        jest.clearAllMocks();
    });


    it('should successfully find all events and return response', async()=>{
        // create an array of event object exactly findAllEvent service return
        const events = [
            {
                id: "123",
                title: "first event",
                description: "first event's description",
                date: "2023-02-09T08:00:00.000Z",
                time: "1:08",
                location: "Dhaka",
                budget: 0,
                status: "pending",
                createdAt: "2023-09-08T18:42:21.038Z",
                updatedAt: "2023-09-08T18:42:21.038Z",
            },
            {
                id: "124",
                title: "second event",
                description: "first event's description",
                date: "2023-02-09T08:00:00.000Z",
                time: "1:08",
                location: "Dhaka",
                budget: 0,
                status: "pending",
                createdAt: "2023-09-08T18:42:21.038Z",
                updatedAt: "2023-09-08T18:42:21.038Z",
            }
        ];
        // call the event service find all function
        eventService.findAllEvent.mockResolvedValue(events);

        // create data transformation output
        const data = [
            {
                id: "123",
                title: "first event",
                description: "first event's description",
                date: "2023-02-09T08:00:00.000Z",
                time: "1:08",
                location: "Dhaka",
                budget: 0,
                status: "pending",
                createdAt: "2023-09-08T18:42:21.038Z",
                updatedAt: "2023-09-08T18:42:21.038Z",
                link: "/events/123"
            },
            {
                id: "124",
                title: "second event",
                description: "first event's description",
                date: "2023-02-09T08:00:00.000Z",
                time: "1:08",
                location: "Dhaka",
                budget: 0,
                status: "pending",
                createdAt: "2023-09-08T18:42:21.038Z",
                updatedAt: "2023-09-08T18:42:21.038Z",
                link: "/events/124"
            }
        ]
        // call data transform function
        getDataTransform.mockReturnValue(data);

        // making totalItems;
        const totalItems = 50;
        eventService.count.mockResolvedValue(totalItems);
        // create pagination payload
        const pagination = {
            page: 1,
            limit: 10,
            totalItems
        };
        const totalPage = Math.ceil(totalItems / pagination.limit);
        if( pagination.page < totalPage) pagination.next = pagination.page + 1
        
        if(pagination.page > totalPage) pagination.prev = pagination.page - 1
        // call pagination function
        getPagination.mockReturnValue(pagination);

        // HATEOAS links
        const links = {
            self: req.url
        }
        if(pagination.next) links.next = 'events?page=1&limit=10&sort_type=asc&sort_by=updatedAt&search=title';
        if(pagination.prev) links.prev = 'events?page=1&limit=10&sort_type=asc&sort_by=updatedAt&search=title';

        // call HATEOAS generator function
        getHATEOASLinks.mockReturnValue(links);

        await findAllEvent(req,res,next);
        const queryLs = {
            page: 1,
            limit: 10,
            sortType: 'asc',
            sortBy: 'updatedAt',
            search: ''
        }
        expect(eventService.findAllEvent).toHaveBeenCalledWith(req.user,{...queryLs});

        expect(getDataTransform).toHaveBeenCalledWith({items: events,select: ['id','title','description','date','time','location','budget','status','createdAt','updatedAt'],path: '/events'});

        expect(eventService.count).toHaveBeenCalledWith(req.user,queryLs.search);
        expect(getPagination).toHaveBeenCalledWith({
            page: 1,
            limit: 10,
            totalItems: 50,
        });

        expect(getHATEOASLinks).toHaveBeenCalledWith({
            url: req.url,
            path: req.path,
            query: req.query,
            hasNext: !!pagination.next,
            hasPrev: !!pagination.prev,
        });

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            data,pagination,links
        });

        expect(next).not.toHaveBeenCalled()

    });

    it('should call next with an error if finding events fails',async()=>{
        eventService.findAllEvent.mockRejectedValue(new Error('Finding Event failed'));

        await findAllEvent(req,res,next);
        // create pagination payload
        const pagination = {
            page: 1,
            limit: 10,
            totalItems: 50
        };
        const totalPage = Math.ceil(pagination.totalItems / pagination.limit);
        if( pagination.page < totalPage) pagination.next = pagination.page + 1
        
        if(pagination.page > totalPage) pagination.prev = pagination.page - 1
        expect(eventService.findAllEvent).toHaveBeenCalledWith(req.user,{
            page: 1,
            limit: 10,
            sortType: 'asc',
            sortBy: 'updatedAt',
            search: ''
        });

        expect(next).toHaveBeenCalledWith(new Error('Finding Event failed'));

        expect(getDataTransform).not.toHaveBeenCalled();
        expect(getPagination).not.toHaveBeenCalled();
        expect(getHATEOASLinks).not.toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled()
    })
})