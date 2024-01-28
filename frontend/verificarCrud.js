// Obtiene el token del almacenamiento local
const token = localStorage.getItem('token');

// Haciendo una solicitud a la ruta protegida /crud con el token en los encabezados
fetch('http://localhost:3000/crud', {
  method: 'GET',
  headers: {
    'Authorization': `${token}`,
    'Content-Type': 'application/json',
    // Puedes incluir otros encabezados según tus necesidades
  },
})
.then(response => {
    if (!response.ok) {
      if (response.status === 401) {
        
        alert("Acceso Denegado");
    
          window.location.href = "index.html"; 
      } else {
        // Maneja otros errores de acuerdo a tus necesidades
        throw new Error('Error en la solicitud');
      }
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    // Aquí puedes manejar la respuesta de la ruta protegida
  })
  .catch(error => {
    console.error('Error:', error.message);
    // Aquí puedes manejar errores, por ejemplo, redirigir al usuario si el token no es válido
  });



  let cerrarSesion = document.getElementById("cerrarSesion")


  cerrarSesion.addEventListener("click", ()=>{

   localStorage.removeItem("token");

  window.location.href = "index.html"

  })