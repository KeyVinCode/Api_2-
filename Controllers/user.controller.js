import { json } from"body-parser"
import User from '../Models/user.model.js'


//! obtener todo los usuarios 

export const getUser = async(req,res) => {
    try{
        const user = await User.find()
        res.json(users)
    } catch (error){
        res.status(500).json({menssage: error.menssage})
    }
}

// ! Crear un nuevo ususrio 

export const createUser = async (req,res) => {
    const {name,email} = req.body
    try{
        const newUser  = new User ({name,email})
        await newUser.save()
        res.status(201).json(newUser)
    }catch (error){
        res.status(400).json({message: error.message})
    }
}
// ! Actualizar un usuario exitente 

export const updateUser = async (req,res) => {
    const {id} = req.params
    const {name,email} = req.body

    try{
        const updateUser = await User.findByIdandUpdate(
            id,
            {name,email},
            {new: true}
        ); 
        if(!updaetUser){
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
        const deleteUser = await User.findByIdanDelete(id)

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
    deleteUser
}

