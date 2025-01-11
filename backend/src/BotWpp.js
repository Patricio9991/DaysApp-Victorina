import pkg from 'whatsapp-web.js'
import qrcode from 'qrcode-terminal'





const {Client,LocalAuth} = pkg


export let qrCodeData = null

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

