const express = require('express');
const productRoute=require('./routes/product.route');

const morgan = require('morgan');
require('dotenv').config();
const { connect } = require('./connection');
const app = express();
app.use(express.json())
app.use(morgan('dev'))






/*------------------------------------------------------
encaminhar toda requisição que vier para /api/products
para a rota  productRoute
------------------------------------------------------*/
app.use("/api/products",productRoute);







const  listen=async()=>{
 const conn=await connect(process.env.DB)
 if(conn){
        app.listen(process.env.PORT,()=>{
            console.log('server is running on port',process.env.PORT);
        })
 }
}





app.use((req,res,next)=>{
    const error= new Error('Not found');
    error.status=404;
    next(error)
    
})

/*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 SE NENHUMA OUTRO CONSEGUIU TRATAR A REQUISIÇÃO
 ESSE MIDDLEWAR VAI TRATAR
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx*/
app.use((error,req,res,next)=>{
 if(error){
        res.status(error.status || 500);
        res.json({error:{message:error.message,status:error.status}})
}})

listen();