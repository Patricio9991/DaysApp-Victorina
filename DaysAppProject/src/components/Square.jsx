import { Fragment } from "react";
import PropTypes from "prop-types";





export default function Square({index,color}){
    return(
        <Fragment>
            <div key={index} className="flex ">
                <span className={`${color === 'red' ? 'bg-red-800' : 'bg-green-800'} w-11 h-8 m-1`}/>
                
            </div>
        </Fragment>
    )
}

Square.propTypes = {
    index: PropTypes.number,
    color: PropTypes.string,
  };
