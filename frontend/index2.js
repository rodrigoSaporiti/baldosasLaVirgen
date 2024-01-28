document.addEventListener("DOMContentLoaded", function() {
    let miModal = new bootstrap.Modal(document.getElementById('miModal'));
    let decision = localStorage.getItem('decisionModal');

    if (!decision) {
        miModal.show();
    }

    document.getElementById('btnNoGracias').addEventListener('click', function() {
        miModal.hide();
        localStorage.setItem('decisionModal', 'no');
    });

    document.getElementById('btnEnviar').addEventListener('click', function() {
        let email = document.getElementById('inputEmail').value;
        console.log('Email enviado:', email);
        miModal.hide();
        localStorage.setItem('decisionModal', 'si');
    });
});


function redirigirALisas() {
    window.location.href = 'frontend/lisas.html';
    
  }


  function redirigirAMosaicos() {
    window.location.href = 'frontend/mosaicos.html';
    
  }
