import { Fragment, useCallback, useEffect, useState } from "react"
import PropTypes from "prop-types";
import Square from "./Square.jsx";
import days from 'dayjs'
import axios from "axios";




export default function BarraProgresoDiario({allData,flagUpdate,setFlagUpdate}){

    const [color,setColor] = useState('green')

    const [contador,setContador] = useState([allData.dias.length]) //para contar hasta 7 dias
    // const [contadorFull, setContadorFull] = useState([])
    const [minutoUltimo,setMinutoUltimo] = useState(days())
    const [sieteDias,setSieteDias] = useState([])

   
    // useEffect(()=>{

    //   if (allData.dias.length % 7 === 0){
    //     for()
    //   }


    //   localStorage.setItem(`dias ${allData.productName}`,JSON.stringify(contador))
    //   const pepe = localStorage.getItem(`dias ${allData.productName}`)
    //   console.log(JSON.parse(pepe))


    // },[contador,allData])
 

    // useEffect(()=>{
    //   setContadorFull(allData.dias)
      
    
    // },[allData])

    

  const updateDay = useCallback(async ()=>{

    await axios.put('http://localhost:4000/sumarDia',{
      "productName":allData.productName,
      "fechaInicio":allData.fechaInicio,
      "dias":allData.dias.length+ 1
      }).then(res=>{
      console.log(res)
      setFlagUpdate((prev) => !prev)
      }).catch(e=>console.log(e))
      
    if(allData.dias.length % 7===0){
      setContador([1])
    }else{
      setContador(prevContador => [...prevContador, allData.dias.length + 1])
    }

      console.log(contador)

  },[allData,setFlagUpdate,contador])

  const revisarProducto = useCallback(async ()=>{

    await axios.put('http://localhost:4000/revisado',{
      "productName":allData.productName,
      "fechaInicio":allData.fechaInicio,
      "dias":allData.dias.length+ 1
      }).then(res=>{
      console.log(res)
      setFlagUpdate((prev) => !prev)
      
      }).catch(e=>console.log(e))
      
  },[allData,setFlagUpdate])
  
  const deleteProduct = useCallback(async ()=>{

    await axios.put('http://localhost:4000/eliminarProdcuto',{
      "productName":allData.productName,
      "fechaInicio":allData.fechaInicio,
      }).then(res=>{

      console.log(res)
      setFlagUpdate(!flagUpdate)

      }).catch(e=>console.log(e))
      
  },[allData,setFlagUpdate,flagUpdate])

  

  
  useEffect(() => {
  
      const interval = setInterval(() => {
      
        const tiempoActual = days();
         
        if (tiempoActual.diff(minutoUltimo, 'minute') >= 1) {
            // Incrementar el contador solo si ha pasado un minuto
            // setContador((prevContador) => [...prevContador, prevContador.length + 1]);
            // setContadorFull((prevContadorFull) => [...prevContadorFull, prevContadorFull.length + 1]);
            updateDay()
            
  
          setMinutoUltimo(tiempoActual); // Actualizar el tiempo de la última verificación
          console.log("Paso un minuto")
        }
      }, 1000); // Verificar cada segundo
    
      // Limpiar el intervalo cuando el componente se desmonte
      return () => clearInterval(interval);
  
  }, [minutoUltimo,updateDay]); // Dependencia en `minutoUltimo`
    
  
  function masDeSieteDias(){

    //   console.log(flagRevisado)
      
    // allData.dias.forEach(dia=>{
      
    //   if(allData.dias.length >= 7 && dia % 7 === 0){
        
    //     setSieteDias([...sieteDias, dia]);
    //     console.log(sieteDias)
    //   }
      
    // })
    
    
    setFlagRevisado(true);
    
  }
    
    
  const aumentarDia = ()=>{
     updateDay()
  
    }
    

    useEffect(() => {
    if (allData.dias.length >= 7) {
        setColor('red');
    } else {
        setColor('green');
    }
    }, [allData.dias]);


    return(
        <Fragment>

          <div className="flex justify-start pt-10 gap-2">
            <div className='flex flex-col justify-center items-center border-2 p-5  '>

                  
                  

                <h2 className="pb-2">{allData.productName}</h2>

                  <div className='flex flex-row gap-5 w-[364px]'>
                      <p className='self-start'>Fecha elaboracion</p>
                      <span>{allData.fechaInicio}</span>

                     
                  </div>

                  <div className='flex flex-row  items-center bg-white w-[364px] h-10 overflow-hidden'>

                      {

                      allData.dias ? (
                          contador.map((dias, index) => {
                          return (<Square key={index} index={index} color={color}></Square>)
                          })
                      ) : ("")
                      
                      }

                  
                  </div>
                  <p>Dias: {allData.dias[allData.dias.length-1]}</p>
                  <p>Ultima revision {allData.fechaRevision}</p>
                  
    
            </div> 

              <div className="flex flex-col gap-2">
                <button className="bg-red-800 text-black rounded-full" onClick={deleteProduct}>Eliminar</button>
                <button className="bg-white text-black" onClick={aumentarDia}>aumentar dia</button>

                {
                  allData.dias.length > 5 &&  allData.dias.length % 3 === 0 ? (
                  
                    <button className="bg-purple-600 text-black mt-auto text-center" onClick={revisarProducto}>Revisado</button>
                
                      
                  ) :""
                }
              </div>

          </div>

        </Fragment>
    )
}



BarraProgresoDiario.propTypes = {
    allData: PropTypes.object,
    flagUpdate: PropTypes.bool,
    setFlagUpdate: PropTypes.func
  };