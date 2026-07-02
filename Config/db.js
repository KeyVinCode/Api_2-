import mongoose from 'mongoose'
import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

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

export default  connectDB