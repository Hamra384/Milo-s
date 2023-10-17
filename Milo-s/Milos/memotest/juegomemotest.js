var interval;
var started = false;
var clickedArray = [];
var time = 0;
var ready = true;
var numCompleted = 0;

// Image paths
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
  var answers = imagePaths.concat(imagePaths);
  answers.sort(function () {
    return 0.5 - Math.random();
  });
  return answers;
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
  cell.style.backgroundImage = 'url(' + cell.value + ')';
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

function setUp() {
  var grid = document.getElementsByTagName("td");
  var answers = randomAnswers();

  for (var i = 0; i < grid.length; i++) {
    var cell = grid[i];

    cell.completed = false;
    cell.clicked = false;
    cell.value = answers[i];

    cell.addEventListener("mouseenter", function () {
      if (this.completed == false && this.clicked == false)
        this.style.background = "orange";
    });

    cell.addEventListener("mouseleave", function () {
      if (this.completed == false && this.clicked == false)
        this.style.background = "grey";
    });

    cell.addEventListener('click', function () {
      if (ready == false)
        return;
      startTimer();
      if (this.clicked == false && this.completed == false) {
        clickedArray.push(this);
        reveal(this);
      }

      if (clickedArray.length == 2) {
        if (clickedArray[0].value == clickedArray[1].value) {
          // If a matching pair is found
          complete(clickedArray[0]);
          complete(clickedArray[1]);

          clickedArray = [];

          if (numCompleted == 8) {
            alert("You won in " + time + " seconds!");
            clearInterval(interval);
          }
        } else {
          // If a matching pair is not found
          ready = false;
          document.getElementById("gridTable").style.border = "5px solid red";

          setTimeout(function () {
            // After a 500ms delay
            hide(clickedArray[0]);
            hide(clickedArray[1]);

            clickedArray = [];

            ready = true;
            document.getElementById("gridTable").style.border = "5px solid black";
          }, 500);
        }
      }
    });
  }
}

document.getElementById("reset").addEventListener('click', function () {
  // window.location.reload();
  history.go(0);
});
