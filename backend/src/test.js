import days from 'dayjs'


const ahora = new Date()

const gmt3 = new Date(ahora.getTime() - 3 * 60 * 60 * 1000)
console.log(gmt3.toISOString())


const dayObj = days(gmt3)


console.log(dayObj)
