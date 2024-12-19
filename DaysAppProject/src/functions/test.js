import day from 'dayjs'

const tiempoActual = day()
const tiempoPasado = tiempoActual.subtract(1,'minutes')
console.log(tiempoActual.diff(tiempoPasado,'minute'))