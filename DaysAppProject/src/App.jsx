import { Fragment, useCallback, useEffect, useState } from 'react'
import days from 'dayjs'

import axios from 'axios'
import FormDataProducto from './components/FormDataProducto'
import BarraProgresoDiario from './components/BarraProgresoDiario'
import Producto from './components/Producto'



function App() {
  
  const [diaActual,setDiaActual] = useState(days().format('DD/MM/YYYY'))
  const [horaActual, setHoraActual] = useState(days().format('HH:mm:ss'))
 
  const diaValue = days().format('YYYY-MM-DD')
  
  const [BTNProdcuto,setBTNProducto] = useState(false)

  const [allData,setAllData] = useState([])

  const getAllProducts = async ()=>{
    const res = await axios.get('http://localhost:4000/allProducts')
    setAllData(res.data)
    
  }
  
  useEffect(()=>{
    getAllProducts()
    
  },[])
  
  

  
  const productData = (e)=>{
    e.preventDefault()
    console.log(e.target[0].value.toLowerCase())
    
    const [anio,mes,dia] = e.target[1].value.split('-')
    console.log(dia,mes,anio)

    

    axios.post('http://localhost:4000/new',{
      "productName":e.target[0].value.toLowerCase(),
      "fechaInicio":`${dia}/${mes}/${anio}`
    }).then(res=>console.log(res)).catch(e=>console.log(e))
    
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

               
            </div>

          ):""} 

        </div>

        

          {allData.map((item,index)=>{return(
            
            <div className='flex flex-col mt-10 p-4 border-2' key={index}>

              <Producto nameProducto={item.productName} />
              <BarraProgresoDiario allData={item}/>
                
            </div>
          )})}
            
        


      </div>

    </Fragment>
  )
}

export default App
