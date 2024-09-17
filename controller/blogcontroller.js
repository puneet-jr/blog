// const asyncHandler = require("express-async-handler");

// const blog = require("../model/blog");
// const User = require("../model/model");
// const mongoose= require("mongoose");

// const getblogs= asyncHandler(async(req,res,next)=>{
//     let Blogs;
//     try{
//         Blogs= await blog.find();
//     } catch(err)
//     {
//         console.log(err);
//         return res.status(500).json({message:"Server error"});
//     }
//     if(!Blogs)
//     {
//         return res.status(404).json({message:"No blog found"});
//     }
//     return res.status(200).json(Blogs);
// });

// const postblog= asyncHandler(async(req,res,next)=>{

//     const {title,description,image,user}=req.body;

//     let userexist;
//     try{
//         userexist= await User.findById(user); // check the names correctly

//     } catch(err)
//     {
//        return  console.log(err);
    
//     }
//     if(!userexist)
//     {
//         return res.status(404).json({message:"User not found"});
//     }


//     const Blog= new blog({
//         title,
//         description,
//         image,
//         user,
//     });
//     try{
//        const session= await mongoose.startSession();
//          session.startTransaction();
//             await Blog.save({session});
//             userexist.blogs.push(Blog);
//             await userexist.save({session});
//             await session.commitTransaction();
//     } catch(err)
//     {
//      console.log(err);
//      return res.status(500).json({message:err});
//     }
//         return res.status(200).json({Blog});

// });

// const updateblog=asyncHandler(async(req,res,next)=>{

//     const {title,description}=req.body;
//     const blogid=req.params.id;
//     let Blogg;

//     try{
//         Blogg= await blog.findById(blogid,{title,description} );

//     } catch(err)
//     {
//         console.log(err);
//         return res.status(500).json({message:"server error"});
//     }

//     if(!Blogg)
//     {
//         return res.status(404).json({message:"Blog not found"});
//     }
//     return res.status(200).json({Blogg});
// });

// const getblogbyid=asyncHandler(async(req,res,next)=>{
//     const blogid=req.params.id;
//     let Blogg;

//     try{
//         Blogg= await blog.findById(blogid);
//     } catch(err)
//     {
//         console.log(err);
//         return res.status(500).json({message:"server error"});
//     }
//     if(!Blogg)
//     {
//         return res.status(404).json({message:"Blog not found"});
//     }
//     return res.status(200).json({Blogg});
// });

// const deleteblog=asyncHandler(async(req,res,next)=>{
//         const id = req.params.id;
//         let delblog;
//         try{
//             delblog= await blog.findByIdAndRemove(id).populate("user");
//             await deblog.user.blog.pull(delblog);
//         } catch(err)
//         {
//           return  console.log(err);  
//         }

//         if(!delblog)
//         {
//             return res.status(404).json({message:"Blog not found"});

//         }
//         return res.status(200).json({message:"Blog deleted"});
// });
// module.exports= {getblogs,postblog, updateblog,getblogbyid,deleteblog};
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Blog = require("../model/blog");
const User = require("../model/model");

const getblogs = asyncHandler(async (req, res) => {
    let Blogs;
    try {
        Blogs = await Blog.find();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
    if (!Blogs) {
        return res.status(404).json({ message: "No blog found" });
    }
    return res.status(200).json(Blogs);
});

const postblog = asyncHandler(async (req, res) => {
    const { title, description, image, user: userId } = req.body;

    let userexist;
    try {
        userexist = await User.findById(userId);
        if (!userexist) {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }

    const Blog = new Blog({
        title,
        description,
        image,
        user: userId,
    });

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        await Blog.save({ session });
        userexist.blogs.push(Blog);
        await userexist.save({ session });
        await session.commitTransaction();
        session.endSession();
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
    return res.status(201).json({ Blog });
});

const updateblog = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const blogid = req.params.id;
    let Blogg;

    try {
        Blogg = await Blog.findByIdAndUpdate(blogid, { title, description }, { new: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }

    if (!Blogg) {
        return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({ Blogg });
});

const getblogbyid = asyncHandler(async (req, res) => {
    const blogid = req.params.id;
    let Blogg;

    try {
        Blogg = await Blog.findById(blogid);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
    if (!Blogg) {
        return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({ Blogg });
});

const deleteblog = asyncHandler(async (req, res) => {
    const id = req.params.id;
    let delblog;
    try {
        delblog = await Blog.findByIdAndDelete(id).populate("user");
        if (delblog && delblog.user) {
            await User.updateOne(
                { _id: delblog.user },
                { $pull: { blogs: delblog._id } }
            );
        await delblog.user.save();
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }

    if (!delblog) {
        return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({ message: "Blog deleted" });
});

const getblogbyuser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    let Blogs;
    try {
        Blogs = await Blog.find({ user: userId }).populate("Blog");
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
    if (!Blogs || Blogs.length === 0) {
        return res.status(404).json({ message: "No blog found" });
    }
    return res.status(200).json({blogs:Blogs});
});

module.exports = { getblogs, postblog, updateblog, getblogbyid, deleteblog,getblogbyuser };