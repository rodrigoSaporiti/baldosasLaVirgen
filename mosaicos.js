/*
    document.addEventListener("DOMContentLoaded", function() {
 LINEA DE PRUEBA
        let elementos = [
            { imagen: "imagenes/card1.jpg", titulo: "Flores" },
            { imagen: "imagenes/card2.jpg", titulo: "Portada" },
            { imagen: "imagenes/card3.jpg", titulo: "Portada" },
            { imagen: "imagenes/portada.jpg", titulo: "Portada" },
            { imagen: "imagenes/portada2.jpg", titulo: "Portada" },
            { imagen: "imagenes/portada3.jpg", titulo: "Portada" },
            
        ];

        let tarjetasContainer = document.getElementById('tarjetasC');

        elementos.forEach(elemento => {
            let tarjetaHTML = `
            <div class="col-6 col-md-4 col-lg-2">
            <div class="card m-2 border-2 border-secondary rounded-bottom" style="width: 150px;">
                <img src="${elemento.imagen}" class="card-img-top" alt="" style="height: 150px;">
                <h5 class="card-title text-center">${elemento.titulo}</h5>
                <a href="baldosas-info.html" class="btn btn-dark text-center p-1 rounded-0">Ver Más.. </a>
            </div>
        </div>
            `;
    
            tarjetasContainer.innerHTML += tarjetaHTML;
        });
    });
    
    */

let tarjetasContainer = document.getElementById("tarjetasC");

//Fetch base de datos

async function bdMosaicos() {
  try {
    const response = await fetch("https://baldosaslv.uy/mosaicosEnviar");
    if (!response.ok) {
      throw new Error("Hubo un problema al obtener los datos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return []; // Devuelve un array vacío en caso de error
  }
}

async function mostrarCards() {
  const mosaicos = await bdMosaicos();

  mosaicos.forEach((elemento, indice) => {

    

    let tarjetaHTML = `


            <div class="cardMosaico" onclick="redirigirABaldosasinfo(${elemento.id}, ${indice+1})">
            <div class="w-100 d-flex justify-content-end">
            <div class="posicion"> <p class="indice">${indice+1}</p></div>
            </div>
            <div class="" style="width: 250px;">
            
                <img src="imagenes/mosaicos/${elemento.img}" loading="lazy" alt="" style="height: 250px; width:250px">

                <h5 class=" mt-2 text-center text-white">${elemento.titulo}</h5>
            <a href="baldosas-info.html" id="botonMosaicoCrud" data-btn="${elemento.id}" class="btn btn-dark w-100 p-1 rounded-0 mt-3">Ver Más.. </a>
            </div>
        </div>

        
            `;



    tarjetasContainer.innerHTML += tarjetaHTML;

     
    let botones = document.querySelectorAll("#botonMosaicoCrud");

    botones.forEach((element) => {
      element.addEventListener("click", () => {
        let idMosaico = element.getAttribute("data-btn");

        console.log(idMosaico);
        localStorage.setItem("Mosaico", idMosaico);
      });
    });
  });
}

function redirigirABaldosasinfo(id, indice) {
  let idMosaico = id;

  console.log(idMosaico);
  localStorage.setItem("indice", indice);
  localStorage.setItem("Mosaico", idMosaico);
  window.location.href = "baldosas-info.html";
}

mostrarCards();
