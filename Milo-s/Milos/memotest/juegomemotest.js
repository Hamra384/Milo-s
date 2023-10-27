var interval;
var started = false;
var clickedArray = [];
var time = 0;
var ready = true;
var numCompleted = 0;
var canClick = true;

// Image paths (sin cambios)
var imagePaths = [
  "../Imagenes/pibe.png",
  "../Imagenes/pibe.png",
  "../Imagenes/piba.png",
  "../Imagenes/piba.png",
  "../Imagenes/señorarulos.png",
  "../Imagenes/señorarulos.png",
  "../Imagenes/señordelmemotest.png",
  "../Imagenes/señordelmemotest.png",
];

// Run functions under here:
setUp();

// Function definitions go under here:

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
  cell.innerHTML = "";
  cell.clicked = false;
}

function complete(cell) {
  numCompleted++;
  cell.completed = true;
  cell.style.backgroundColor = "purple";
}

function reveal(cell) {
  cell.style.backgroundColor = "red";
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
    hide(clickedArray[i]);
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

    cell.addEventListener("mouseenter", function () {
      if (this.completed == false && this.clicked == false)
        this.style.background = "orange";
    });

    cell.addEventListener("mouseleave", function () {
      if (this.completed == false && this.clicked == false)
        this.style.background = "grey";
    });

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

          if (numCompleted == 8) {
            alert("Ganaste en " + time + " segundos.");
            clearInterval(interval);
          }
        } else {
          setTimeout(resetClickedArray, 2000); // Restablece después de 2 segundos
        }
      }
    });
  }

  document.getElementById("reset").addEventListener('click', function () {
    history.go(0);
  });
}
