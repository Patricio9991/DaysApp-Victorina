import cron from 'node-cron'
import productoSchema from './model/producto.schema.js'
import { connectDB } from './DB.js'
import days from 'dayjs'
import fs from 'fs'
import { BotWpp } from './BotWpp.js'
import { restoreOrBackupMongo } from './backupMongoScript.js'
import { DB_PASSWORD ,DB_NAME } from './config/envStuff.js'





function CronBackgroundWorker(){
    
    cron.schedule('0 0 * * *',async()=>{
        
        console.log("ejecutando worker.js")
    
        const productos = await productoSchema.find()
        
        
        for(const item of productos){
    
            const ahora = days()
           
            // const diaAntes = days().subtract(1,'day')
            const diaCreacion = days(item.horaInicial)
            
            
        
            const tiempoTranscurrido = ahora.diff(diaCreacion,'days')
            
            if(tiempoTranscurrido > 0) {

                await productoSchema.findOneAndUpdate({productName:item.productName, fechaInicio:item.fechaInicio},{$push:{dias:item.dias.length+1}},{upsert:true})
                    
                if(item.dias.length >= 6 || (item.dias.length % 3 === 0 && item.dias.length > 6 ) ){
                        
                    await productoSchema.findOneAndUpdate({productName:item.productName, fechaInicio:item.fechaInicio},{revisado: !item.revisado},{upsert:true})

                }
            }
            
        }
        
        const productosArevisar = productos.filter((producto)=>{return producto.dias.length >= 6 || (producto.dias.length % 3 === 0 && producto.dias.length > 6 )})
        
        BotWpp(productosArevisar)
        restoreOrBackupMongo('backup',DB_PASSWORD,DB_NAME)
        
        
        
        
        const logMsg = `${new Date()} Cron job ejecutado correctamente\n`
        fs.appendFileSync("cronJobLogs.txt",logMsg)
        
    })
    
    
}





try {
    connectDB()
    CronBackgroundWorker()

    


} catch (error) {
    console.log(error)
}




