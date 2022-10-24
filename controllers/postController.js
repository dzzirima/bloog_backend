import Post from "../model/postModel.js";
import FeaturedPost from "../model/featuredPost.js";


const FEATURED_POST_COUNT = 4 ;  


const addToFeaturedPost = async(postId) =>{
    const featuredPost = new FeaturedPost({
        post:postId
    })

    await featuredPost.save()

     const featuredPosts = await FeaturedPost.find({}).sort({createdAt: -1})
     featuredPosts.forEach( async (post, index) =>{
        if(index >= FEATURED_POST_COUNT){
            await FeaturedPost.findByIdAndDelete(post._id)
        }
     })

}

export const createPOst = async (req, res, next) => {
  try {
    const { title, meta, content, slug, author, tags ,featured} = req.body;

    console.log(req.file);

    const newPost = new Post({ title, meta, content, slug, author, tags, featured });

    await newPost.save();


    /**
     * creating a fetured posts
     * we want to maintain only 4 featured posts
     * if we add the fifth  one we want to remove the other on
     */

    if(featured) await addToFeaturedPost(newPost._id)

    res.json(newPost);
  } catch (error) {
    console.log(error)
    next(error);
  }
};
