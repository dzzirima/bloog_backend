import Post from "../model/postModel.js";

export const createPOst = async (req, res, next) => {
  try {
    const { title, meta, content, slug, author, tags } = req.body;

    console.log(req.file);

    const newPost = new Post({ title, meta, content, slug, author, tags });

    await newPost.save();

    res.json(newPost);
  } catch (error) {
    next(error);
  }
};
