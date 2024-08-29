const mongoose=require('mongoose')
mongoose.connect(process.env.DATABASE).then(()=>{
    console.log("____MongoDB Atlas connected________");
}).catch(err=>{
    console.log(`______MongoDb Atlas Not Connected reason : ${err}_______`);
})