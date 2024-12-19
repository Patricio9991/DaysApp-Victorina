import { Fragment, useEffect, useState } from 'react'
import days from 'dayjs'

import axios from 'axios'
import FormDataProducto from './components/FormDataProducto'
import BarraProgresoDiario from './components/BarraProgresoDiario'




function App() {
  
  const [diaActual,setDiaActual] = useState(days().format('DD/MM/YYYY'))
  const [horaActual, setHoraActual] = useState(days().format('HH:mm:ss'))
  
 
  const diaValue = days().format('YYYY-MM-DD')
  
  const [BTNProdcuto,setBTNProducto] = useState(false)
  const [flagRes, setFalgRes] = useState(null)

  const [allData,setAllData] = useState([])
  const [flagUpdate, setFlagUpdate] = useState(false)

  const getAllProducts = async ()=>{
    const res = await axios.get('http://localhost:4000/allProducts')
    setAllData(res.data)
    
  }


  
  useEffect(()=>{
    getAllProducts()
    console.log(flagUpdate)
    
  },[flagUpdate])
  
  

  
  const productData = async (e)=>{
    e.preventDefault()
    console.log(e.target[0].value.toLowerCase())
    
    const [anio,mes,dia] = e.target[1].value.split('-')
    console.log(dia,mes,anio)

    

    await axios.post('http://localhost:4000/new',{
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
    
      <div className='bg-black min-h-screen text-white flex flex-col items-center '>

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

        </div>

        

          {allData.map((item,index)=>{return(
            
            

            <BarraProgresoDiario key={index} allData={item} flagUpdate={flagUpdate} setFlagUpdate={setFlagUpdate}/>
          
            
          )})}
            
        


      </div>

    </Fragment>
  )
}

export default App
