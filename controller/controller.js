const asyncHandler = require("express-async-handler");

const bcrypt = require("bcryptjs");
const User = require("../model/model");

const getuser = asyncHandler(async (req, res) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
    if (!users) {
        return res.status(404).json({ message: "No user found" });
    }
    return res.status(200).json(users);
});

const postuser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    let existuser;
    try {
        existuser = await User.findOne({ email });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }

    if (existuser) {
        return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword  = await bcrypt.hash(password,12);

    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs:[],
    });
  
    try {
        await user.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }

    return res.status(201).json({ user });
});

const login=asyncHandler(async(req,res,next)=>{

    const {email,password}= req.body;
    let existuser;
    try{
        existuser= await User.findOne({email});
    } catch(err)
    {
        return console.log(err);
    }
    if(!existuser)
    {
        return res.status(400).json({message:"Invalid credentials"});
    }

    const ispasswordcorrect = await bcrypt.compare(password,existuser.password);

    if(!ispasswordcorrect)
    {
        return res.status(400).json({message:"Invalid password "});
    }
    return res.status(200).json({message:"Login successful"});
});

module.exports = { getuser, postuser,login };