require('dotenv').config()

const express=require('express')
const cors=require('cors')
const router = require('./Routes/routes')

const ecomApp=express()

ecomApp.use(cors())
ecomApp.use(express.json())
require('./connections/connection')
ecomApp.use(router)

const PORT=8000 || process.env.port
ecomApp.listen(PORT,()=>{
    console.log(`______Ecommerce App running at Port ${PORT}_____`);
})