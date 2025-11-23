import mongoose from "mongoose";


const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB is connected to shop database")
    } catch (error) {
        console.error("Error connecting to MDB shop: ", error)
        process.exit('1')
    }
}

export default connectMongoDB