import mongoose from "mongoose";
import dotenv from 'dotenv'


dotenv.config()
const uriCluster = process.env.MONGO_CLUSTER_URI
console.log(uriCluster)

export async function connectDB(){
    mongoose.connect(uriCluster)
    console.log("Conectado a DB")
}
