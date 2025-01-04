import { Fragment, useCallback, useEffect, useState } from 'react'
import days from 'dayjs'

import axios from 'axios'
import FormDataProducto from './components/FormDataProducto'
import BarraProgresoDiario from './components/BarraProgresoDiario'

import {ClockLoader} from 'react-spinners'

import { randomUtils } from './functions/random.js'

const loadingMsgs = ["Despertando a los panaderos","Sacando las cosas", "Secando el pan", "Pintando las facturas", "Poniendo agua a la cafetera"]

console.log(import.meta.env)

function App() {
  
  const [diaActual,setDiaActual] = useState(days().format('DD/MM/YYYY'))
  const [horaActual, setHoraActual] = useState(days().format('HH:mm:ss'))
  
  const diaValue = days().format('YYYY-MM-DD')
  
  const [BTNProdcuto,setBTNProducto] = useState(false)
  const [allData,setAllData] = useState([])
  
  const [flagUpdate, setFlagUpdate] = useState(false)
  const [flagRes, setFalgRes] = useState(null)
  const [isLoading,setIsLoading] = useState(null)

  const serverUrl = import.meta.env.DEV ? import.meta.env.VITE_LOCAL : import.meta.env.VITE_RENDER

 

  const getAllProducts = useCallback(async ()=>{
    try {
      setIsLoading(true)

      const res = await axios.get(`${serverUrl}/allProducts`)
      setAllData(res.data)

      if(!res) throw new Error("Error al buscar los datos")
      
    } catch (error) {
      console.log(error)
    } finally{
      setIsLoading(false)
    }
    
  },[serverUrl,setIsLoading])
  
  // isLoading ? console.log("buscando data") : console.log("operacion terminada")

  useEffect(()=>{
    try {
      getAllProducts()
      
    } catch (error) {
      console.log(error)
    }
    
  },[getAllProducts,flagUpdate])
  
  

  
  const productData = async (e)=>{
    e.preventDefault()
    console.log(e.target[0].value.toLowerCase())
    
    const [anio,mes,dia] = e.target[1].value.split('-')
    console.log(dia,mes,anio)



    await axios.post(`${serverUrl}/new`,{
      "productName":e.target[0].value.toLowerCase(),
      "fechaInicio":`${dia}/${mes}/${anio}`
    }).then(res=>{
      console.log(res)
      setFlagUpdate((prev) => !prev)
      setFalgRes(res.data.mensaje)

      setTimeout(() => {
        setFalgRes(null)
      }, 1000);


      e.target.reset()
      }).catch(e=>console.log(e))
    
  }


  setInterval(()=>{
    setDiaActual(days().format('DD/MM/YYYY'))
    setHoraActual(days().format('HH:mm:ss'))
      
  },1000)




  

  return (
    <Fragment>
    
      <div className='bg-black min-h-screen min-w-screen  text-white flex flex-col items-center '>
        {isLoading ? (
          <div className='flex flex-col gap-2 items-center justify-center min-h-screen'>
              <ClockLoader color="#FFD700" size={100}/>
              <p>{randomUtils.choice(loadingMsgs)}...</p>
          </div>
        
        )
        :(

          <div className='bg-black flex flex-col items-center '>

            <h1 className='text-white text-4xl pt-5'>DaysApp</h1>

            <span className='text-white'>Hoy es {diaActual}, {horaActual}</span>

            <button className='rounded-lg bg-green-500 w-30 p-2 text-center' 
              onClick={()=>{setBTNProducto(true); if(BTNProdcuto) setBTNProducto(false)}}>Nuevo producto</button>

            {BTNProdcuto ? (
              <div className='flex flex-col items-center'>

                <FormDataProducto 
                  productData={productData} diaValue={diaValue} 
                />
                {flagRes ? <p className="text-white">Producto agregado!</p> : null}
                
                
                
              </div>

            ):""} 

            {allData.map((item,index)=>{return(
              

              <BarraProgresoDiario key={index} allData={item} flagUpdate={flagUpdate} setFlagUpdate={setFlagUpdate} serverUrl={serverUrl} />
            
              
            )})}

          </div>

        

        )}
        

      </div>

    </Fragment>
  )
}

export default App
