// document.addEventListener("DOMContentLoaded", function(){

// let imagenes =
//     [
//     {img: imagenes/bathrom2.jpg},
//     {img: imagenes/bathrom2.jpg},
//     {img: imagenes/bathrom2.jpg},
//     {img: imagenes/bathrom2.jpg},
//     {img: imagenes/bathrom2.jpg},
//     {img: imagenes/bathrom2.jpg},
//     {img: imagenes/bathrom2.jpg},
//     {img: imagenes/bathrom2.jpg},
//     {img: imagenes/bathrom2.jpg},
//     {img: imagenes/bathrom2.jpg},
//     {img: imagenes/bathrom2.jpg},
//     {img: imagenes/bathrom2.jpg},
//     {img: imagenes/bathrom2.jpg}
// ]



// let contador = 0;
// const contenedor = document.querySelector(".slideshow");
// const overlay= document.querySelector(".overlay");
// const galeria_imagenes = document.querySelectorAll(".galeria img");
// const img_slideshow = document.querySelector(".slideshow img");


// contenedor.addEventListener("click", function(event){
 
//     let atras = contenedor.querySelector(".atras");
//     let adelante = contenedor.querySelector(".adelante");
//     let img = contenedor.querySelector("img");

//     let tgt = event.target;

//     if(tgt == atras){
//         if(contador>0){
//             img.src = imagnes[contador - 1].img
//             contador--
//     }
     





// })

// })


const imagenes = document.querySelectorAll(".imagenGaleriaInfo");

const containerImage = document.querySelector(".containerImg");

const imgClickeada = document.querySelector('.imgShow');

const copy = document.querySelector('.copy');

const cerrarModal = document.querySelector('.bx.bx-x');




imagenes.forEach(imagen => {
    imagen.addEventListener("click", ()=>{
      agregarImagen(imagen.getAttribute('src'), imagen.getAttribute('alt'));
    })

  })

  const agregarImagen = (srcImagen, altImagen)=>{
    containerImage.classList.toggle('moveContainer');
    imgClickeada.classList.toggle('imgTransition');
    imgClickeada.src = srcImagen;
    copy.innerHTML = altImagen;
  };

  cerrarModal.addEventListener('click', ()=>{
    containerImage.classList.toggle('moveContainer');
    imgClickeada.classList.toggle('imgTransition');
  });


  let sector = localStorage.getItem("Mosaico")
  console.log(sector)

  async function bdMosaicos(){
    try {
      const response = await fetch(`http://localhost:3000/mosaicosDB/${sector}`);
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
      const response = await fetch(`http://localhost:3000/mosaicosImagenes/${sector}`);
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



let imagenesGaleria = document.getElementById("imagenesGaleria")

  
  async function mostrarImagenes() {
const imagenes = await traerImagenes();

    imagenes.forEach(element => {
        imagenesGaleria.innerHTML += `
        <img class="imagenGaleriaInfo" loading="lazy" src="imagenes/mosaicos/${element.ruta}" alt="" data-img-mostar="${element.id}">
        `;

        
    });

  }

  mostrarImagenes();