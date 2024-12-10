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
