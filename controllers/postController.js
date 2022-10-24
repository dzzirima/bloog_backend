import  Post from "../model/postModel.js"

export const  createPOst   = async (req, res) =>{

    const {title , meta, content, slug, author,tags} = req.body


    console.log(req.file)


    const newPost = new  Post({title , meta, content, slug, author,tags})

    res.json(newPost)


}