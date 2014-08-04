document.onkeydown = function() {
  var escape = 27
  var active = document.activeElement;
  console.log(active.tagName);
  if (active.tagName === "BODY") {
    pageMove();
  }
  if (event.keyCode === escape) {
    active.blur();
  }
}

var move = 100;

function pageMove() {
  console.log(String.fromCharCode(event.keyCode));
  switch (String.fromCharCode(event.keyCode)) {
    case "J":
      window.scrollBy(0, move);
      break;
    case "K":
      window.scrollBy(0, -move);
      break;
    case "H":
      history.back();
      break;
    case "L":
      history.forward();
      break;
  }
}
