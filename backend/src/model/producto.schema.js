import mongoose from 'mongoose'
import {TEST} from '../config/envStuff.js'


console.log(TEST)

let switchToTest = JSON.parse(TEST)
console.log(switchToTest)
console.log("----------------------")

let collectionTarget = switchToTest ? "tests" : "productos"
console.log(collectionTarget)

collectionTarget === "productos" ? console.log("Modo produccion") : console.log("Estamos en modo test") 

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
    },
    cantidad:Number,
    unidades:String

})



export default mongoose.model(collectionTarget,productoSchema)