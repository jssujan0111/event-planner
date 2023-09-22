const {MongoMemoryServer} = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongodb;

beforeAll(async()=>{
    mongodb = await MongoMemoryServer.create();
    const uri = mongodb.getUri();
    await mongoose.connect(uri,{dbName:'testEvent'});
});

afterAll(async()=>{
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongodb.stop()
});

afterEach(async()=>{
    const collections = mongoose.connection.collections;
    for(const key in collections){
        const collection =collections[key];
        await collection.deleteMany()
    }
});