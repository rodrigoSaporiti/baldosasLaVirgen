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
  const imagenes = document.querySelectorAll(".img");

  const containerImage = document.querySelector(".containerImg");

  const imgClickeada = document.querySelectorAll('.imgShow');

  const copy = document.querySelector('.copy');

  imagenes.forEach(imagen => {
    imagen.addEventListener("click", ()=>{
      agregarImagen(imagen.getAttribute('src'), imagen.getAttribute('alt'));
    })

  })

  const agregarImagen = (srcImagen, altImagen)=>{
    containerImage.classList.toggle('moveContainer');
    containerImage.src = srcImagen;
    copy.innerHTML = altImagen;
  };

  containerImage.addEventListener('click', ()=>{
    containerImage.classList.toggle('moveContainer');
  })

  // Fin interacción de galería.