import User from "../models/UserModel.js"
import argon2 from 'argon2'

const getUsers = async(req, res)=>{
    try {
        const response = await User.findAll({
            attributes:['uuid', 'name', 'email', 'role']
        });
        res.status(200).json(response)
    } catch (error){
        res.status(500).json({msg: error.message});
    } 
}
const getUserById =async (req, res)=>{
    try {
        const response = await User.findOne({
            attributes:['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message});
    }

}
const createUsers = async(req, res)=>{
    const {name , email, password, confPassword, role} = req.body;
    if(password !== confPassword)
        return res.status(400).json({msg: "Password do not match Confirm Password"})
    const hashPassword = await argon2.hash(password);

    try {
        await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role,
        });

        res.status(201).json({msg: "User registered successfully"})
    } catch (error) {
        res.status(500).json({msg: error.message});
    }

}
const updateUsers = async(req, res)=>{
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    const {name, email, password, confPassword, role} = req.body;
    let hashPassword;
    if(password === "" || password === null){
        hashPassword = user.password
    }else{
        hashPassword = await argon2.hash(password);
    }
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    try {
        await User.update({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        },{
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }

}

const deleteUser = async(req, res) =>{
        const user = await User.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
        try {
            await User.destroy({
                where:{
                    id: user.id
                }
            });
            res.status(200).json({msg: "User Deleted"});
        } catch (error) {
            res.status(400).json({msg: error.message});
        }
}

const getTotalUsers = async (req, res) => {
    try {
      const totalUsers = await User.count(); // Compte le nombre total d'utilisateurs
      res.status(200).json(totalUsers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la récupération du nombre total d\'utilisateurs' });
    }
  };
  
export{
    getUserById,
    getUsers, 
    createUsers,
    updateUsers, 
    deleteUser,
    getTotalUsers
}