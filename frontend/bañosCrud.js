const botonEnviar = document.getElementById("enviar");






const sector = localStorage.getItem("sectorCrud")








async function enviarArchivo(elemento) {
    const formData = new FormData();
    formData.append('file', elemento.files[0]); // elemento es un input de tipo file
    console.log(formData)

    try {
        const response = await fetch(`https://baldosaslv.uy/upload/${sector}`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Respuesta exitosa:', data);
        return data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return { error: true };
    }
}


 async function guardarNombre(imagen){


    let nombre = imagen.value.split("\\").pop(); 

    return fetch(`https://baldosaslv.uy/${sector}`, {
    method: 'POST',
    headers: {
       'Content-Type': 'application/json',
        },
     body: JSON.stringify({nombre}),
 })
     .then(response => response.json())
     .then(data => console.log(data))
     .catch(error => {
      console.error('Error en la solicitud:', error);
      return { error: true };
      
 })
 
}

botonEnviar.addEventListener("click", (event) => {
    // Evitar que el formulario se envíe automáticamente y recargue la página
    event.preventDefault();

    const imagen = document.getElementById("imagenBaño");
    
    guardarNombre(imagen);
    enviarArchivo(imagen);
    
});




async function traerImagenes(){

    try {
        const response = await fetch(`https://baldosaslv.uy/${sector}`);
        if (!response.ok) {
          throw new Error('Hubo un problema al obtener los datos');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
        return []; // Devuelve un array vacío en caso de error
      }
  
  }





const agregarTabla = document.getElementById("agregarTabla");

async function mostrarImagenes(){
  
    let imagenes = await traerImagenes();


    imagenes.forEach(element => {

        agregarTabla.innerHTML+= `
      <tr>
      <th scope="row"></th>
      <td><img class="rutaImagen" src="imagenes/${sector}/${element.nombre}" width="100px" alt=""></td>
      <td><button class="p-1 w-100 btn btn-danger eliminar" id="${element.id}" data-img="${element.nombre}">Eliminar</button></td>
    </tr>
        `
   

});


let eliminar = document.querySelectorAll(".eliminar")
console.log(eliminar)


eliminar.forEach(boton => {

    boton.addEventListener("click", ()=>{

        const eliminarID = boton.id;

        const ruta = boton.getAttribute("data-img")

       console.log(ruta, sector)
         eliminarDB(eliminarID);
        eliminarArchivo(ruta);
       
    
    })
    
});


}


function eliminarArchivo(ruta){

    return fetch(`https://baldosaslv.uy/${ruta}/${sector}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => {
        console.error('Error en la solicitud:', error);
        return { error: true };
    });
}






     function eliminarDB(id){
    return fetch(`https://baldosaslv.uy/eliminarImagen/${sector}/${id}`,{
        method: 'DELETE',
     })
         .then(response => response.json())
         .then(data => console.log(data))
         .catch(error => {
          console.error('Error en la solicitud:', error);
          return { error: true };
    
     })
}


mostrarImagenes();