import mongoose from 'mongoose'


const productoSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    fechaInicio:{
        type:String,
        required:true
    },
    dias:Number

})


export default mongoose.model("productos",productoSchema)