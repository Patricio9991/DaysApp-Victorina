  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const ahora = days(); // Obtén el tiempo actual en cada intervalo
      

  //     Verifica si ha pasado un minuto desde tiempoNow
  //     if (ahora.diff(minutoUltimo, 'minute') >= 1) {
  //       alert("Pasó un minuto");
  //       setMinutoUltimo(ahora)
  //     }
  //   }, 5000);

  //   Limpia el intervalo cuando el componente se desmonte
  //   return () => clearInterval(interval);
  // }, [minutoUltimo]); // Solo se inicializa una vez con `minutoUltimo`

  // console.log(minutoUltimo)

{}

function esMultiplo(num1,num2){
    var msg = ""
    if((num1 % num2) === 0){
        msg = "es multiplo"
    }else{
        msg = "no es multiplo"
    }
    return msg
}



console.log(esMultiplo(3,2))


const contDias = []

 contDias.push(7)
contDias.push(7)

const nuevaLong = contDias.push(7)



// const contadorSieteDias = contDias.reduce((acumulador,item)=>{return acumulador+item},0)

let contador = 0

contDias.forEach((item)=>{
    contador += item
})

console.log(nuevaLong)

function capitalize(word){
    return word.charAt(0).toUpperCase()+word.slice(1,word.length)
}


const str = "palabra"

console.log(capitalize(str))
console.log("-------")

const mascotas = {
    perros: ["cala"],
    gatos:["amanda","lana"]
}
mascotas.gatos.push("Aurora")


console.log(mascotas)


