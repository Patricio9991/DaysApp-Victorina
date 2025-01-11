import pkg from 'whatsapp-web.js'
import qrcode from 'qrcode-terminal'
import qrcodefunc from 'qrcode'
import {server} from './server.js'



const {Client,LocalAuth} = pkg


let qrCodeData = null

export  function BotWpp(data){

    console.log("entrando en bot wpp")
    

    const client = new Client({
        authStrategy: new LocalAuth({
            dataPath:'sessionsFolder'
        })
    });
    
    client.on('qr', (qr) => {
        // Generate and scan this code with your phone
        qrcode.generate(qr, {small: true});
        console.log('QR RECEIVED', qr);

        qrCodeData = qr
        console.log(qrCodeData)
    });
    

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

    
    
    client.on('ready',()=>{
        console.log('Client is ready!');

        const subfijo = '@c.us'
        const phoneNumbers = ['5491151278287']
        const chatIds = phoneNumbers.map((number)=> {return number+subfijo})
        console.log(chatIds)

        
        for(let i=0;i<data.length;i++){
            
          client.sendMessage(chatIds[0],`Revisar ${data[i].productName}`)
        }
       
        
        
    })
    
    
    
    client.on('message', msg => {
        if (msg.body == '!ping') {
            msg.reply('pong');
        }
    });
    
    client.initialize();
}

BotWpp()