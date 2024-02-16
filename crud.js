

let iconoBoton = document.getElementById("contenedorIcono");
 
let elementoAside = document.getElementById("aside")


 iconoBoton.addEventListener("click", ()=>{

   elementoAside.classList.toggle("ocultar");

 })




function redirigirABanos() {
    console.log("Redirigiendo a 'baños'");
    window.location.href = 'GaleriaInfoCrud';
    localStorage.setItem("sectorCrud", "baños")
  }

  function redirigirACocinas() {
    console.log("Redirigiendo a 'Cocinas'");
    window.location.href = 'GaleriaInfoCrud';
    localStorage.setItem("sectorCrud", "cocinas")
  }

  function redirigirALocalesComerciales() {
    console.log("Redirigiendo a 'localesComerciales'");
    window.location.href = 'GaleriaInfoCrud';
    localStorage.setItem("sectorCrud", "locales")
  }

  function redirigirAExteriores() {
    console.log("Redirigiendo a 'exteriores'");
    window.location.href = 'GaleriaInfoCrud';
    localStorage.setItem("sectorCrud", "exteriores")
  }
  
  function redirigirAInteriores() {
    console.log("Redirigiendo a 'interioresCrud'");
    window.location.href = 'GaleriaInfoCrud';
    localStorage.setItem("sectorCrud", "interiores")
  }


const tituloGaleriaCrud = document.getElementById("tituloGaleriaCrud");

const tituloSector = localStorage.getItem("sectorCrud")

tituloGaleriaCrud.innerHTML=`
<b>${tituloSector}</b>

`




