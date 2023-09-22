const findAllEvent = require('../lib/event/findAllEvent');
const Event = require('../model/Event');
jest.mock('../model/Event')
describe('FindAllEvent Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an array of events when events are found', async () => {
    // Create user
    const user = { id: '1' };

    // Create mockEvents
    const mockEvents = [
      {
        _doc: {
          title: 'test event',
          description: 'test event description',
          date: '12-12-2023',
          time: '2:01',
          location: 'Dhaka',
          budget: 0,
          status: 'pending',
          host: '1',
        },
        id: '1',
      },
      {
        _doc: {
          title: 'test event',
          description: 'test event description',
          date: '12-12-2023',
          time: '2:01',
          location: 'Dhaka',
          budget: 0,
          status: 'pending',
        },
        id: '2',
      },
    ];

    // Mock the Event.find method to return a chained query
    const sortMock = jest.fn();
    const skipMock = jest.fn();
    const limitMock = jest.fn();
    // const populateMock = jest.fn();

    Event.find.mockReturnValue({
      sort: sortMock,
    });
    sortMock.mockReturnValue({
      skip: skipMock,
    });
    skipMock.mockReturnValue({
      limit: limitMock,
    });
    limitMock.mockResolvedValue(mockEvents);
    const queryLs = {
      page: 1,
      limit: 10,
      sortType: 'asc',
      sortBy: 'id',
      search: '',
    }
    const result = await findAllEvent(user, { ...queryLs });

    expect(Event.find).toHaveBeenCalledWith({ host: user.id,title:{$regex: queryLs.search, $options: 'i'} });
    expect(result).toEqual([
      { ...mockEvents[0]._doc, id: '1' },
      { ...mockEvents[1]._doc, id: '2' },
    ]);
  });
});










// const findAllEvent = require('../lib/event/findAllEvent');
// const Event = require('../model/Event');

// // mock the Event model and it's method
// jest.mock(Event.find().sort({ id:1 }).skip(0).limit(10))
// jest.mock('../model/Event',()=>({
//     find: jest.fn().mockImplementation(() => ({
//         sort: jest.fn().mockImplementation((...args) => ({
//           skip: jest.fn().mockImplementation((...arg) => ({
//             populate: jest.fn().mockImplementation((...arg) => ({
//               limit: jest.fn().mockImplementation((...arg) => mockEvents),
//             })),
//           })),
//         })),
//       }))
// }));
// // jest.mock(Event.find().sort({ id:1 }).skip(0).limit(10))
// // ,()=>({
// //     find: jest.fn()
// // })
// // ,()=>({
// //     find: jest.fn().mockImplementation(() => ({
// //         sort: jest.fn().mockImplementation((...args) => ({
// //           skip: jest.fn().mockImplementation((...arg) => ({
// //             populate: jest.fn().mockImplementation((...arg) => ({
// //               limit: jest.fn().mockImplementation((...arg) => mockEvents),
// //             })),
// //           })),
// //         })),
// //       }))
// // })
// describe('FindAllEvent Service',()=>{
//     afterEach(()=>{
//         jest.clearAllMocks()
//     });

//     it('should return an array of events when events are found',async()=>{
//         // create user
//         const user = { id: '1'};
//         // create MockEvents
//         const mockEvents = [
//             {
//                 _doc:{
//                     title: 'test event',
//                     description: 'test event description',
//                     date: '12-12-2023',
//                     time: '2:01',
//                     location: 'Dhaka',
//                     budget: 0,
//                     status: 'pending',
//                     host: '1'
//                 },
//                 id: '1'
//             },
//             {
//                 _doc:{
//                     title: 'test event',
//                     description: 'test event description',
//                     date: '12-12-2023',
//                     time: '2:01',
//                     location: 'Dhaka',
//                     budget: 0,
//                     status: 'pending',
//                 },
//                 id: '2'
//             }
//         ];
       
//         // mock Event.find method to return the mockEvents array
//         Event.find.mockResolvedValue(mockEvents);
//         Event.find.sort.mockResolvedValue()

//         const result = await findAllEvent(user,{page:1,limit:10,sortType: 'asc',sortBy:'id',search:''});

//         expect(Event.find).toHaveBeenCalledWith({host: user.id});
//         expect(result).toEqual([
//             {...mockEvents[0]._doc,id:'1'},
//             {...mockEvents[1]._doc,id:'1'}
//         ])
//     })
// })

// //https://stackoverflow.com/questions/54561550/jest-mocking-spying-on-mongoose-chained-find-sort-limit-skip-methods