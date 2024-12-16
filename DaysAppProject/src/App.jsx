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

  
  
  
  const [flagRevisado,setFlagRevisado] = useState(false)
  const [sieteDias,setSieteDias] = useState([])
  
  const [BTNProdcuto,setBTNProducto] = useState(false)

  const [allData,setAllData] = useState([])

  const getAllProducts = async ()=>{
    const res = await axios.get('http://localhost:4000/allProducts')
    setAllData(res.data)
    
  }
  
  useEffect(()=>{
    getAllProducts()
    
  },[])
  
  
  
  
  const [contador,setContador] = useState([1]) //para contar hasta 7 dias
  const [contadorFull, setContadorFull] = useState([1])
  
  
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
       
      if (tiempoActual.diff(minutoUltimo, 'minute') >= 1) {
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

  }, [minutoUltimo]); // Dependencia en `minutoUltimo`
  





  
  
 
  
  
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
  


  
  


  function masDeSieteDias(){
    
    
    contadorFull.forEach(dia=>{
      
      if(dia % 7 === 0){
        
        setSieteDias([...sieteDias, dia]);
        
      }
      
    })
    
    setContador([1])
    setFlagRevisado(true);
    
  }
  
  
  const aumentarDia = ()=>{
    setContador([...contador,contador.length+1])
    setContadorFull([...contadorFull,contadorFull.length+1])

  }
  
  
  
    setInterval(()=>{
      setDiaActual(days().format('DD/MM/YYYY'))
      setHoraActual(days().format('HH:mm:ss'))
      
    },1000)




  useEffect(()=>{
    console.log(sieteDias)
  },[sieteDias])
  

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
                productData={productData} diaValue={diaValue} aumentarDia={aumentarDia} 
              />

              <button className='bg-white' onClick={updateDay}>Update</button> 
            </div>

          ):""} 

        </div>

        

          {allData.map((item,index)=>{return(
            
            <div className='flex flex-col mt-10 p-4 border-2' key={index}>

              <Producto nameProducto={item.productName} />
              <BarraProgresoDiario
                    contador={contador} dia={item.dias} masDeSieteDias={masDeSieteDias} 
                    flagRevisado={flagRevisado} sieteDias={sieteDias} fecha={item.fechaInicio}
                  />
                
            </div>
          )})}
            
        


      </div>

    </Fragment>
  )
}

export default App
