function redirigirABanos() {
    console.log("Redirigiendo a 'baños.html'");
    window.location.href = 'galeria-info.html';
    localStorage.setItem("Galeria", "baños")
  }

  function redirigirACocinas() {
    console.log("Redirigiendo a 'Cocinas.html'");
    window.location.href = 'galeria-info.html';
    localStorage.setItem("Galeria", "cocinas")
  }

  function redirigirALocalesComerciales() {
    console.log("Redirigiendo a 'localesComerciales.html'");
    window.location.href = 'galeria-info.html';
    localStorage.setItem("Galeria", "locales")
  }

  function redirigirAExteriores() {
    console.log("Redirigiendo a 'exteriores.html'");
    window.location.href = 'galeria-info.html';
    localStorage.setItem("Galeria", "exteriores")
  }
  
  function redirigirAInteriores() {
    console.log("Redirigiendo a 'interiores.html'");
    window.location.href = 'galeria-info.html';
    localStorage.setItem("Galeria", "interiores")
  }

  const spanGaleria = document.getElementById("spanGaleria")

  const titulo = localStorage.getItem("Galeria");

  spanGaleria.innerHTML = `
  <b>${titulo}</b>
  `
;
  


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
  
  let ingresarImagenes = document.getElementById("ingresarImagenes");
  
  async function mostrarImagenes (){
  
    let imagenesDB = await traerImagenes();
  
  imagenesDB.forEach(element => {
  
    ingresarImagenes.innerHTML += `
    
    <img src="imagenes/baños/${element.nombre}" alt="foto" id="foto${element.id}" class="img">
             
    `
    
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

  cerrarModal.addEventListener('click', ()=>{
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

  }
  });
  
  
  }
  
  mostrarImagenes();


  // Inicio de interacción para las fotos en la galería, se agrega transición cada vez que se clickea la imágen, se envían los atributos de source (ruta de la imágen) y alt que es el texto alternativo por si no se visualiza la foto.
 




  // Fin interacción de galería.
