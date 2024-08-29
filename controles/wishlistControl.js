const wishlists = require("../models/wishlistModel");

exports.addToWishlist=async(req,res)=>{
    const {id,title,price,description,category,image,rating}=req.body
    const uid=req.payload
    try{
       const item=await wishlists.findOne({uid,id})
       if(item){
        res.status(406).json('product alrady present in wishlist')

       }
       else{
        const newItem=new wishlists({
           uid,id,title,price,description,category,image,rating
        })
        await newItem.save()
        res.status(200).json(`${title} product is added in wishlist`)
       }
    }
    catch(err){
        res.status(400).json(err)
    }
}

exports.getWishlist=async(req,res)=>{
    const uid=req.payload
    try{
       const products=await wishlists.find({uid})
       if(products){
        res.status(200).json(products)
       }
    }
    catch(err){
        res.status(400).json(err)
    }
}

exports.removeWishlist=async(req,res)=>{
    const {_id}=req.params
    try{
        await wishlists.deleteOne({_id})
        res.status(200).json("product removed from wishlist")
    }
    catch(err){
        res.status(400).json(err)
    }
}