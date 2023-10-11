import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import Router from "./routes/routes.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/', Router)

mongoose.connect("mongodb+srv://admin:admin123@cluster0.s2gtnmo.mongodb.net/?retryWrites=true&w=majority").then((db)=>{
    console.log("Database connected");
})


app.listen(8000, () => {
    console.log("Server started on port 8000")
})