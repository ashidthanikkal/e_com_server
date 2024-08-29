const products = require("../models/productsModel");

exports.getProducts=async(req,res)=>{
   const searchQuery=req.query.search
   const query={
      title:{
         $regex:searchQuery,$options:'i'
      }
   }
   
   try{
      const allproducts= await products.find(query)
   if(allproducts){
    res.status(200).json(allproducts)
   }}
   catch(err){
    res.status(400).json("all products api failed")
   }

}

exports.getSingleproduct=async(req,res)=>{
   const {id}=req.params 
   try{
   const product=await products.findOne({id})
   if(product){
      res.status(200).json(product)
   }}
   catch(err){
      res.status(400).json(err)
   }
}