const mongoose= require('mongoose');
const Schema= mongoose.Schema;



const ProductSchema= new Schema({
 name:{
    type:String,
    required:true,
    unique:true
 },
 price:{
    type:Number,
    required:true
 }
},{timestamps: true})

const Product= mongoose.model('Product',ProductSchema);
module.exports= Product;