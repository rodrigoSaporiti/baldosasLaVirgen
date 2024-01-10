function redirigirABanos() {
    console.log("Redirigiendo a 'baños.html'");
    window.location.href = 'bañosCrud.html';
  }

  function redirigirACocinas() {
    console.log("Redirigiendo a 'Cocinas.html'");
    window.location.href = 'cocinasCrud.html';
  }

  function redirigirALocalesComerciales() {
    console.log("Redirigiendo a 'localesComerciales.html'");
    window.location.href = 'localesComercialesCrud.html';
  }

  function redirigirAExteriores() {
    console.log("Redirigiendo a 'exteriores.html'");
    window.location.href = 'exterioresCrud.html';
  }
  
  function redirigirAInteriores() {
    console.log("Redirigiendo a 'interioresCrud.html'");
    window.location.href = 'interioresCrud.html';
  }



  let iconoBoton = document.getElementById("contenedorIcono");
 
 let elementoAside = document.getElementById("aside")
 

  iconoBoton.addEventListener("click", ()=>{

    elementoAside.classList.toggle("ocultar");

  })
