import { json } from"body-parser"
import User from '../Models/user.model.js'
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken'


// --- REGISTER ---
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Encriptamos la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "Usuario registrado con éxito" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// --- LOGIN ---
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        // Verificamos contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Contraseña incorrecta" });

        // Generamos el Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//! obtener todo los usuarios 

export const getUser = async(req,res) => {
    try{
        const user = await User.find()
        res.json(user)
    } catch (error){
        res.status(500).json({menssage: error.menssage})
    }
}

// ! Crear un nuevo ususrio 

export const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    
    // Validar que la contraseña exista
    if (!password) {
        return res.status(400).json({ message: "La contraseña es obligatoria" });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// ! Actualizar un usuario exitente 

export const updateUser = async (req,res) => {
    const {id} = req.params
    const {name,email} = req.body

    try{
        const updateUser = await User.findByIdAndUpdate(
            id,
            {name,email},
            {new: true}
        ); 
        if(!updateUser){
            return res.status(400).json({ message: 'usuario no registrado'}) 
        }
        res.json(updateUser)
    }catch(error){
        res.status(400).json({message: error.message})
    }
}


//! Eliminar un ususario 

export const deleteUser = async (req,res) => {
    const {id } = req.params

    try{
        const deleteUser = await User.findByIdAndDelete(id)

        if (!deleteUser){
            return res.status(400).json({message: 'usuario no encontrado'})
        }

        res.json({message: "Usuario eliminado correctamenten"})

    }catch (error){
        res.status(400).json({messages:error.message})
    }
}


export default  {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    login,
    register
}

