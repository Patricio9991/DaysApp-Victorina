import { Fragment } from "react";











export default function Producto({nameProducto}){
    return(
        <Fragment>

            <div className="flex justify-center items-center">
                <h2 className="pb-2">{nameProducto}</h2>

            </div>

            
        </Fragment>
    )
}