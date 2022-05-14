const express = require('express');
const router= express.Router();
const Product = require('../models/product.model');
const mongoose= require('mongoose');
const createError = require('http-errors');

const {
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    createProduct

} = require('../controllers/product.controller');

router
.get("/",getAllProducts)




// Obter um produto
.get("/:id",getProductById)





.patch("/:id",updateProduct)






// DELETAR UM PRODUTO
.delete("/:id",deleteProduct)






// CRIAR UM PRODUTO
.post("/",createProduct)



module.exports=router;