window.onscroll = function(){miFuncion()};

let veredaInfo = document.getElementById("veredaInfo");
let veredaPanes = document.getElementById("veredaPanes");
let veredaBarras = document.getElementById("veredaBarras");


let distancia_veredaInfo, distancia_veredaPanes, distancia_veredaBarras;

function miFuncion(){
    
    distancia_veredaInfo = window.innerHeight - veredaInfo.getBoundingClientRect().top;
    if(distancia_veredaInfo >= 200 ){
        veredaInfo.classList.add("efecto-veredaInfo");
    }else{
        veredaInfo.classList.remove("efecto-veredaInfo")
    }

    distancia_veredaPanes = window.innerHeight - veredaPanes.getBoundingClientRect().top;
    if(distancia_veredaPanes >= 200){
        veredaPanes.classList.add("efecto-veredaPanes");
    }else{
        veredaPanes.classList.remove("efecto-veredaPanes")
    }

    distancia_veredaBarras = window.innerHeight - veredaPanes.getBoundingClientRect().top;
    if(distancia_veredaBarras >= 200){
        veredaBarras.classList.add("efecto-veredaBarras");
    }else{
        veredaBarras.classList.remove("efecto-veredaBarras")
    }
}


let inicio = document.querySelector(".inicio");


    let parrafo = document.createElement("p");
    let texto = document.createTextNode("Desliza hacia abajo ↓↓");
    parrafo.appendChild(texto);

    parrafo.classList.add("parrafoDeslizar");

    inicio.insertAdjacentElement("afterend", parrafo);

    parrafo.style.display="block";


let mostrar= false;
setInterval(function(){

     mostrar = !mostrar;

    if(mostrar){
        parrafo.style.opacity="1";
    } else{
        parrafo.style.opacity="0";
    }



}, 2000);