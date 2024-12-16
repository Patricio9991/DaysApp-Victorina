import express from 'express'
import { connectDB } from './DB.js'
import productoSchema from './model/producto.schema.js'
import cors from 'cors'



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
    const {productName,fechaInicio,dias} = req.body

    try{

        const finder = await productoSchema.findOne({productName:productName, fechaInicio:fechaInicio})
        finder.dias.push(dias)
        await finder.save()
        console.log(finder)
    } catch(e){
        console.log(e)
    }

    

})