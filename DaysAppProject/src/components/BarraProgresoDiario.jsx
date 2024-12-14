import { Fragment, useEffect, useState } from "react"
import PropTypes from "prop-types";
import Square from "./Square.jsx";





export default function BarraProgresoDiario({contador,masDeSieteDias,flagRevisado,sieteDias}){

    const [color,setColor] = useState('green')

    useEffect(() => {
    if (contador.length >= 7) {
        setColor('red');
    } else {
        setColor('green');
    }
    }, [contador]);


    return(
        <Fragment>

            <div className='flex  flex-col justify-center items-center  w-[450px] '>

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
                <p>Dias: {contador.length}</p>
            
                <div className='flex flex-row items-center'>
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