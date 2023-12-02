
    document.addEventListener("DOMContentLoaded", function() {

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