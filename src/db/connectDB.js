const mongoose = require('mongoose');
console.log(process.env.DB_CONNECTION_URL)
let connectionURL = process.env.DB_CONNECTION_URL
    connectionURL = connectionURL.replace('<username>',process.env.DB_USER);
    connectionURL = connectionURL.replace('<password>',process.env.DB_PASSWORD);
console.log(connectionURL);
    const connectDB = async() =>{
    await mongoose.connect(connectionURL,{dbName:process.env.DB_NAME});
    console.log('DB connected')
}


module.exports =  connectDB