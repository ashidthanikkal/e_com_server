const carts = require("../models/cartModel")

exports.addToCart=async(req,res)=>{
    const {id,title,price,description,category,image,rating,quantity}=req.body
    const uid=req.payload
    try{
       const existingProduct=await carts.findOne({uid,id})
       if(existingProduct){
        existingProduct.quantity+=1
        existingProduct.grandTotal=existingProduct.price*existingProduct.quantity
        await existingProduct.save()
        res.status(200).json(`${title} cart item quantity incremented`)

       }
       else{
        const newProduct=new carts({
           uid,id,title,price,description,category,image,rating,quantity,grandTotal:price
        })
        await newProduct.save()
        res.status(200).json(`${title} product is added in cart`)
       }
    }
    catch(err){
        res.status(400).json(err)
    }
}

exports.getCart=async(req,res)=>{
    const uid=req.payload
    try{
       const products=await carts.find({uid})
       if(products){
        res.status(200).json(products)
       }
    }
    catch(err){
        res.status(400).json(err)
    }
}

exports.removeCart=async(req,res)=>{
    const {_id}=req.params
    try{
        await carts.deleteOne({_id})
        res.status(200).json("product removed from cart")
    }
    catch(err){
        res.status(400).json(err)
    }
}

exports.incrementCart=async(req,res)=>{
    const {_id}=req.params

    try{
        const existingItem=await carts.findOne({_id})
        if(existingItem){
            existingItem.quantity+=1
            existingItem.grandTotal=existingItem.price*existingItem.quantity

            await existingItem.save()
            res.status(200).json("cart item incremented")
        }
        else{
            res.status(400).json("product not found")
        }
    }
    catch(err){
        res.status(400).json(err)
    }
}

exports.decrementCart=async(req,res)=>{
    const {_id}=req.params

    try{
        const existingItem=await carts.findOne({_id})
        if(existingItem){
            existingItem.quantity-=1
            if(existingItem.quantity==0){
                await carts.deleteOne({_id})
                res.status(200).json("cart item removed")

            }
            else{
                res.status(200).json("cart item incremented")
                existingItem.grandTotal=existingItem.price*existingItem.quantity
                await existingItem.save()    
            }
        }
        else{
            res.status(400).json("product not found")
        }
    }
    catch(err){
        res.status(400).json(err)
    }
}

exports.emptyCart=async(req,res)=>{
    const uid=req.payload
    try{
        await carts.deleteMany({uid})
        res.status(200).json("cart items removed")
    }
    catch(err){
        res.status(400).json(err)
    }
}


