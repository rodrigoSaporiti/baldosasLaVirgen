function redirigirAmarillas() {
    window.location.href = 'lisas-galeria.html';
    localStorage.setItem("LisasWeb", "amarillas")
  }

  function redirigirAzules() {
    window.location.href = 'lisas-galeria.html';
    localStorage.setItem("LisasWeb", "azules")
  }

  function redirigirBlancas() {
    window.location.href = 'lisas-galeria.html';
    localStorage.setItem("LisasWeb", "blancas")
  }

  function redirigirCueros() {
    window.location.href = 'lisas-galeria.html';
    localStorage.setItem("LisasWeb", "Cuero")
  }

  function redirigirCremas() {
    window.location.href = 'lisas-galeria.html';
    localStorage.setItem("LisasWeb", "cremas")
  }

  function redirigirGrises(){
    window.location.href = 'lisas-galeria.html';
    localStorage.setItem("LisasWeb","grises")
  }

  function redirigirNegros() {
    window.location.href = 'lisas-galeria.html';
    localStorage.setItem("LisasWeb", "negras")
  }

  function redirigirRojos() {
    window.location.href = 'lisas-galeria.html';
    localStorage.setItem("LisasWeb", "rojas")
  }

  function redirigirVerdes() {
    window.location.href = 'lisas-galeria.html';
    localStorage.setItem("LisasWeb", "verdes")
  }



  let titulo = document.getElementById("spanGaleria")


  let sector = localStorage.getItem("LisasWeb");


  titulo.textContent =  sector;



  


  async function traerImagenes(){

    try {
        const response = await fetch(`http://baldosaslv.uy/${sector}`);
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
    
    <img src="imagenes/${sector}/${element.nombre}" alt="foto" id="foto${element.id}" class="img">
             
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