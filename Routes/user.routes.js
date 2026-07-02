import express from "express";
import {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  login,
  register,
} from "../Controllers/user.controller.js";
import authMiddleware from "../Middleware/auth.middleware.js"; // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Rutas públicas
router.post("/register", register);
router.post("/login", login);

// Rutas protegidas (requieren token)
router.get("/", authMiddleware, getUser);
router.post('/', authMiddleware, createUser);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

export default router;
