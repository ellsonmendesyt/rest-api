const mongoose = require("mongoose");



const connect= async(dbConnectionString)=>{
    try {
        await mongoose.connect(dbConnectionString,{useNewUrlParser: true,useUnifiedTopology: true});
        const conn= mongoose.connection;
        console.log(`Connected to ✨ ${conn.name} database ✨`);
        return conn;
    } catch (error) {
        console.log(`Erro na conexão: ⚡ ${error.message}`)
    }
}











const conectar=async (dbConnectionString,server)=>{
    try {
        const conn=  await mongoose.connect(dbConnectionString,{useNewUrlParser: true});
        if(conn){
             console.log(`Conectado a base de dados  ✨ ${conn.connection.name} ✨`);
             server.listen(process.env.PORT,()=>{
             console.log('server is running on port',process.env.PORT);
         })}
    } catch (error) {
        console.log(`⚡ ${error.message}`)
    }
}

module.exports={conectar,connect};