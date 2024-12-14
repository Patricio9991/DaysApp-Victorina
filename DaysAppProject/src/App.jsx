import { Fragment, useCallback, useEffect, useState } from 'react'
import days from 'dayjs'

import axios from 'axios'
import FormDataProducto from './components/FormDataProducto'
import BarraProgresoDiario from './components/BarraProgresoDiario'
import Producto from './components/Producto'



function App() {
  
  const [diaActual,setDiaActual] = useState(days().format('DD/MM/YYYY'))
  const [horaActual, setHoraActual] = useState(days().format('HH:mm:ss'))
  const [minutoUltimo,setMinutoUltimo] = useState(days())
  const diaValue = days().format('YYYY-MM-DD')

  const [contador,setContador] = useState([1]) //para contar hasta 7 dias
  const [contadorFull, setContadorFull] = useState([1])
  

  

  const [flagRevisado,setFlagRevisado] = useState(false)
  const [sieteDias,setSieteDias] = useState([])

  const [BTNProdcuto,setBTNProducto] = useState(false)



  const updateDay = useCallback(()=>{
    axios.put('http://localhost:4000/sumarDia',{
      "productName":"pepe",
      "fechaInicio":`14/12/2024`,
      "dias":contadorFull[contadorFull.length-1]
    }).then(res=>console.log(res)).catch(e=>console.log(e))
    
  },[contadorFull])



  useEffect(() => {

    const interval = setInterval(() => {
    
        const tiempoActual = days();
       
      if (tiempoActual.diff(minutoUltimo, 'day') >= 1) {
          // Incrementar el contador solo si ha pasado un minuto
          setContador((prevContador) => [...prevContador, prevContador.length + 1]);
          setContadorFull((prevContadorFull) => [...prevContadorFull, prevContadorFull.length + 1]);
          updateDay()

        setMinutoUltimo(tiempoActual); // Actualizar el tiempo de la última verificación
        console.log("Paso un minuto")
      }
    }, 1000); // Verificar cada segundo
  
    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);

  }, [minutoUltimo,updateDay]); // Dependencia en `minutoUltimo`
  






  setInterval(()=>{
    setDiaActual(days().format('DD/MM/YYYY'))
    setHoraActual(days().format('HH:mm:ss'))
    
  },1000)

 
 
  

  const productData = (e)=>{
    e.preventDefault()
    console.log(e.target[0].value.toLowerCase())
    
    const [anio,mes,dia] = e.target[1].value.split('-')
    console.log(dia,mes,anio)

    

    axios.post('http://localhost:4000/new',{
      "productName":e.target[0].value.toLowerCase(),
      "fechaInicio":`${dia}/${mes}/${anio}`,
      "dias":contadorFull[contadorFull.length-1]
    }).then(res=>console.log(res)).catch(e=>console.log(e))
    
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

        <div className='bg-black flex flex-col items-center '>

          <h1 className='text-white text-4xl pt-5'>DaysApp</h1>

          <span className='text-white'>Hoy es {diaActual}, {horaActual}</span>

          <button className='rounded-lg bg-green-500 w-30 p-2 text-center' 
            onClick={()=>{setBTNProducto(true); if(BTNProdcuto) setBTNProducto(false)}}>Nuevo producto</button>

          {BTNProdcuto ? (
            <div className='flex flex-col items-center'>

              <FormDataProducto 
                productData={productData} diaValue={diaValue} aumentarDia={aumentarDia} 
              />

              <button className='bg-white' onClick={updateDay}>Update</button> 
            </div>

          ):""} 

        </div>

        <div className='flex flex-row self-start mt-10 pl-4 border-2 w-full'>
          <Producto/>
          <BarraProgresoDiario
                contador={contador} masDeSieteDias={masDeSieteDias} 
                flagRevisado={flagRevisado} sieteDias={sieteDias}
              />
            
            
        </div>


      </div>

    </Fragment>
  )
}

export default App
