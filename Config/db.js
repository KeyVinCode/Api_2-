const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Base de datos conectada")
    }catch(error){
        console.error("El error real de Mongo es:", error);
        console.log("Error al conectar con la base de datos ")
        process.exit(1)
    }
}

module.exports = connectDB