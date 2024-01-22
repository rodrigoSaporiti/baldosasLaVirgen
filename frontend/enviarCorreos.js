

function validarEmail(email) {
    
    var patronEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    
    return patronEmail.test(email);
  }
  


const enviarCorreo = document.getElementById("enviarCorreo");





function crudCorreo(){

enviarCorreo.addEventListener("click", ()=>{

    alert("Gracias por Suscribirte")


 location.reload();

 const correoNuevo = document.getElementById("correo").value;



if(validarEmail(correoNuevo)){

 console.log(correoNuevo);

  return fetch('http://localhost:3000/enviarCorreo', {
   method: 'POST',
   headers: {
      'Content-Type': 'application/json',
       },
    body: JSON.stringify({correoNuevo}),
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => {
     console.error('Error en la solicitud:', error);
     return { error: true };
     

     

})

}else{

alert("Ingrese un correo valido")

}




})



}

crudCorreo();

