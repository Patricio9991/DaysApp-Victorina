import day from 'dayjs'

const tiempoActual = day()
const tiempoPasado = tiempoActual.subtract(1,'minutes')
console.log(tiempoActual.diff(tiempoPasado,'minute'))


const testObject = {name:"pepe",gif:[1,2,3,4,5]} []

console.log(testObject)



console.log([1,2,3,4])