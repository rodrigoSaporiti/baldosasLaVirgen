

function validarEmail(email) {
    
    var patronEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    
    return patronEmail.test(email);
  }
  


const enviarCorreo = document.getElementById("enviarCorreo");


// Modal de agradecimiento

function mostrarModal() {
  let modal = document.querySelector(".contenidoModal");

  
  modal.style.display = "flex";

  
  setTimeout(() => {
    modal.style.display = "none";
    location.reload()
  }, 1500); 


 
}




function crudCorreo() {

  enviarCorreo.addEventListener("click", () => {
    

    const correoNuevo = document.getElementById("correo").value;

    if (validarEmail(correoNuevo)) {

      mostrarModal();
      
      fetch('http://localhost:3000/enviarCorreo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correoNuevo }),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Si deseas recargar después de completar la operación asíncrona, pon la recarga aquí.
        
       
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
        return { error: true };
      });
    } else {
      alert("Ingrese un correo válido");
    }
  });
}

crudCorreo();

