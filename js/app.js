// VARIABLES
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

// EVENT LISTENERS
eventListeners();
function eventListeners() {
  // cUANDO EL USUARIO AGREGA UN NUEVO TWEET
  formulario.addEventListener("submit", agregarTweet);

  //   CUANDO EL DOCUMENTO ESTA LISTO

  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];

    console.log(tweets);

    crearHTML();
  });
}
// FUNCIONES
function agregarTweet(e) {
  e.preventDefault();
  //   Textarea donde el usuario escribe
  const tweet = document.querySelector("#tweet").value;
  //   Validacion
  if (tweet === "") {
    mostrarError("Un tweet no puede ir vacio");
    // El return evita que se ejecuten mas lineas de codigo
    return;
  }

  const tweetObj = {
    id: Date.now(),
    tweet,
  };

  //   AGREGAR AL ARREGLO DE TWEETS

  tweets = [...tweets, tweetObj];

  //   Una vez agregado, crear HTML
  crearHTML();

  //   Reiniciar el formulario
  formulario.reset();
}

// Mostrar mensaje de error
function mostrarError(error) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");
  // Insertarlo en el contenido
  const contenido = document.querySelector("#contenido");
  contenido.appendChild(mensajeError);

  //   Elimina el error despues de 3 segundos
  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}

// Muestra un listado de los tweets

function crearHTML() {
  limpiarHTML();
  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      // Agregar un boton de eliminar
      const btnEliminar = document.createElement("a");
      btnEliminar.classList.add("borrar-tweet");
      btnEliminar.textContent = "X";

      //   Agregar la funcion de eliminar
      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
      };
      // Crear el HTML
      const li = document.createElement("LI");
      // Agregar el texto
      li.textContent = tweet.tweet;
      //   Asignar boton
      li.appendChild(btnEliminar);
      // Agregar al html
      listaTweets.appendChild(li);
    });
  }

  sincronizarStorage();
}

// Agrega los tweets actuales a local storage

function sincronizarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);

  crearHTML();
}

// Limpiar HTML

function limpiarHTML() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}
