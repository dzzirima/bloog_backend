import * as dotenv from 'dotenv'

dotenv.config()
import express from "express"
import "./db/index.js"
import postRoutes from "./routes/postRoutes.js"
import morgan from 'morgan'



const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use('/api/post',postRoutes)

const PORT = process.env.PORT

app.listen(PORT , () =>{
    console.log("app is running on port " + PORT)
    
})

