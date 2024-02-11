(function () {
  'use strict';

  try {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add('was-validated');
        }, false);
      });
  } catch (error) {
    console.error('Error en el script de validación de Bootstrap:', error);
  }
})();


let botonEnviar = document.getElementById("botonEnviar")


botonEnviar.addEventListener("click", ()=>{


    let username = document.getElementById("exampleInputEmail1").value;
    let password = document.getElementById("exampleInputPassword1").value;
    
    console.log(username, password)

    fetch('https://baldosaslv.uy/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
      })
      .then(response => response.json())
      .then(data => {
        // Muestra el token en la consola del navegador
        console.log('Token de sesión:', data.token);
        if(data.token){
            localStorage.setItem("token", data.token)
            window.location.href ="index-crud.html"
        }else{
          alert("Contraseña incorrecta")
        }
        
      })
      .catch(error => {
        console.error('Error:', error);
      });

})
 