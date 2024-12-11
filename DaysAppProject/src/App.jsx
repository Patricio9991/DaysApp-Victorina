import { Fragment, useEffect, useState } from 'react'
import days from 'dayjs'
import Square from './components/Square'




function App() {
  
  const [diaActual,setDiaActual] = useState(days().format('DD/MM/YYYY'))
  const [horaActual, setHoraActual] = useState(days().format('HH:mm:ss'))
  const [minutoUltimo,setMinutoUltimo] = useState(days())
  const diaValue = days().format('YYYY-MM-DD')

  const [contador,setContador] = useState([1]) //para contar hasta 7 dias
  const [contadorFull, setContadorFull] = useState([1])

  const [color,setColor] = useState('green')

  const [flagRevisado,setFlagRevisado] = useState(false)
  const [sieteDias,setSieteDias] = useState([])




  useEffect(() => {

    const interval = setInterval(() => {
    
        const tiempoActual = days();
       
      if (tiempoActual.diff(minutoUltimo, 'day') >= 1) {
          // Incrementar el contador solo si ha pasado un minuto
          setContador((prevContador) => [...prevContador, prevContador.length + 1]);
          setContadorFull((prevContadorFull) => [...prevContadorFull, prevContadorFull.length + 1]);
        setMinutoUltimo(tiempoActual); // Actualizar el tiempo de la última verificación
        console.log("Paso un minuto")
      }
    }, 1000); // Verificar cada segundo
  
    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);

  }, [minutoUltimo]); // Dependencia en `minutoUltimo`
  



  useEffect(() => {
    if (contador.length >= 7) {
      setColor('red');
    } else {
      setColor('green');
    }
  }, [contador]);


  setInterval(()=>{
    setDiaActual(days().format('DD/MM/YYYY'))
    setHoraActual(days().format('HH:mm:ss'))
    
  },1000)

 
 
  

  const handleDates = (e)=>{
    e.preventDefault()
    
  }
  

  const aumentarDia = ()=>{
    setContador([...contador,contador.length+1])
    setContadorFull([...contadorFull,contadorFull.length+1])

  }

  

  function masDeSieteDias(){
    
    
    contadorFull.forEach(dia=>{
      
      if(dia % 7 === 0){
        
        setSieteDias([...sieteDias, dia]);
        
      }
      
    })
    
    setContador([1])
    setFlagRevisado(true);
    
  }


  useEffect(()=>{
    console.log(sieteDias)
  },[sieteDias])
  

  return (
    <Fragment>
      <div className='bg-black h-screen text-white flex flex-col items-center '>

        <h1 className='text-white text-4xl pt-5'>DaysApp</h1>

        <span className='text-white'>Hoy es {diaActual}, {horaActual}</span>

        <form className='flex flex-col w-60 text-black' onSubmit={handleDates}>
            
          <label htmlFor="FechaElaboracion">Fecha de elaboracion</label>
          <input type='date' id="FechaElaboracion" value={`${diaValue}`}></input>

          <label htmlFor="FechaFinal">Fecha de vencimiento</label>
          <input type='date' id="FechaFinal"></input>

          <input type='submit' className='text-white m-5 bg-sky-400' onClick={aumentarDia} ></input>

        </form>


        <div className='flex  flex-col justify-center items-center gap-2 w-full'>

          <div className='flex flex-row gap-5 w-[364px]'>
            <p className='self-start'>Producto</p>
            <span>99/99/99</span>
          </div>

          <div className='flex flex-row  items-center bg-white w-[364px] h-10 overflow-hidden'>

            {
              contador ? (
                contador.slice(0,7).map((dias, index) => {
                  return (<Square key={index} index={index} color={color}></Square>)
                })
              ) : ("")
          }

          </div>
          
          <div className='flex flex-col items-center'>
            {
              contador.length>7 ? (
              <div>
                  <p>Ultima revision hace {contador.length} dias</p>
                  <button onClick={(masDeSieteDias)}>Revisado</button>
              </div>
                
              ) :""
            }
            
            {flagRevisado ? 
            
              <div className='flex justify-end w-[364px]'>
                {
                  sieteDias.map((item,index)=>(
                    <span key={index} 
                    className='flex bg-purple-500 m-2 w-6 h-6 rounded-full justify-center items-center'>{item}</span>))
                }


              </div>
                  
                  
                  
                  :""}
            
          </div>
            <p>Dias: {contador.length}</p>


        </div>


      

       

      </div>
    </Fragment>
  )
}

export default App
