import express from 'express'
import { connectDB } from './DB.js'
import productoSchema from './model/producto.schema.js'
import cors from 'cors'
import days from 'dayjs'


const server = express()
const PORT = 4000

server.use(express.json())
server.use(cors())


try {
    connectDB()

    server.listen(PORT,()=>{
        console.log(`Server on port: ${PORT}`)
    })

} catch (error) {
    console.log(error)
}



server.get('/allProducts',async(req,res)=>{

    const dataDB = await productoSchema.find({})

    dataDB ? res.json(dataDB) : res.json({"mensaje":"No se pudo traer la info de la db"})


})



function capitalize(word){
    return word.charAt(0).toUpperCase()+word.slice(1,word.length)
}


server.post("/new",async (req,res)=>{
    let flagRes = false
    const {productName,fechaInicio} = req.body
    console.log(req.body) 

     

    const newProduct = new productoSchema({
        productName: capitalize(productName),
        fechaInicio
    })


    try{
        await newProduct.save().then(()=>flagRes = true)

        if (flagRes) res.json({mensaje:"Producto Creado"})
        

    }catch(e){
        console.log(e._message) 
    }

    
    

})


server.put('/sumarDia',async(req,res)=>{
    const {productName,fechaInicio,dias,revisado} = req.body
    console.log(req.body)
    try{

        const finder = await productoSchema.findOneAndUpdate({productName:productName, fechaInicio:fechaInicio},{$push:{dias:dias},revisado:revisado},{upsert:true})
        res.json(finder)
    
        
    } catch(e){
        console.log(e)
    }

    

})


server.put('/revisado',async(req,res)=>{
    const {productName,fechaInicio,dias,revisado} = req.body

    const diaRevision = days().format('DD/MM/YYYY')

    const finder = await productoSchema.findOneAndUpdate({productName:productName, fechaInicio:fechaInicio},{fechaRevision:diaRevision, revisado:revisado},{new:true})

    res.json({"msg":"Revisado"})

    

})

server.put('/eliminarProducto',async(req,res)=>{
    const {productName,fechaInicio} = req.body
    console.log(req.body)
    try{

        const finder = await productoSchema.deleteOne({productName:productName, fechaInicio:fechaInicio})
        res.json({"message":"Producto Eliminado"})
    
        
    } catch(e){
        console.log(e)
    }

    

})