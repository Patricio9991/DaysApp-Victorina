import { Fragment, useCallback, useEffect, useState } from "react"
import PropTypes from "prop-types";
import Square from "./Square.jsx";
import axios from "axios";


import { RiDeleteBinLine } from "react-icons/ri";
import { RiEditLine } from "react-icons/ri";

import Swal from 'sweetalert2'

export default function BarraProgresoDiario({allData,flagUpdate,setFlagUpdate,serverUrl}){

  const [color,setColor] = useState('green')
  

   

    

  // const updateDay = useCallback(async ()=>{

    
  //   await axios.put(`${serverUrl}/sumarDia`,{
  //     "productName":allData.productName,
  //     "fechaInicio":allData.fechaInicio,
  //     "dias":allData.dias.length+ 1,

  //     }).then(res=>{
  //     console.log(res)
  //     setFlagUpdate((prev) => !prev)
  //     }).catch(e=>console.log(e))
      


  // },[allData,setFlagUpdate,serverUrl])

  const revisarProducto = useCallback(async ()=>{

    await axios.put(`${serverUrl}/revisado`,{
      "productName":allData.productName,
      "fechaInicio":allData.fechaInicio,
      "dias":allData.dias.length+ 1,
      "revisado": !allData.revisado
      }).then(res=>{
      console.log(res)
      setFlagUpdate((prev) => !prev)

      }).catch(e=>console.log(e))
      
  },[allData,setFlagUpdate,serverUrl])

  
  const deleteProduct = useCallback(async ()=>{



    Swal.fire({
      title: "¿Estas seguro?",
      text: "Esto no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: " #d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Eliminar",
      cancelButtonText:"Cancelar"
    }).then(async (result) => {

      if (result.isConfirmed) {
        
        await axios.put(`${serverUrl}/eliminarProducto`,{
          "productName":allData.productName,
          "fechaInicio":allData.fechaInicio,
          }).then(res=>{
    
          console.log(res)
          setFlagUpdate(!flagUpdate)
    
        }).catch(e=>console.log(e))

        Swal.fire({
          title: "Eliminado!",
          text: "Producto eliminado.",
          icon: "success"
        });
      }
    });



      
  },[allData,setFlagUpdate,flagUpdate,serverUrl])


  
  const editProduct = useCallback(async ()=>{

    console.log("click en editar")


    Swal.fire({
      title: "Ingrese el nuevo nombre del producto",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Editar",
      cancelButtonText:"Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: async (data) => {
        
        console.log(data)
        const nuevoNombre = data
    
        await axios.put(`${serverUrl}/editarProducto`,{
    
        "nombreAnterior":allData.productName, 
        "nuevoNombre": nuevoNombre,
        "fechaInicio":allData.fechaInicio
    
        }).then(res=>{
    
          console.log(res)
          setFlagUpdate(!flagUpdate)
    
          }).catch(e=>console.log(e))
      }})
    







  },[serverUrl,flagUpdate,setFlagUpdate,allData])
  

  // const aumentarDia = ()=>{
  //    updateDay()
  
  // }
    

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

          <div className="flex flex-col w-fit justify-start items-center pt-10 gap-2">
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

              <div className="flex flex-row gap-2 justify-start w-full">
                
                <RiDeleteBinLine size={50} className=" text-red-500" onClick={deleteProduct}/>
                
                <RiEditLine  size={50} className="text-sky-500 " onClick={editProduct}/>
                {/* <button className="bg-white text-black rounded-full w-20" onClick={aumentarDia}>aumentar dia</button> */}
                

                {
                  (allData.revisado === false) ? (
                  
                    <button className="ml-auto bg-purple-600 text-black rounded-full  text-center w-20" onClick={revisarProducto}>Revisado</button>
                
                      
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
    setFlagUpdate: PropTypes.func,
    serverUrl:PropTypes.string
  };
