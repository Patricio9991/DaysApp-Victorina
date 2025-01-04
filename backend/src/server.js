import express from 'express'
import { connectDB } from './DB.js'
import productoSchema from './model/producto.schema.js'
import cors from 'cors'
import days from 'dayjs'
import cron from 'node-cron'

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
        fechaInicio,
        horaInicial: days()
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


server.put('/editarProducto',async(req,res)=>{
    const {productName,fechaInicio,newName} = req.body
    console.log(req.body)
    try{

        const finder = await productoSchema.findOneAndUpdate({productName:productName, fechaInicio:fechaInicio},{productName:newName})
        res.json({"message":"Producto Eliminado"})
    
        
    } catch(e){
        console.log(e)
    }

    

})


cron.schedule('0 0 * * *',async()=>{
    try{
        const productos = await productoSchema.find()
        
        
        for(const item of productos){
 
            
             
            await productoSchema.findOneAndUpdate({productName:item.productName, fechaInicio:item.fechaInicio},{$push:{dias:item.dias.length+1}},{upsert:true})
                
            if(item.dias.length > 6 || item.dias.length % 3 === 0){
                    

                await productoSchema.findOneAndUpdate({productName:item.productName, fechaInicio:item.fechaInicio},{revisado: !item.revisado},{upsert:true})
            }
            
            console.log(item)
                
        }

    }catch (e){
        console.log(e)
    }
})