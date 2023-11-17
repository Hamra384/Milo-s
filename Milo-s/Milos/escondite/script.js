function findObject() {
    var hiddenObject = document.getElementById("hiddenObject");

    // Generate random position
    var topPosition = Math.floor(Math.random() * window.innerHeight);
    var leftPosition = Math.floor(Math.random() * window.innerWidth);

    // Set the new position
    hiddenObject.style.top = topPosition + "px";
    hiddenObject.style.left = leftPosition + "px";

    // Display the hidden object
    hiddenObject.style.display = "block";
}
