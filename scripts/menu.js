/* la variable menuItems contiene todos los elementos de la navbar */
var menuItems = document.getElementsByClassName("menu__list__item");

/* asignamos un listener a un evento click a cada elemento de menuItems */
for (var i = 0; i < menuItems.length; i++) {
  menuItems[i].addEventListener("click", function(event) {
    /* hacemos un split con # de la propiedad href de cada a */
    var goTo = this.getElementsByTagName("a")[0].href.split("#");

    /* la funcion deleteActiveClass() elimina la clase active a todos los elemetos de menuItems*/
    deleteActiveClass();
    /* añadimos la clase ...--active al elemento clicado */
    this.classList.add("menu__list__item--active");

    if (goTo.length === 2) {
      event.preventDefault();
      var sectionToGo = goTo[goTo.length - 1];
      var elementToGo = getSectionToScroll(sectionToGo);
      scrollToSection (elementToGo);
    }
  });
}
/* elimina en bucle la clase active a todos los elementos de menuItems */
function deleteActiveClass() {
  for (var i = 0; i < menuItems.length; i++) {
    menuItems[i].classList.remove("menu__list__item--active");
  }
}

function getSectionToScroll(id) {
  var section;
  if (id === "") {
    section = document.getElementsByClassName("header")[0];
  } else {
    section = document.getElementById(id);
  }

  return section;
}

function scrollToSection(element) {
  var jump = parseInt(element.getBoundingClientRect().top * 0.2);
  document.body.scrollTop += jump;
  document.documentElement.scrollTop += jump;

  if (!element.lastJump || element.lastJump > Math.abs(jump)) {
    element.lastJump = Math.abs(jump);
    setTimeout(function() {
      scrollToSection(element);
    }, 25);
  } else {
    element.lastJump = null;
  }
}

var acumulativeOffset = function(element) {
  var top = 0;

  do {
    top += element.offsetTop || 0;
    element = element.offsetParent;
  } while (element);

  return top - 40;
};

var quienSoyOffset = acumulativeOffset(document.getElementById("quien-soy"));
var formacionOffset = acumulativeOffset(document.getElementById("formacion"));
var sobreMiOffset = acumulativeOffset(document.getElementById("sobre-mi"));

window.addEventListener("scroll", changeMenu);

var previous;

function changeMenu(event) {
  var pageOffset = window.pageYOffset;

  if (pageOffset >= 0 && pageOffset < quienSoyOffset) {
    if (!previous || previous !== 1) {
      previous = 1;
    } else {
      return false;
    }

    deleteActiveClass();
    setActiveItem("a[href='#']");
  } else if (pageOffset >= quienSoyOffset && pageOffset < formacionOffset) {
    if (!previous || previous !== 2) {
      previous = 2;
    } else {
      return false;
    }

    deleteActiveClass();
    setActiveItem("a[href$='quien-soy']");
  } 

    else if (pageOffset >= formacionOffset && pageYOffset < sobreMiOffset) {
      if (!previous || previous !== 3) {
        previous = 3;
      } else {
        return false;
      }
    deleteActiveClass();
    setActiveItem("a[href$='formacion']");
  }

  else if (pageOffset >= sobreMiOffset ) {
    if (!previous || previous !== 4) {
      previous = 4;
    } else {
      return false;
    }
  deleteActiveClass();
  setActiveItem("a[href$='sobre-mi']");
}
}

function setActiveItem(selector) {
  document
    .querySelector(selector)
    .parentNode.classList.add("menu__list__item--active");
}
