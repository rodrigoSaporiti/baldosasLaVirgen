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

    let tarjetasContainer = document.getElementById('tarjetasC');


    //Fetch base de datos

     async function bdMosaicos(){
        try {
          const response = await fetch("http://localhost:3000/mosaicos");
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
                        <img src="imagenes/${elemento.img}" class="card-img-top" alt="" style="height: 150px;">
                        <h5 class="card-title text-center">${elemento.nombre}</h5>
                        <a href="baldosas-info.html" class="btn btn-dark text-center p-1 rounded-0">Ver Más.. </a>
                    </div>
                </div>
            `;
    
            tarjetasContainer.innerHTML += tarjetaHTML;
        });
    }
    
    mostrarCards();