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
    fechaRevision:{
            type:String,
            default: 0
    },
    dias:{
        type:[],
        default: 1
    },
    revisado:{
        type:Boolean,
        default:true
    },
    horaInicial:{
        type:String
    }

})


export default mongoose.model("productos",productoSchema)