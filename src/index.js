require('dotenv').config()
const http = require('http');
const app = require('./app');
const connectDB = require('./db/connectDB');

const server = http.createServer(app);


const PORT = process.env.PORT || 5000

const main = async () =>{
    try {
        await connectDB()
        server.listen(PORT,()=>{
            console.log(`server is listening on  ${PORT}`)
        })
    } catch (e) {
        console.log('db error')
        console.log(e.reason.servers)
    }
    
}

main()