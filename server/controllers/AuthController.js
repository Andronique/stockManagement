import argon2 from "argon2";
import User from "../models/UserModel.js";

export const Login = async (req, res) => {
    try {
        // Find user by email
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });
     
        // If the user is not found
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }
        
        // Verify password
        console.log('mandeha')
        const match = await argon2.verify(user.password, req.body.password);
        if (!match) {
            return res.status(400).json({ msg: "Wrong Password" });
        }
      
        // Store user ID in session
        req.session.userId = user.uuid;
        console.log('mandeha')

        // Return user information
        const { uuid, name, email, role } = user;
        res.status(200).json({ uuid, name, email, role });

    } catch (error) {
        // Log error and send error response
        console.log(error);
        return res.status(500).json({ msg: "An error occurred during login" });
    }
};


export const Me = async (req, res) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Please log in to your account!"});
    }
    const user = await User.findOne({
        attributes:['uuid','name','email','role'],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User not found"});
    res.status(200).json(user);
}


export const logOut = async(req, res)=>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: 'User logged not found'})
        res.status(200).json({msg: 'User logout successfully'})
    })
}