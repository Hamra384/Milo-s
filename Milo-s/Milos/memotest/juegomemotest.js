var interval;
var started = false;
var clickedArray = [];
var time = 0;
var ready = true;
var numCompleted = 0;
var canClick = true;

// Image paths (actualizado con 5 imágenes iguales)
var imagePaths = [
  "../Imagenes/pibe.png",
  "../Imagenes/pibe.png",
  "../Imagenes/piba.png",
  "../Imagenes/piba.png",
  "../Imagenes/señorarulos.png",
  "../Imagenes/señorarulos.png",
  "../Imagenes/señordelmemotest.png",
  "../Imagenes/señordelmemotest.png",
  "../Imagenes/ultima.png",
  "../Imagenes/ultima.png",
];

// Run functions under here:
setUp();

// Function definitions go under here:

// ...

function revealLastPair() {
  var lastPair = document.querySelectorAll('td[data-value="' + imagePaths[imagePaths.length - 1] + '"]');

  setTimeout(function () {
    reveal(lastPair[0]);
    reveal(lastPair[1]);
    setTimeout(function () {
      alert("¡Ganaste en " + time + " segundos! ¡Felicidades!");
    }, 1000);
  }, 2000);
}



// ...

function setUp() {
  var grid = document.getElementsByTagName("td");
  var answers = randomAnswers();

  for (var i = 0; i < grid.length; i++) {
    var cell = grid[i];

    // ...

    cell.addEventListener('click', function () {
      if (ready == false || !canClick)
        return;

      startTimer();
      if (this.clicked == false && this.completed == false) {
        clickedArray.push(this);
        reveal(this);
      }

      if (clickedArray.length == 2) {
        canClick = false;
        if (clickedArray[0].getAttribute("data-value") == clickedArray[1].getAttribute("data-value")) {
          complete(clickedArray[0]);
          complete(clickedArray[1]);

          clickedArray = [];
          canClick = true;

          if (numCompleted == 10) { // Cambia 8 a 10 para detectar 10 pares
            // Mostrar el último par antes de mostrar el mensaje de victoria
            revealLastPair();
          }
        } else {
          setTimeout(resetClickedArray, 2000);
        }
      }
    });
  }

  document.getElementById("reset").addEventListener('click', function () {
    history.go(0);
  });
}


function randomAnswers() {
  var answers = imagePaths.slice();
  answers = shuffle(answers); // Mezcla el array de rutas de las imágenes
  return answers;
}

function shuffle(array) {
  var currentIndex = array.length, randomIndex, temporaryValue;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function hide(cell) {
  cell.style.backgroundColor = "grey";
  cell.style.backgroundImage = 'none'; // Oculta la imagen
  cell.clicked = false;
}

function complete(cell) {
  numCompleted++;
  cell.completed = true;
  cell.style.backgroundColor = " rgba(255, 0, 0, 0.685);"
}

function reveal(cell) {
  cell.style.backgroundColor = " rgba(255, 0, 0, 0.685);"
  cell.style.backgroundImage = 'url(' + cell.getAttribute("data-value") + ')';
  cell.clicked = true;
}

function startTimer() {
  if (started == false) {
    interval = setInterval(function () {
      time++;
      document.getElementById("timer").innerHTML = "Time Elapsed: " + time;
    }, 1000);
    started = true;
  }
}

function resetClickedArray() {
  for (var i = 0; i < clickedArray.length; i++) {
    var cell = clickedArray[i];
    // Restablecer el fondo a su estado original
    cell.style.backgroundColor = " rgba(255, 0, 0, 0.685);"; // O el color de fondo que deseas
    cell.style.backgroundImage = 'none'; // Ocultar la imagen
    cell.clicked = false;
  }
  clickedArray = [];
  canClick = true;
}

function setUp() {
  var grid = document.getElementsByTagName("td");
  var answers = randomAnswers();

  for (var i = 0; i < grid.length; i++) {
    var cell = grid[i];

    cell.completed = false;
    cell.clicked = false;
    cell.setAttribute("data-value", answers[i]);

    
    cell.addEventListener('click', function () {
      if (ready == false || !canClick)
        return;

      startTimer();
      if (this.clicked == false && this.completed == false) {
        clickedArray.push(this);
        reveal(this);
      }

      if (clickedArray.length == 2) {
        canClick = false;
        if (clickedArray[0].getAttribute("data-value") == clickedArray[1].getAttribute("data-value")) {
          complete(clickedArray[0]);
          complete(clickedArray[1]);

          clickedArray = [];
          canClick = true;

         
        } else {
          setTimeout(resetClickedArray, 1000); // Restablece después de 2 segundos
        }
      }
    });
  }

  document.getElementById("reset").addEventListener('click', function () {
    history.go(0);
  });
}

function startTimer() {
  if (started === false) {
    interval = setInterval(function () {
      time++;
      document.getElementById("timer").innerHTML = "Tiempo transcurrido: " + time + " segundos";
    }, 1000);
    started = true;
  }
}