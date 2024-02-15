const enviar = document.getElementById("enviarMosaico");





const tipoBaldosa = "mosaicos";

async function enviarArchivo(elemento) {
    const formData = new FormData();
    formData.append('file', elemento.files[0]); // elemento es un input de tipo file
    console.log(formData)

    try {
        const response = await fetch(`https://baldosaslv.uy/upload/${tipoBaldosa}`, {
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


enviar.addEventListener("click", async(event)=>{

    event.preventDefault();

    const imagen = document.getElementById("imagenMosaico");

 const  nombreImagen  = document.getElementById("nombreImagen").value
   const tamañoBaldosa = document.getElementById("tamañoBaldosa").value
  const  cantidadM2 = document.getElementById("cantidadM2").value
  const  pesoBaldosa = document.getElementById("pesoBaldosa").value
 
  try {
    // Primero, enviar el archivo
    await enviarArchivo(imagen);

    // Luego, guardar el nombre y otros datos
    await guardarNombre(imagen, nombreImagen, tamañoBaldosa, cantidadM2, pesoBaldosa);

    // Ambas operaciones se completaron correctamente, ahora recargamos la página
    location.reload();
} catch (error) {
    console.error('Error en el evento de envío:', error);
}

})





 function guardarNombre(imagen, a , b , c , d){


    let nombre = imagen.value.split("\\").pop()

   datos = {
    titulo : a ,
    img : nombre ,
    tamaño : b ,
    metro : c ,
    peso: d
   }

    return fetch(`https://baldosaslv.uy/mosaicosEnviar`, {
    method: 'POST',
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



let tarjetasContainer = document.getElementById('tarjetasC');


async function bdMosaicos(){
    try {
      const response = await fetch("https://baldosaslv.uy/mosaicosDB");
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
  



  async function mostrarCards() {
    
    const mosaicos = await bdMosaicos();

    mosaicos.forEach(elemento => {
        let tarjetaHTML = `
            <div class="col-6 col-md-4 col-lg-2">
                <div class="card m-2 border-2 border-secondary rounded-bottom" style="width: 150px;">
                    <img src="imagenes/mosaicos/${elemento.img}" class="card-img-top" alt="" style="height: 150px;">
                    <h5 class="card-title text-center text-dark">${elemento.titulo}</h5>
                <a href="baldosas-infoCrud.html" id="botonMosaicoCrud" data-btn="${elemento.id}" class="btn btn-dark text-center p-1 rounded-0">Ver Más.. </a>
                </div>
            </div>
        `;

        tarjetasContainer.innerHTML += tarjetaHTML;

       
    });

    let botones = document.querySelectorAll("#botonMosaicoCrud");

    botones.forEach(element => {

        element.addEventListener("click", ()=>{

            let idMosaico = element.getAttribute("data-btn");

            console.log(idMosaico)
            localStorage.setItem("idMosaico", idMosaico)
        })
        
    });

   


}

mostrarCards();