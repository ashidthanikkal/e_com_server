const mongoose=require('mongoose')

const wishlistSchema={
    uid:{
        type:String,
        required:true
    },
    id:{
        type:Number,
        unique:true,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    rating:{
        rate:{
            type:Number,
            required:true
        },
        count:{
            type:Number,
            required:true
        }
    }
}

const wishlists=mongoose.model('wishlists',wishlistSchema)
module.exports=wishlists