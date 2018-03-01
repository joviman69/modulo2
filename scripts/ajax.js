var form = document.getElementsByName("contacto")[0];

var xhr = new XMLHttpRequest();

function getData() {
  xhr.open("GET", "http://localhost:8000/api/contacts", true);


    xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      var children ="";
      var div = document.createElement("div");
      div.id = "responseDiv";
      var children = "<h2>Ajax Responses</h2>";
      
      response.forEach(element => {
        children += "<p> Nombre: " + element.nombre 
        + "<br>Teléfono: " + element.telefono   
        + "<br>Email: " + element.email  
        + "<br>Fuente: " + element.fuente 
        + "<br>Otros: " + element.otros 
        + "<br>Observaciones: " + element.observaciones + "</p>";
      });
      div.innerHTML = children;
      form.appendChild(div);
      
    } else if (xhr.readyState === 4 && xhr.status !== 200) {
      console.error("Error en la petición");
    }
  };
  xhr.send();
  
}


function createData(data) {
  xhr.open("POST", "http://localhost:8000/api/contacts", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 201) {
      //console.log("Datos creados correctamente");
    } else if (xhr.readyState === 4 && xhr.status !== 201) {
      console.log("Error en el envío a la base de datos");
    }
  };
  
  xhr.send(JSON.stringify(data));
}