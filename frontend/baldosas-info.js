

const imagenes = document.querySelectorAll(".imagenGaleriaInfo");

const containerImage = document.querySelector(".containerImg");

const imgClickeada = document.querySelector('.imgShow');

const copy = document.querySelector('.copy');






imagenes.forEach(imagen => {
    imagen.addEventListener("click", ()=>{
      agregarImagen(imagen.getAttribute('src'), imagen.getAttribute('alt'));
    })

  });

  const agregarImagen = (srcImagen, altImagen)=>{
    containerImage.classList.toggle('moveContainer');
    imgClickeada.classList.toggle('imgTransition');
    imgClickeada.src = srcImagen;
    copy.innerHTML = altImagen;
  };



  let sector = localStorage.getItem("Mosaico")
  console.log(sector)

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
  


let titulo = document.getElementById("titulo")
let descripcion = document.getElementById("descripcion")
let imagen = document.getElementById("imagen")


async function mostrarCards() {
    
  const mosaicos = await bdMosaicos();

  mosaicos.forEach(elemento => {
       titulo.textContent = `
     ${elemento.titulo}
      `;

     descripcion.innerHTML =`
     
     <li class="" >Tamaño: ${elemento.tamaño}</li>
     <li class="">Unidades por metro: ${elemento.metro}</li>
   <li class="">Espesor: 2mm/1.5mm</li>
   <li class="">Peso: ${elemento.peso}</li>
     <li class="">Alto Transito</li>
 
     
     `

     imagen.innerHTML = `
     <img src="imagenes/mosaicos/${elemento.img}" class="imagenBaldosasInfo">
     `
     
  });

 


}

mostrarCards();






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



let ingresarImagenes = document.getElementById("ingresarImagenes");

  
  async function mostrarImagenes() {
const fotos = await traerImagenes();

    fotos.forEach(element => {
        ingresarImagenes.innerHTML += `
       <img  src="imagenes/mosaicos/${element.ruta}" alt="foto" id="foto${element.id}" class="img">
        
        `;

        
    });

  
    const idImagen = document.querySelectorAll('[id^="foto"]')

    console.log(idImagen);
    const imagenes = document.querySelectorAll(".img");
    
    console.log(imagenes)
    
    
    
    
      
    
    
      const containerImage = document.querySelector(".containerImg");
    
      const imgClickeada = document.querySelector('.imgShow');
    
      const copy = document.querySelector('.copy');
    
      const cerrarModal = document.querySelector('.bx.bx-x');
    
      idImagen.forEach(imagen => {
        imagen.addEventListener("click", ()=>{
          
          localStorage.setItem("idImg", imagen.id);
    
          agregarImagen(imagen.getAttribute('src'), imagen.getAttribute('alt'));
        })
    
      })
    
      const agregarImagen = (srcImagen, altImagen,)=>{
    
      
        containerImage.classList.toggle('moveContainer');
        imgClickeada.classList.toggle('imgTransition');
        imgClickeada.src = srcImagen;
        
      };
    
      const agregarImagen2 = (srcImagen, altImagen, )=>{
        imgClickeada.src = srcImagen;
      
      };

      cerrarModal.addEventListener('click', () => {
        containerImage.classList.toggle('moveContainer');
        imgClickeada.classList.toggle('imgTransition');
      });
      
     
      
     
    
      const botonAtras = document.querySelector("#buttonAtras");
      const botonAdelante = document.querySelector("#buttonAdelante");
    
    
      botonAdelante.addEventListener("click", () => {
        const fotoActualId = localStorage.getItem("idImg");
        const imagenActual = document.getElementById(fotoActualId);
        const siguienteImagen = imagenActual.nextElementSibling;
      
        if (siguienteImagen) {
          const srcSiguienteImagen = siguienteImagen.getAttribute('src');
          const altSiguienteImagen = siguienteImagen.getAttribute('alt');
      
          if(srcSiguienteImagen && altSiguienteImagen){
      
            localStorage.setItem("idImg", siguienteImagen.id);
            agregarImagen2(srcSiguienteImagen, altSiguienteImagen);
          }
    
    
        }else{
          const imagenes = document.querySelectorAll(".img");
    
          const srcImagenPrincipio = imagenes[0].getAttribute("src");
          
          localStorage.setItem("idImg", imagenes[0].id);
          agregarImagen2(srcImagenPrincipio);
          
        }
      });
    
    botonAtras.addEventListener("click", () => {
        const fotoActualId = localStorage.getItem("idImg");
        const imagenActual = document.getElementById(fotoActualId);
        const siguienteImagen = imagenActual.previousElementSibling;
      
        if (siguienteImagen) {
          const srcSiguienteImagen = siguienteImagen.getAttribute('src');
          const altSiguienteImagen = siguienteImagen.getAttribute('alt');
    
          if(srcSiguienteImagen && altSiguienteImagen){
      
          localStorage.setItem("idImg", siguienteImagen.id);
          agregarImagen2(srcSiguienteImagen, altSiguienteImagen);
        }
    
      }else{
        const imagenes = document.querySelectorAll(".img");
    
        const srcImagenPrincipio = imagenes[imagenes.length-1].getAttribute("src");
        
        localStorage.setItem("idImg", imagenes[imagenes.length-1].id);
        agregarImagen2(srcImagenPrincipio);
        
      }
      });
      
      
      }
      
      mostrarImagenes();