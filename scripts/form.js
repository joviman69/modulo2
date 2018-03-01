var form = document.getElementsByName("contacto")[0];
var nombreInput = document.getElementById("nombre");
var telefonoInput = document.getElementById("telefono");
var emailInput = document.getElementById("email");
var fuenteInput = document.getElementById("fuente");
var otrosInput = document.getElementById("otros");
var observacionesInput = document.getElementById("observaciones");
var submitButton = document.getElementById("enviar");
var resetButton = document.getElementById("resetbut");


form.addEventListener("submit", function(e) {

  if (nombreInput.checkValidity() === false) {
    alert("Por favor escriba un nombre válido.\nSolamente caracteres, punto y espacio en blanco son admitidos");
    nombreInput.focus();
    e.preventDefault();
    return false;
  }
  
  var reTel = /^[9876]{1}\d{8}$/;
  var resultTelephoneValidation = reTel.test(telefonoInput.value);

  if (resultTelephoneValidation === false) {
    alert("Por favor escriba un número de télefono válido.\n Patrón: 9 cifras comenzando por 9, 8, 7 ó 6");
    telefonoInput.focus();
    e.preventDefault();
    return false;
  }
 
  var reEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  var resultEmailValidation = reEmail.test(emailInput.value);
  
  if (resultEmailValidation === false) {
    alert("Por favor escriba un email válido.Patrón: usuario@dominio.ltd");
    emailInput.focus();
    e.preventDefault();
    return false;
  }
  
  if (fuenteInput.checkValidity() === false) {
    alert("Por favor seleccione una fuente. Este campo es obligatorio");
    e.preventDefault();
    return false;
  }
  
  if (otrosInput.checkValidity() === false) {
    alert("Por favor indica como me has conocido. Este campo es obligatorio");
    otrosInput.focus();
    e.preventDefault();
    return false;
  }

  var cuentaPalabras = function () {
    var s = observacionesInput.value;
    s = s.replace(/(^\s*)|(\s*$)/gi,""); //eliminamos espacios iniciales y finales
    s = s.replace(/[ ]{2,}/gi," "); //eliminamos huecos de mas de 2 espacios
    s = s.replace(/\n /,"\n"); // eliminamos lineas vacias con espacios
    s = s.split(' ').length; // contamos elementos del array de split(' ')
    return s 
  }
  
  if (cuentaPalabras() > 150) {
    alert("Por favor no excedas de 150 palabras en las observaciones.");
    observacionesInput.focus();
    e.preventDefault();
    return false;
  }
    
  submitButton.setAttribute("disabled", "");
  e.preventDefault();
  
  var data = {
    nombre: nombreInput.value,
    telefono: telefonoInput.value,
    email: emailInput.value,
    fuente: fuenteInput.value,
    otros: otrosInput.value,
    observaciones: observacionesInput.value
  };

    createData(data);
  
    setTimeout(() => { 
      getData();
      form.reset();
      sendNotification("Formulario recibido correctamente", "Gracias por su interés");
      submitButton.removeAttribute("disabled", "");  
      } , 1000);
  
});



fuenteInput.addEventListener("change", function(e) {
  if (fuenteInput.value === "otros") {
  document.getElementById("div_otros").style.visibility="visible";
  document.getElementById("otros").setAttribute("required", "");
  }else {
    document.getElementById("div_otros").style.visibility="hidden";
    document.getElementById("otros").removeAttribute("required", "");
  }});

window.addEventListener("load", function(e) {
  fuenteInput.value = "facebook";
  document.getElementById("div_otros").style.visibility="hidden";
  document.getElementById("otros").removeAttribute("required", "");
});


resetButton.addEventListener("click", function(e) {
  fuenteInput.value = "facebook";
  document.getElementById("div_otros").style.visibility="hidden";
  document.getElementById("otros").removeAttribute("required", "");
});


