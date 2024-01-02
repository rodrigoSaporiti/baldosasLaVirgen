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



 