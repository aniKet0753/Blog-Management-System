import express from 'express';
import Post from "../models/Post.js";

const router =  express.Router();

router.get("/", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 100;

    const posts = await Post.find()
      .skip((page - 1) * limit)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    res.status(200).json({
      success: true,
      page,
      limit,
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      data: posts,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


router.get("/export/csv", async (req, res) => {
  try {
    const posts = await Post.find();

    // Convert posts to CSV format
    let csv = "Title,Content,Author,Date\n";
    posts.forEach((post) => {
      csv += `"${post.title}","${post.content}","${post.author}","${post.date}"\n`;
    });
    res.header("Content-Type", "text/csv");
    res.attachment("posts.csv");
    res.send(csv);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/search", async (req, res) => {
  try {
    const q = req.query.q || "";

    const posts = await Post.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { author: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
      ],
    });

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);//search for a post by its id in the database

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body);
    const post = new Post(req.body);//create a new post using the data from the request body
    await post.save();

    res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error) {
  console.log(error);

  res.status(500).json({
    success: false,
    message: error.message,
  });
}
});

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {//update a post by its id using the data from the request body
       returnDocument: "after",
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);//delete a post by its id

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      data: post,
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


export default router;