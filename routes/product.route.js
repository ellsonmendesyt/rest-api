const express = require('express');
const router= express.Router();
const Product = require('../models/product.model');
const mongoose= require('mongoose');
const createError = require('http-errors');


router


.get("/",async(req,res,next)=>{

    try {
        //find(query,projection,options)
        const products=await Product.find({},{__v:0},{sort:{name:1}});
        console.log(products)
        res.json({products});
        
    } catch (error) {
        console.log(error)
        next(error)
    }
})




// Obter um produto
.get("/:id",async(req,res,next)=>{
    
    try {
        const id= req.params.id;
        // const product=await Product.findById(id)
        const product= await Product.findOne({_id:id});
        if(!product)throw new Error("Product not found");

        res.send(product);
        
    } catch (error) {
        console.log(error)
        if(error instanceof mongoose.CastError){
            error.status=400;
            error.message="Invalid id";
            next(error);
            return; 
        }
        next(error)
    }
})





.patch("/:id",async(req,res,next)=>{
    
    try {
        const {id}= req.params;
         const updates=req.body;
        const result= await Product.findByIdAndUpdate(id,updates,{new:true});
        if(!result)throw new Error("Unable to update product");
        return res.send(result);
        
    }catch (error) {
        if(error instanceof mongoose.CastError){
            error.status=400;
            error.message="Invalid id";
            next(error);
            return; 
        }
        next(error)
       
    }
   
})






// DELETAR UM PRODUTO
.delete("/:id",async(req,res,next)=>{
 const {id}= req.params;

   try {
       const result= await Product.findByIdAndDelete(id);
         if(!result)throw new Error("Unable to delete the product");

         return res.send(result);
   } catch (error) {
    if(error instanceof mongoose.CastError){
        // error.status=400;
        // error.message="Invalid id";
        next(createError(400,error.message));
        return; 
    }
       next(error);
       
   }   
})






// CRIAR UM PRODUTO
.post("/",async(req,res,next)=>{

   try {
       const product = new Product(req.body);
       const result= await product.save();
       res.send(result)

   } catch (error) {
    if(error.name==="ValidationError"){
    
    next(createError(422,error.message));
    return;
    }
    next(error);
     console.log(error.message);
   }    
})



module.exports=router;