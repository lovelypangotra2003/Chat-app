import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const signup = async (req, res) => {
    try {
        const{fullName, username, password, confirmPassword,gender} = req.body;//added middleware in server.js to facilitate this
        if(password !== confirmPassword){
            return res.status(400).json({ error: "Passwords don't match" });
        }
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }
        // HASH PASSCODE HERE(using api )
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        // https://avatar-placeholder.iran.liara.run/
        const boyPfp = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlPfp = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser = new User({
            fullName,
            username,
            password : hashedPassword,
            gender,
            profilePic: gender === "male" ? boyPfp:girlPfp
        });
        if(newUser)
        {
            //Generate JWT token
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({
            _id : newUser._id,
            fullName : newUser.fullName,
            username : newUser.username,
            profilePic : newUser.profilePic
        });}
        else{
            res.status(400).json({error:"invalid user data"});
        }
    } 
    catch (error) {
        console.log("Error in signup controller", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
};

// export const login = async (req,res) => { 
//     try
//     {
//         const{username, password} = req.body;
//         const user = await User.findOne({ username });
//         const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
//         if (!user || !isPasswordCorrect) {
//             return res.status(400).json({ error: "Invalid Credentials" });
//         }
//         generateTokenAndSetCookie(user._id,res);
//         res.status(200).json({
//             _id : user._id,
//             fullName : user.fullName,
//             username : user.username,
//             profilePic : user.profilePic,
//         });
//     }
    
//     catch(error){
//         console.log("Error in login controller", error.message)
//         res.status(500).json({error:"Internal Server Error"})
//     }

// };
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Find the user first
        const user = await User.findOne({ username });
        
        // If user doesn't exist, return an error
        if (!user) {
            return res.status(400).json({ error: "Invalid User" });
        }
        
        // Compare the password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        
        // If password is incorrect, return an error
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid Password match!" });
        }
        
        // If login is successful, generate token and set cookie
        generateTokenAndSetCookie(user._id, res);
        
        // Return user details in response
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logout = async(req,res) => {
    try {
        res.cookie("jwt","",{maxAge:0});
        return res.status(200).json({ message: "Logged out successfully!" });
    } 
    catch (error) {
        console.log("Error in loggin out controller", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
};
//bm fs a e g d em 