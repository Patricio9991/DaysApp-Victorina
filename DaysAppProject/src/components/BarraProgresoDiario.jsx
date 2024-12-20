import { Fragment, useCallback, useEffect, useState } from "react"
import PropTypes from "prop-types";
import Square from "./Square.jsx";
// import days from 'dayjs'
import axios from "axios";




export default function BarraProgresoDiario({allData,flagUpdate,setFlagUpdate}){

  const [color,setColor] = useState('green')

   const render = "https://daysapp-victorina.onrender.com"
   const local = "http://localhost:4000"
   

    

  const updateDay = useCallback(async ()=>{

    
    await axios.put(`${render}/sumarDia`,{
      "productName":allData.productName,
      "fechaInicio":allData.fechaInicio,
      "dias":allData.dias.length+ 1,

      }).then(res=>{
      console.log(res)
      setFlagUpdate((prev) => !prev)
      }).catch(e=>console.log(e))
      


  },[allData,setFlagUpdate,])

  const revisarProducto = useCallback(async ()=>{

    await axios.put(`${render}/revisado`,{
      "productName":allData.productName,
      "fechaInicio":allData.fechaInicio,
      "dias":allData.dias.length+ 1,
      "revisado": !allData.revisado
      }).then(res=>{
      console.log(res)
      setFlagUpdate((prev) => !prev)

      }).catch(e=>console.log(e))
      
  },[allData,setFlagUpdate])

  
  const deleteProduct = useCallback(async ()=>{

    await axios.put(`${render}/eliminarProducto`,{
      "productName":allData.productName,
      "fechaInicio":allData.fechaInicio,
      }).then(res=>{

      console.log(res)
      setFlagUpdate(!flagUpdate)

      }).catch(e=>console.log(e))
      
  },[allData,setFlagUpdate,flagUpdate])

  
  
  // const editProduct = useCallback(async()=>{
  //   await axios.put(`${render}/editarProducto`,)
  // })
    
  const aumentarDia = ()=>{
     updateDay()
  
    }
    

    useEffect(() => {
    if (allData.dias.length >= 7) {
        setColor('red');
        if(allData.revisado === true){
          setColor('green')
        }
    } else{
        setColor('green');
    }
    }, [allData.dias,allData.revisado]);


    return(
        <Fragment>

          <div className="flex flex-col w-fit justify-start pt-10 gap-2">
            <div className='flex flex-col justify-center items-center border-2 '>

                  
                  

                <h2 className="pb-2">{allData.productName}</h2>

                  <div className='flex flex-row gap-5 w-[364px]'>
                      <p className='self-start'>Fecha elaboracion</p>
                      <span>{allData.fechaInicio}</span>

                     
                  </div>

                  <div className='flex flex-row  items-center bg-white w-[364px] h-10 overflow-hidden'>

                      {

                      allData.dias ? (
                        allData.dias.slice(0,7).map((dias, index) => {
                          return (<Square key={index} index={index} color={color}></Square>)
                          })
                      ) : ("")
                      
                      }

                  
                  </div>
                  <p>Dias: {allData.dias[allData.dias.length-1]}</p>
                  <p>Ultima revision {allData.fechaRevision}</p>
                  
    
            </div> 

              <div className="flex flex-row gap-2">
                <button className="bg-red-800 text-black rounded-full w-20" onClick={deleteProduct}>Eliminar</button>
                <button className="bg-white text-black rounded-full w-20" onClick={aumentarDia}>aumentar dia</button>

                {
                  (allData.revisado === false) ? (
                  
                    <button className="bg-purple-600 text-black rounded-full ml-auto text-center w-20" onClick={revisarProducto}>Revisado</button>
                
                      
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
