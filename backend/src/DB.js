import mongoose from "mongoose";
import dotenv from 'dotenv'


dotenv.config()
const uri = process.env.MONGO_CLUSTER_URI

export async function connectDB(){
    mongoose.connect(uri)
    console.log("Conectado a DB")
}
