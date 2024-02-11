


let titulo = document.getElementById("titulo");
let modal = document.getElementById("modalMosaicoInfo");
 let sector = localStorage.getItem("idMosaico")
 let actualizarInfo = document.getElementById("actualizarInfo");
 


 function eliminarArchivo(ruta){

    return fetch(`https://baldosaslv.uy/${ruta}`, {
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
    return fetch(`https://baldosaslv.uy/eliminarImagen/mosaicos/${id}`,{
        method: 'DELETE',
     })
         .then(response => response.json())
         .then(data => console.log(data))
         .catch(error => {
          console.error('Error en la solicitud:', error);
          return { error: true };
    
     })
}




function eliminarMosaico(id){
    return fetch(`https://baldosaslv.uy/eliminarImagen/mosaicosPrincipal/${id}`,{
        method: 'DELETE',
     })
         .then(response => response.json())
         .then(data => console.log(data))
         .catch(error => {
          console.error('Error en la solicitud:', error);
          return { error: true };
    
     })
}



 async function bdMosaicos(){
    try {
      const response = await fetch(`https://baldosaslv.uy/mosaicosDB/${sector}`);
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

   async function mostrar(){
   
    const db = await bdMosaicos();

    db.forEach(element => {
        titulo.innerHTML = `
    <b>${element.titulo}</b>
    `

modal.innerHTML = `

<label for="recipient-name" class="col-form-label">Titulo</label>
<input type="text" class="form-control" id="titulo1" value="${element.titulo}">


<label for="recipient-name" class="col-form-label">Tamaño</label>
<input type="text" class="form-control" id="tamaño" value="${element.tamaño}">


<label for="recipient-name" class="col-form-label">Cantidad por m2</label>
<input type="text" class="form-control" id="metro" value="${element.metro}">




<label for="recipient-name" class="col-form-label">Peso</label>
<input type="text" class="form-control" id="peso" value="${element.peso}">


<label for="recipient-name" class="col-form-label">Posición</label>
 <input type="number" class="form-control" value="${element.posicion}" >


<label for="recipient-name" class="col-form-label">Imagen Actual</label>
<img class="mt-2" src="imagenes/mosaicos/${element.img}" data-img="${element.img}" id="imagenActual" width="80">


<label for="recipient-name" class="col-form-label">Nueva Imagen</label>
<input type="file" class="form-control mt-3" id="imagenMosaico">


<button id="borrarMosaico" data-id="${element.id}" class="mt-5 btn btn-danger">Borrar Mosaico</button>
<p>*Borra primero las imgenes para eliminar el mosaico</p>
`


let btnEliminarMosaico = document.getElementById("borrarMosaico");



    btnEliminarMosaico.addEventListener("click", (event)=>{

        let imagenActual = document.getElementById("imagenActual");
let imagenActualData = imagenActual.getAttribute("data-img")


let idMosaico = btnEliminarMosaico.getAttribute("data-id");
    
event.preventDefault()

        eliminarMosaico(idMosaico);
         eliminarArchivo(imagenActualData);
        alert("Eliminado Correctamente")

      window.location.href="mosaicosCrud.html"
    
    })




    });





    
    



actualizarInfo.addEventListener("click", ()=>{

let titulo = document.getElementById("titulo1").value
let tamaño = document.getElementById("tamaño").value
let metro = document.getElementById("metro").value
let peso = document.getElementById("peso").value


let imagenActual = document.getElementById("imagenActual");
let imagenActualData = imagenActual.getAttribute("data-img")


let imagen = document.getElementById("imagenMosaico");
let nombre = imagen.value.split("\\").pop();
 

try {
    if (imagen.files.length == 0) {
        // Actualizar sin subir nueva imagen
         actualizar(imagenActualData, titulo, tamaño, metro, peso);
    } else {
        // Eliminar archivo anterior, subir nuevo archivo y luego actualizar
        eliminarArchivo(imagenActualData);
         enviarArchivo(imagen);
         actualizar(nombre, titulo, tamaño, metro, peso);
    }

    // Operaciones completadas correctamente, recargar la página
    location.reload();
} catch (error) {
    console.error('Error en el evento de actualización:', error);
}




    
 
})








  }

  mostrar();






  
    
  function actualizar(imagen, a , b , c , d){

    

   datos = {
    titulo : a ,
    img : imagen ,
    tamaño : b ,
    metro : c ,
    peso: d

   }

    return fetch(`https://baldosaslv.uy/mosaicos/${sector}`, {
    method: 'PUT',
    headers: {
       'Content-Type': 'application/json',
        },
     body: JSON.stringify({datos}),
 })
     .then(response => response.json())
     .then(data => console.log(data))
     .catch(error => {
      console.error('Error en la solicitud:', error);
      return { error: true };
      
 })



 
}

async function enviarArchivo(imagen) {
    const formData = new FormData();
    formData.append('file', imagen.files[0]); // elemento es un input de tipo file
    console.log(formData)

    try {
        const response = await fetch(`https://baldosaslv.uy/upload/mosaicos`, {
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




let botonImagenes = document.getElementById("enviarImgMosaicos");



 botonImagenes.addEventListener("click",async ()=>{

    let imagen = document.getElementById("imagenesMosaicos");

// Guardar el nombre de la imagen
 await guardarNombre(imagen);

  // Enviar la imagen
  try {
    await  enviarArchivo(imagen);
      // Recargar la página después de que la carga sea exitosa
      window.location.reload();
  } catch (error) {
      console.error("Error al enviar la imagen:", error);
      // Manejar el error de alguna manera si es necesario
  }

})




function guardarNombre(imagen){


    let nombre = imagen.value.split("\\").pop()

 

    return fetch(`https://baldosaslv.uy/mosaicosImagenes/${sector}`, {
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





async function traerImagenes(){

    try {
        const response = await fetch(`https://baldosaslv.uy/mosaicosImagenes/${sector}`);
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


let tbody = document.getElementById("tbody")
  
  async function mostrarImagenes() {
const mosaicos = await traerImagenes();

    mosaicos.forEach(element => {
        tbody.innerHTML += `
        <tr>
        <th scope="row">${element.id}</th>
        <td><img class="rutaImagen" src="imagenes/mosaicos/${element.ruta}" width="100px" alt=""></td>
        <td><button class="p-1 w-100 mt-5 btn btn-danger eliminar" id="${element.id}" data-img="${element.ruta}">Eliminar</button></td>
      </tr>
        `;

        
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
        location.reload();
    
    })
    
});

}





mostrarImagenes();