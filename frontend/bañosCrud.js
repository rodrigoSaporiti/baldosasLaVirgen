const botonEnviar = document.getElementById("enviar");

async function enviarArchivo(elemento) {
    const formData = new FormData();
    formData.append('file', elemento.files[0]); // elemento es un input de tipo file
    console.log(formData)

    try {
        const response = await fetch('http://localhost:3000/upload', {
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

    return fetch('http://localhost:3000/enviarImagen', {
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
        const response = await fetch("http://localhost:3000/traerImagen");
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
      <th scope="row">${element.id}</th>
      <td><img src="imagenes/baños/${element.nombre}" width="100px" alt=""></td>
      <td><button class="p-1 w-100 btn btn-danger">Eliminar</button></td>
    </tr>
        `
    });

}

mostrarImagenes();