var form = document.getElementsByName("contacto")[0];

var xhr = new XMLHttpRequest();

// function getData() {
//   xhr.open("GET", "http://localhost:8000/api/task", true);

//   xhr.onreadystatechange = function() {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//       var response = JSON.parse(xhr.responseText);

//       var div = document.createElement("div");
//       var children = "";
//       response.forEach(element => {
//         children += "<p>" + element.name + "</p>";
//       });

//       div.innerHTML = children;

//       form.appendChild(div);
//     } else if (xhr.readyState === 4 && xhr.status !== 200) {
//       console.error("Se ha producido un error");
//     }
//   };

//   xhr.send();
// }

function getData() {
  makeRequest("GET", "http://localhost:8000/api/task", null, function(data) {
    var response = JSON.parse(data);
    var div = document.createElement("div");
    var children = "";
    response.forEach(element => {
      children += "<p>" + element.name + "</p>";
    });

    div.innerHTML = children;

    form.appendChild(div);
  });
}

// function createData() {
//   xhr.open("POST", "http://localhost:8000/api/task", true);
//   xhr.setRequestHeader("Content-Type", "application/json");

//   xhr.onreadystatechange = function() {
//     if (xhr.readyState === 4 && xhr.status === 201) {
//       console.log("Datos creados correctamente");
//     } else if (xhr.readyState === 4 && xhr.status !== 201) {
//       console.log("Opps! Algo ha salido mal");
//     }
//   };

//   var data = {
//     name: "Prueba"
//   };
//   xhr.send(JSON.stringify(data));
// }

function createData() {
  var data = {
    name: "Prueba"
  };
  makeRequest("POST", "http://localhost:8000/api/task", data, function() {
    console.log("Datos creados correctamente");
  });
}

// createData();
getData();

function makeRequest(method, url, body, callbackSuccess) {
  var xhr = new XMLHttpRequest();

  xhr.open(method, url, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      callbackSuccess(xhr.responseText);
    }
  };

  if (body) {
    xhr.send(JSON.stringify(body));
  } else {
    xhr.send();
  }
}
 