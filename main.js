document.onkeydown = function() {
  if(location.host !== "www.google.co.jp") keyAction();
}

function keyAction() {
  var key = getKeyNamefromCharCode(event.keyCode);
  if (!config.keyAction[key]) return;
  var method = config.keyAction[key].method || config.keyAction[key];
  var args = config.keyAction[key].args || [];
  var action = actionBuilder();
  if (action[method]) {
    action[method](args);
  }
}

function getKeyNamefromCharCode(keyCode) {
  console.log(keyCode)
  if (event.keyCode >= 48) {
    return String.fromCharCode(keyCode);
  } else {
    switch (keyCode) {
      case 27:
        return "ESC"
      case 17:
        return "CTRL"
    }
  }
  return "";
}

function init() {
  var separateKeys = config.separation;
  for (var i = 0; i < separateKeys.length; i++) {
    for (var j = 0; j < separateKeys[i].length; j++) {
      var key = separateKeys[i][j];
      config.keyAction[key] = {
        method: "focusOn",
        args: separatePoint(i,j)
      }
    }
  }
}

function separatePoint(i, j) {
  var xSeparateMax = config.separation[0].length - 1;
  var ySeparateMax = config.separation.length - 1;
  var width = document.documentElement.clientWidth;
  var height = document.documentElement.clientHeight;
  var x = width / xSeparateMax * j;
  var y = height / ySeparateMax * i;
  return {"x": x,"y": y};
}

init();
