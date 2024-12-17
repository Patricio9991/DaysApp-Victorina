import { Fragment, useCallback, useEffect, useState } from "react"
import PropTypes from "prop-types";
import Square from "./Square.jsx";
import days from 'dayjs'
import axios from "axios";




export default function BarraProgresoDiario({allData}){

    const [color,setColor] = useState('green')

    const [contador,setContador] = useState([1]) //para contar hasta 7 dias
    const [contadorFull, setContadorFull] = useState([])
    const [minutoUltimo,setMinutoUltimo] = useState(days())
    const [sieteDias,setSieteDias] = useState([])
    const [flagRevisado,setFlagRevisado] = useState(false)

    
    useEffect(()=>{setContadorFull(allData.dias)},[])

    

   const updateDay = useCallback(()=>{
      axios.put('http://localhost:4000/sumarDia',{
        "productName":allData.productName,
        "fechaInicio":allData.fechaInicio,
        "dias":allData.dias.length+ 1
      }).then(res=>console.log(res)).catch(e=>console.log(e))
      
  },[])
    
  
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
  
    }, [minutoUltimo,updateDay]); // Dependencia en `minutoUltimo`
    
  
    function masDeSieteDias(){
      
      
      allData.dias.forEach(dia=>{
        
        if( allData.dia.length >= 7 && dia % 7 === 0){
          
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
    

    useEffect(() => {
    if (allData.dias.length >= 7) {
        setColor('red');
    } else {
        setColor('green');
    }
    }, [allData.dias]);


    return(
        <Fragment>

            <div className='flex flex-col justify-center items-center '>

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
            
                <div className='flex flex-row items-center'>
                    {
                    allData.dias.length>=7 ? (
                    <div>
                        <p>Ultima revision hace {sieteDias[0]} dias</p>
                        <button onClick={(masDeSieteDias)}>Revisado</button>
                    </div>
                        
                    ) :""
                    }
                    
                    {flagRevisado ? 
                    
                    <div className='flex justify-end '>
                        {
                        sieteDias.map((item,index)=>(
                            <span key={index} 
                            className='flex bg-purple-500 m-2 w-6 h-6 rounded-full justify-center items-center'>{item}</span>))
                        }


                    </div>
                        
                        
                        
                    :""}
                    
                    

                </div>



            </div>

        </Fragment>
    )
}



BarraProgresoDiario.propTypes = {
    contador: PropTypes.array,
    masDeSieteDias: PropTypes.func,
    flagRevisado:PropTypes.bool,
    sieteDias:PropTypes.array,
  };