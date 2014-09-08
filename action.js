var actionBuilder = function() {
  return action;
};

var action = {
  pageDown: function() {
    this.pageMove(0, config.hMove);
    this.focusNext();
  },

  pageUp: function() {
    this.pageMove(0, -config.hMove);
    this.focusPrev();
  },

  pageLeft: function() {
    this.pageMove(-config.vMove, 0);
  },

  pageRight: function() {
    this.pageMove(config.vMove, 0);
  },

  pageMove: function(x, y) {
    var active = document.activeElement;
    if (active.tagName === "BODY") {
      window.scrollBy(x, y);
    }
  },

  focusInput: (function() {
    var index = 0;
    return function() {
      var inputTags = document.querySelectorAll("input");
      inputTags = textBoxes(inputTags);
      if (inputTags) {
        inputTags[index].focus();
        index++;
        if (index >= inputTags.length) {
          index = 0;
        }
      }
    }
  })(),

  focusNext: function() {
    var aTags = objectToArray(document.querySelectorAll("a"));
    var active = document.activeElement;
    if (active.tagName === "A") {
      var index = aTags.indexOf(active);
      aTags[index+1].focus();
    }
  },

  focusPrev: function() {
    var aTags = objectToArray(document.querySelectorAll("a"));
    var active = document.activeElement;
    if (active.tagName === "A") {
      var index = aTags.indexOf(active);
      aTags[index-1].focus();
    }
  },

  focusOn: function(basis) {
    var active = document.activeElement;
    if (active.tagName === "BODY" || active.tagName === "A") {
      var aTags = objectToArray(document.querySelectorAll("a"));
      aTags.sort(function(a, b) {
        var distA = distance(a, basis);
        var distB = distance(b, basis);
        return distA-distB;
      })[0].focus();
    }
  },

  blur: function() {
    var active = document.activeElement;
    active.blur();
  }
};

function distance(element, basis) {
  var bounds = element.getBoundingClientRect();
  var x = bounds.left;
  var y = bounds.top;
  return (x - basis.x) * (x - basis.x) + (y - basis.y) * (y - basis.y);
}

function objectToArray(object) {
  var array = [];
  for (var i = 0, len = object.length; i < len; i++) {
    array[i] = object[i];
  }
  return array;
}

function textBoxes(inputTags) {
  var ret = [];
  for (var i = 0; i < inputTags.length; i++) {
    if (inputTags[i].type === "text") {
      ret.push(inputTags[i]);
    }
  }
  return ret;
}
