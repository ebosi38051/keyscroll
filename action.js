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

  focusInput: function() {
    var active = document.activeElement;
    if (active.tagName !== "BODY") {
      return;
    }
    var inputTags = objectToArray(document.querySelectorAll("input"));
    if (inputTags) {
      inputTags = inputTags.filter(function(a) {
        return a.type === "text";
      });
      inputTags[0].focus();
    }
  },

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
      var aTag = aTags.reduce(function(a, b) {
        var distA = distance(a, basis);
        var distB = distance(b, basis);
        if (distA > distB) {
          return b;
        } else {
          return a;
        }
      });
      aTag.focus();
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
