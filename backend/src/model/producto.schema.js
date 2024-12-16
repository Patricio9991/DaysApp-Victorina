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
    dias:{
        type:[],
        default: 1
    }

})


export default mongoose.model("productos",productoSchema)