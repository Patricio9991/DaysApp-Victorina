import { Fragment } from "react";
import PropTypes from "prop-types";






export default function FormDataProducto({productData,diaValue}){
    return(
        <Fragment>

            <form className='flex flex-col w-60 text-black pt-5' onSubmit={productData}>
                    
                <label htmlFor='nombreProducto' ></label>
                <input type="text" id="nombreProducto" placeholder="Nombre Producto"></input>

                <label htmlFor="FechaElaboracion">Fecha de elaboracion</label>
                <input type='date' id="FechaElaboracion" value={`${diaValue}`}></input>


                <input type='submit' className='text-white m-5 bg-sky-400'></input>

            

            </form>
        </Fragment>
    )
}



FormDataProducto.propTypes = {
    productData: PropTypes.func,
    diaValue: PropTypes.string
  };