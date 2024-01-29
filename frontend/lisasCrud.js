function redirigirAmarillas() {
    window.location.href = 'lisas-info.html';
    localStorage.setItem("Lisas", "amarillas")
  }

  function redirigirAzules() {
    window.location.href = 'lisas-info.html';
    localStorage.setItem("Lisas", "azules")
  }

  function redirigirBlancas() {
    window.location.href = 'lisas-info.html';
    localStorage.setItem("Lisas", "blancos")
  }

  function redirigirCueros() {
    window.location.href = 'lisas-info.html';
    localStorage.setItem("Lisas", "Cueros")
  }

  function redirigirCremas() {
    window.location.href = 'lisas-info.html';
    localStorage.setItem("Lisas", "cremas")
  }

  function redirigirGrises(){
    window.location.href = 'lisas-info.html';
    localStorage.setItem("Lisas", "grises")
  }

  function redirigirNegros() {
    window.location.href = 'lisas-info.html';
    localStorage.setItem("Lisas", "negros")
  }

  function redirigirRojos() {
    window.location.href = 'lisas-info.html';
    localStorage.setItem("Lisas", "rojos")
  }

  function redirigirVerdes() {
    window.location.href = 'lisas-info.html';
    localStorage.setItem("Lisas", "verdes")
  }



  let titulo = document.getElementById("tituloGaleriaCrud")


  let sector = localStorage.getItem("Lisas");


  titulo.textContent =  sector;


  



async function enviarArchivo(elemento) {
    const formData = new FormData();
    formData.append('file', elemento.files[0]); // elemento es un input de tipo file
    console.log(formData)

    try {
        const response = await fetch(`http://baldosaslv.uy/upload/${sector}`, {
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


    let nombre = imagen.value.split("\\").pop()

    return fetch(`http://baldosaslv.uy/${sector}`, {
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


const botonEnviar = document.getElementById("enviar");








botonEnviar.addEventListener("click", (event) => {
    // Evitar que el formulario se envíe automáticamente y recargue la página
    event.preventDefault();

    const imagen = document.getElementById("imagenLisas");
    
    guardarNombre(imagen);
    enviarArchivo(imagen);
    
});












  

async function traerImagenes(){

    try {
        const response = await fetch(`http://baldosaslv.uy/${sector}`);
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

    return fetch(`http://baldosaslv.uy/${ruta}/${sector}`, {
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
    return fetch(`http://baldosaslv.uy/eliminarImagen/${sector}/${id}`,{
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










