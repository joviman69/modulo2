var form = document.getElementsByName("contacto")[0];

var nombreInput = document.getElementById("nombre");
var telefonoInput = document.getElementById("telefono");
var emailInput = document.getElementById("email");
var fuenteInput = document.getElementById("fuente");
var otrosInput = document.getElementById("otros");
var observacionesInput = document.getElementById("observaciones");
var submitButton = document.getElementById("enviar");

form.addEventListener("change", function (e) {
if (fuenteInput.value === "otros") {
document.getElementById("otrosid").style.visibility="visible";
}else {
  document.getElementById("otrosid").style.visibility="hidden";
}});

form.addEventListener("change", cuentaPalabras );  

form.addEventListener("submit", function(event) {
  if (nombreInput.checkValidity() === false) {
    alert("Por favor escriba un nombre válido");
    nombreInput.focus();
    event.preventDefault();
    return false;
  }

  if (telefonoInput.checkValidity() === false) {
    alert("Por favor escriba un número de télefono válido");
    telefonoInput.focus();
    event.preventDefault();
    return false;
  }

  var regex = /[A-Za-z0-9\.\+]+@[A-Za-z0-9]+\.[A-Za-z0-9\.]+/;
  var resultEmailValidation = regex.test(emailInput.value);

  if (resultEmailValidation === false) {
    alert("Por favor escriba un email válido");
    emailInput.focus();
    event.preventDefault();
    return false;
  }

  if (fuenteInput.checkValidity() === false) {
    alert("Por favor seleccione una fuente");
    event.preventDefault();
    return false;
  }

  if (cuentaPalabras > 150) {
    alert("Por favor no exceda las 150 palabras en este text area");
    emailInput.focus();
    event.preventDefault();
    return false;
  }
  
  submitButton.setAttribute("disabled", "");
  event.preventDefault();

  setTimeout(function() {
    form.reset();
    sendNotification("Formulario recibido", "Gracias por participar");
    submitButton.removeAttribute("disabled");
  }, 1000);
});


function cuentaPalabras () {
  var s = observaciones.value;
  s = s.replace(/(^\s*)|(\s*$)/gi,""); //espacios iniciales y finales
  s = s.replace(/[ ]{2,}/gi," "); //huecos de mas de 2 espacios
  s = s.replace(/\n /,"\n"); // lineas vacias con espacios
  return (s.split(' ').length);
}