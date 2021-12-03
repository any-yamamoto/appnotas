var today = new Date();
var date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
let color = "";

$("#nueva form").on("submit", function () {
  var titulo = $("#titulo").val();
  var contenido = $("#contenido").val();
  var nota = $("<div></div>");
 
  nota
    .attr("class", `nota ${color}`)
    .append("<h5> Creada: " + date + "</h5>")
    .append("<h2>" + titulo + "</h2>")
    .append("<p>" + contenido + "</p>")
    .append(
      '<a href="#" class="edit"><img src="img/editar.png" alt="edit"></a>'
    )
    .append(
      '<a href="#" class="delete"><img src="img/cerrar.png" alt="delete"></a>'
    )
    .append(
        `<p id="datocolor" class="display datocolor" value=`+ color +`>` + color + `</p>`
      );
  $("#notas").prepend(nota);
  guardartodo();
  $.mobile.navigate("#home");
  return false;
});
$("#notas").on("click", ".nota .delete", function () {
  var eliminar = confirm("Vas a eliminar una nota");
  
  if (eliminar) {
    $(this).parent().remove();
    guardartodo();
  }
});

$("#notas").on("click", ".nota .edit", function () {
  var originalt = $(this).parent().children("h2").text();
  var originalc = $(this).parent().children("p").text();
  $("#editartitulo").val(originalt);
  $("#editarcontenido").val(originalc);
  $(this).parent().attr("data-editarnota", "este");
  $.mobile.navigate("#editar");
});
$("#editar form").on("submit", function () {
  var editadot = $("#editartitulo").val();
  var editadoc = $("#editarcontenido").val();
  var editarnota = $("#notas").find("[data-editarnota]");
  editarnota.children("h2").text(editadot);
  editarnota.children("p").text(editadoc);
  editarnota.removeAttr("data-editarnota");
  guardartodo();
  $.mobile.navigate("#home");
  return false;
});
$("#home").on("pagebeforeshow", function () {
  var editarnota = $("#notas").find("[data-editarnota]");
  editarnota.removeAttr("data-editarnota");
});
$("#todas").on("click", function () {
  var eliminartodo = confirm("Vas a eliminar todas las notas, ¿estas seguro?");
  if (eliminartodo) {
    $("#notas").children().remove();
    localStorage.clear();
  }
});

//GUARDARTODO variable
function guardartodo() {
  var originalnotas = new Array();
  $("#notas div").each(function () {
    originalnotas.push($(this).html());
  });
  var originalesJson = JSON.stringify(originalnotas);
  localStorage.setItem("notas", originalesJson);
}

//para cuando hace reload o abrimos la app de nuevo
$(document).on("ready", function () {
  
  var contenidoapp = localStorage.getItem("notas");
  if (contenidoapp != null && contenidoapp != undefined && contenidoapp != "") {
    var contenidoapp_array = JSON.parse(contenidoapp);
    $.each(contenidoapp_array, function (indice, valor) {
      var nota = $("<div></div>");
      nota.attr("class", `nota color`).append(valor);
      if (nota.children("h2").attr("data-cambiar") == "si") {
        nota.css({ backgroundColor: "#c0efcaa9", color: "#29272a" });
      }
      $("#notas").append(nota);
    });
    // let datocolor = document.getElementsById('datocolor');
    // color = datocolor.value;
  }
});

$("#rojo").on("click", function () {
  color = "rojo";
  
});
$("#rosa").on("click", function () {
  color = "rosa";
  
});
$("#amarillo").on("click", function () {
  color = "amarillo";
  
});
$("#verde").on("click", function () {
  color = "verde";
 
});
$("#azul").on("click", function () {
  color = "azul";
  
});

function darkmode() {
  var dark = document.body;
  dark.classList.toggle("dark-mode");
}