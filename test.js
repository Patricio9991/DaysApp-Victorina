

console.log('------------------------')
const dias =[1,2,3,4,5,6,7]
let contador = []


for(let i = 1;i<dias.length+1;i++){

    contador.push(i%7)

}

if(contador.length % 7 === 0){
    contador.slice(contador.length,14)
}



console.log(contador, contador.length)


console.log(5<3)