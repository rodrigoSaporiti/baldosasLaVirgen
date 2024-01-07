function redirigirABanos() {
    console.log("Redirigiendo a 'baños.html'");
    window.location.href = 'baños.html';
  }

  function redirigirACocinas() {
    console.log("Redirigiendo a 'Cocinas.html'");
    window.location.href = 'cocinas.html';
  }

  function redirigirALocalesComerciales() {
    console.log("Redirigiendo a 'localesComerciales.html'");
    window.location.href = 'localesComerciales.html';
  }

  function redirigirAExteriores() {
    console.log("Redirigiendo a 'exteriores.html'");
    window.location.href = 'exteriores.html';
  }
  
  function redirigirAInteriores() {
    console.log("Redirigiendo a 'interiores.html'");
    window.location.href = 'interiores.html';
  }

// Inicio de interacción para las fotos en la galería, se agrega transición cada vez que se clickea la imágen, se envían los atributos de source (ruta de la imágen) y alt que es el texto alternativo por si no se visualiza la foto.
 

const idImagen = document.querySelectorAll('[id^="foto"]')

console.log(idImagen);
const imagenes = document.querySelectorAll(".img.id");




  


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
    copy.innerHTML = altImagen;
  };

  const agregarImagen2 = (srcImagen, altImagen, )=>{
    imgClickeada.src = srcImagen;
    copy.innerHTML = altImagen;
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
  



  // Fin interacción de galería.