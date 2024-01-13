


let titulo = document.getElementById("titulo");
let modal = document.getElementById("modalMosaicoInfo");
 let sector = localStorage.getItem("idMosaico")
 let actualizarInfo = document.getElementById("actualizarInfo");



async function bdMosaicos(){
    try {
      const response = await fetch(`http://localhost:3000/mosaicosDB/${sector}`);
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


<label for="recipient-name" class="col-form-label">Imagen Actual</label>
<img src="imagenes/mosaicos/${element.img}" data-img="${element.img}" id="imagenActual" width="80">

<label for="recipient-name" class="col-form-label">Nueva Imagen</label>
<input type="file" class="form-control" id="imagenMosaico">

`

    });

actualizarInfo.addEventListener("click", ()=>{

let titulo = document.getElementById("titulo1").value
let tamaño = document.getElementById("tamaño").value
let metro = document.getElementById("metro").value
let peso = document.getElementById("peso").value

let imagenActual = document.getElementById("imagenActual");
let imagenActualData = imagenActual.getAttribute("data-img")


let imagen = document.getElementById("imagenMosaico");
 

if(imagen.files.length ==0){

    imagen = imagenActual;
    actualizar(imagen, titulo , tamaño, metro , peso)
   
}else{
    eliminarArchivo(imagenActual);
    enviarArchivo(imagen);
    actualizar(imagen, titulo , tamaño, metro , peso)
}

    
 
})





  }

  mostrar();






  
    
  function actualizar(imagen, a , b , c , d){

    
   

    let nombre = imagen.value.split("\\").pop();

   datos = {
    titulo : a ,
    img : nombre ,
    tamaño : b ,
    metro : c ,
    peso: d

   }

    return fetch(`http://localhost:3000/mosaicos/${sector}`, {
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
        const response = await fetch(`http://localhost:3000/upload/mosaicos`, {
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


function eliminarArchivo(ruta){

    return fetch(`http://localhost:3000/${ruta}`, {
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
