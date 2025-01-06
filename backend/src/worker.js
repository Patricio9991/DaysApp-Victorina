import cron from 'node-cron'
import productoSchema from './model/producto.schema.js'
import { connectDB } from './DB.js'
import days from 'dayjs'
import fs from 'fs'


console.log("ejecutando worker.js")

function CronBackgroundWorker(){

    cron.schedule('* * * * *',async()=>{
    
    
        const productos = await productoSchema.find()
        
        
        for(const item of productos){
    
            const ahora = days()
            console.log(ahora)
            // const diaAntes = days().subtract(1,'day')
            const diaCreacion = days(item.horaInicial)
            console.log(diaCreacion);
            
        
            const tiempoTranscurrido = ahora.diff(diaCreacion,'days')
            console.log(tiempoTranscurrido)
            if(tiempoTranscurrido > 0) {

                await productoSchema.findOneAndUpdate({productName:item.productName, fechaInicio:item.fechaInicio},{$push:{dias:item.dias.length+1}},{upsert:true})
                    
                if(item.dias.length > 6 || item.dias.length % 3 === 0){
                        
    
                    await productoSchema.findOneAndUpdate({productName:item.productName, fechaInicio:item.fechaInicio},{revisado: !item.revisado},{upsert:true})
                }
            }
            
            
                
        }
        console.log('Cron job ejecutado correctamente');
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




