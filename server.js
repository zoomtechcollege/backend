import express from 'express'
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()
import connectDB from "./config/db.js"

connectDB()

const app = express()
app.use(express.json())
app.use(cors())

import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"

app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)

app.get('/', (req, res) => {
    res.json({ message: 'Hahaa Someting has changed' })
})

app.listen(3001, () => {
    console.log('Server is running on port 3001')
})