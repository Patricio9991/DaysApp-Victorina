import { Fragment } from "react";
import PropTypes from "prop-types";






export default function FormDataProducto({productData,diaValue,prevName}){
    




    return(
        <Fragment>

            <form className='flex flex-col w-60 text-black pt-5 ' onSubmit={productData}>
                    
                <label htmlFor='nombreProducto' ></label>
                <input 
                    type="text" 
                    id="nombreProducto" 
                    placeholder={`${diaValue ? "Nombre Producto": prevName }`}
                    className=" border-gray-300 rounded p-2 w-full"
                />

                <div className="flex flex-row border border-gray-300 rounded h-8 mt-2">

                    <label htmlFor='cantidad' ></label>
                    <input 
                        type="text" 
                        id="cantidad" 
                        placeholder={`${diaValue ? "Cantidad ": prevName }`}
                        className="text-center w-2/3"
                    />
                    <select className="w-1/2" id="unidades" >
                        <option value="unidades">Unidades</option>
                        <option value="paquetes">Paquetes</option>
                        <option value="kilos">Kilos</option>
                        <option value="gramos">Gramos</option>
                    </select>
                </div>


   
                {diaValue ? (
                    <Fragment>
                        <label htmlFor="FechaElaboracion">
                            Fecha de Elaboración
                        </label>
                        <input
                            type="date"
                            id="FechaElaboracion"
                            value={diaValue}
                            className="border border-gray-300 rounded p-2"
                        />
                    </Fragment>
                ) : (
                    ''
                )}



                <input type='submit' value="Guardar" className='text-white m-5 bg-sky-400'></input>

            

            </form>
        </Fragment>
    )
}



FormDataProducto.propTypes = {
    productData: PropTypes.func,
    diaValue: PropTypes.string,
    prevName:PropTypes.string
  };