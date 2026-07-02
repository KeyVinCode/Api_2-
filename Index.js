import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./Config/db.js"
import userRoutes from "./Routes/user.routes.js"
import authRoutes from "./Routes/auth.routes.js";

dotenv.config()
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
