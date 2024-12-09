import { Fragment, useState } from 'react'
import days from 'dayjs'



function App() {

  const [diaActual,setDiaActual] = useState(days().format('DD/MM/YYYY'))
  const [horaActual, setHoraActual] = useState(days().format('HH:mm:ss'))

  const [contador,setContador] = useState([1])

  const diaValue = days().format('YYYY-MM-DD')

  setInterval(()=>{
    setDiaActual(days().format('DD/MM/YYYY'))
    setHoraActual(days().format('HH:mm:ss'))
  },1000)

 
  const handleDates = (e)=>{
    e.preventDefault()
    
  }
  
  const aumentarDia = ()=>{
    setContador([...contador,contador.length+1])
    console.log(contador)

  }

  return (
    <Fragment>
      <div className='bg-black h-screen text-white flex flex-col items-center '>

        <h1 className='text-white text-4xl pt-5'>DaysApp</h1>

        <span className='text-white'>Hoy es {diaActual}, {horaActual}</span>

        <form className='flex flex-col w-60 text-black' onSubmit={handleDates}>
            
          <label htmlFor="FechaElaboracion">Fecha de elaboracion</label>
          <input type='date' id="FechaElaboracion" value={`${diaValue}`}></input>

          <label htmlFor="FechaFinal">Fecha de vencimiento</label>
          <input type='date' id="FechaFinal"></input>

          <input type='submit' className='text-white m-5 bg-sky-400' onClick={aumentarDia}></input>

        </form>

        {contador.length<=7? (
          contador.map((dias)=>{<span key={dias} className='bg-red-400 w-10 h-5'></span>})
          ):(
            console.log("Pasaron mas de 7 dias"))}

       

      </div>
    </Fragment>
  )
}

export default App
