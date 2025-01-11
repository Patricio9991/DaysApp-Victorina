import express from 'express'
import { connectDB } from './DB.js'
import productoSchema from './model/producto.schema.js'
import cors from 'cors'
import days from 'dayjs'
import { qrCodeData } from './BotWpp.js'
import qrcodefunc from 'qrcode'




// import cron from 'node-cron'
// import fs from 'fs'
export const server = express()
const PORT = process.env.PORT || 3000

server.use(express.json())
server.use(cors())
server.use(express.static('public'))


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


server.get('/qr',async (req,res)=>{
        if (!qrCodeData) res.send('No fue posible generar el QR')
        
        try {
            const qrImage = await qrcodefunc.toDataURL(qrCodeData)
            res.send(`

                <!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" contenet="width=device-width, initial-scale=1.0">
                        <title>Escanea el QR</title>
                    </head>
                    
                    <body>
                        <h1>Escanea el código QR</h1>
                        <img src="${qrImage}" alt="QR Code" />
                    </body>
                </html>


                `)
        } catch (error) {
            console.log(error)
        }
    })



function capitalize(word){
    return word.charAt(0).toUpperCase()+word.slice(1,word.length)
}


server.post("/new",async (req,res)=>{
    let flagRes = false
    
    const {productName,fechaInicio,cantidad,unidades} = req.body
    console.log(req.body) 

    const ahora = new Date()

    const gmt3 = new Date(ahora.getTime() - 3 * 60 * 60 * 1000)
    console.log(gmt3.toISOString())

    const newProduct = new productoSchema({
        productName: capitalize(productName),
        fechaInicio: fechaInicio,
        horaInicial: gmt3.toISOString(),
        cantidad,
        unidades
        
    })

    console.log(newProduct)

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
    const {nombreAnterior,nuevoNombre,fechaInicio} = req.body
    console.log(req.body)
    try{

        const finder = await productoSchema.findOneAndUpdate({productName:nombreAnterior, fechaInicio:fechaInicio},{productName:capitalize(nuevoNombre)})
        res.json({"message":"Producto Editado"})
    
        
    } catch(e){
        console.log(e)
    }

    

})



// cron.schedule('0 0 * * *',async()=>{
    
//     try{
//         const productos = await productoSchema.find()
        
        
//         for(const item of productos){
 
//             const ahora = days()
//             console.log(ahora)
//             // const diaAntes = days().subtract(1,'day')
//             const diaCreacion = days(item.horaInicial).subtract(1,'days')
//             console.log(diaCreacion);
            
      
//             const tiempoTranscurrido = ahora.diff(diaCreacion,'days')
//             console.log(tiempoTranscurrido)
//             if(tiempoTranscurrido > 0) {

//                 await productoSchema.findOneAndUpdate({productName:item.productName, fechaInicio:item.fechaInicio},{$push:{dias:item.dias.length+1}},{upsert:true})
                    
//                 if(item.dias.length > 6 || item.dias.length % 3 === 0){
                        
    
//                     await productoSchema.findOneAndUpdate({productName:item.productName, fechaInicio:item.fechaInicio},{revisado: !item.revisado},{upsert:true})
//                 }
//             }
            
            
                
//         }
//         console.log('Cron job ejecutado correctamente');
//         const logMsg = `${new Date()} Cron job ejecutado correctamente\n`
//         fs.appendFileSync("cronJobLogs.txt",logMsg)
//     }catch (e){
//         console.log(e)
//     }
// })