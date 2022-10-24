import Post from "../model/postModel.js";
import FeaturedPost from "../model/featuredPost.js";
import cloudinary from "../cloud/index.js";
import { isValidObjectId } from "mongoose";

const FEATURED_POST_COUNT = 4;

const addToFeaturedPost = async (postId) => {
  /**
   * creating a fetured posts
   * we want to maintain only 4 featured posts
   * if we add the fifth  one we want to remove the other on
   */
  const isAreadyExist = await FeaturedPost.findOne({ post: postId });
  if (isAreadyExist) return;

  const featuredPost = new FeaturedPost({
    post: postId,
  });

  await featuredPost.save();

  const featuredPosts = await FeaturedPost.find({}).sort({ createdAt: -1 });
  featuredPosts.forEach(async (post, index) => {
    if (index >= FEATURED_POST_COUNT) {
      await FeaturedPost.findByIdAndDelete(post._id);
    }
  });
};

export const createPOst = async (req, res, next) => {
  try {
    const { title, meta, content, slug, author, tags, featured } = req.body;

    const newPost = new Post({
      title,
      meta,
      content,
      slug,
      author,
      tags,
      featured,
    });
    const { file } = req;

    const isAreadyExist = await Post.findOne({ slug });
    if (isAreadyExist)
      return res.status(401).json({
        error: "Please user unique slug",
      });

    if (file) {
      const { secure_url: url, public_id } = await cloudinary.uploader.upload(
        file.path
      );
      newPost.thumbnail = { url, public_id };
    }

    await newPost.save();

    if (featured) await addToFeaturedPost(newPost._id);

    res.json({
      post: {
        id: newPost._id,
        title,
        content,
        meta,
        slug,
        thumbnail: newPost?.url,
        author: newPost.author,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  const { postId } = req.params;

  if (!isValidObjectId(postId))
    return res.status(401).json({ error: "Invalid request" });

  /** whnen we delete the post we want to delete the thumbnail */

  const post = await Post.findById(postId);
  if (!post) return res.status(400).json({ error: "Post not found" });

  const  public_id  = post.thumbnail?.public_id;

  if (public_id) {
    const { result } = await cloudinary.uploader.destroy(public_id);
    if (result !== "ok")
      return res.status(404).json({ error: "Could not remove thumbnail !" });
  }

  await Post.findByIdAndDelete(postId)

  return res.json({message:'Post removed  successfully !!'})
};
