const Product = require("../models/product.model");
const createError=require("http-errors");



const getAllProducts = async function(req, res,next) {
        try {
            const products=await Product.find({},{__v:0});
            if(products.length===0)throw new Error("No products found");

            res.json({products});
            
        } catch (error) {
            console.log(error)
            next(error)
        }
}


const getProductById= async(req,res,next)=>{
    
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
}

const updateProduct=async(req,res,next)=>{
    
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
   
}


const deleteProduct=async(req,res,next)=>{
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
   }


const createProduct=async(req,res,next)=>{

    try {
        const product = new Product(req.body);
        const result= await product.save();
        res.send(result)
 
    } catch (error) {
     if(error.name==="ValidationError"){
     
     next(createError(422,error.message));
     return;
     }

     if(error.code==11000){
      next(createError(409,error.message));
      return; 
    }

     next(error);
    }    
 }

module.exports={
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    createProduct
}