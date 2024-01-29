





async function bdCorreos(){
    try {
      const response = await fetch("http://baldosaslv.uy/correos");
      if (!response.ok) {
        throw new Error('Hubo un problema al obtener los datos');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return []; // Devuelve un array vacío en caso de error
    }
  };
  
  let tablaHtml = document.getElementById("tbody");

  
 async function mostrarCorreos (){

const correo = await bdCorreos();

correo.forEach(element => {

    
tablaHtml.innerHTML += `

<tr>
        <th scope="row">${element.id}</th>
        <td>${element.correo}</td>
        <td><button id="${element.id}" class="p-1 w-75 btn btn-danger eliminar">Eliminar</button></td>
      </tr>

`

const botonEliminar = document.querySelectorAll(".eliminar");


console.log(botonEliminar);




botonEliminar.forEach(boton => {
 
 boton.addEventListener('click', function() {
  location.reload();
  
  
   const elementoId = boton.id
   console.log(elementoId);
   eliminar(elementoId);
   window.alert("Se borro correctamente")
   
 });
});



});

 }


 mostrarCorreos();







 const enviarCorreo = document.getElementById("enviarCorreo");





 function crudCorreo(){

 enviarCorreo.addEventListener("click", ()=>{

  location.reload();

  const correoNuevo = document.getElementById("correo").value;

  console.log(correoNuevo);

   return fetch('http://baldosaslv.uy/enviarCorreo', {
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
 

 
 
 })
 

 }

 crudCorreo();




 








 function eliminar(id){

  return fetch(`http://baldosaslv.uy/eliminarCorreo/${id}`, {
    method: 'DELETE',
 })
     .then(response => response.json())
     .then(data => console.log(data))
     .catch(error => {
      console.error('Error en la solicitud:', error);
      return { error: true };

 })


 }

