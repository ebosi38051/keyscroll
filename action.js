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
    var inputTags = document.getElementsByTagName("input");
    if (inputTags) {
      inputTags = Array.prototype.filter.call(inputTags, function(a) {
        return a.type === "text";
      });
      inputTags[0].focus();
    }
  },

  focusNext: function() {
    var aTags = objectToArray(document.getElementsByTagName("a"));
    var active = document.activeElement;
    if (active.tagName === "A") {
      var index = aTags.indexOf(active);
      aTags[index].style.outline = "none";
      aTags[index+1].style.outline = "2px aqua solid";
      aTags[index+1].focus();
      console.log(aTags[index-1]);
    }
  },

  focusPrev: function() {
    var aTags = objectToArray(document.getElementsByTagName("a"));
    var active = document.activeElement;
    if (active.tagName === "A") {
      var index = aTags.indexOf(active);
      aTags[index].style.outline = "none";
      aTags[index-1].style.outline = "2px aqua solid";
      aTags[index-1].focus();
      console.log(aTags[index-1]);
    }
  },

  focusOn: function(basis) {
    var active = document.activeElement;
    if (active.tagName === "BODY" || active.tagName === "A") {
      var aTags = objectToArray(document.getElementsByTagName("a"));
      var aTag = aTags.reduce(function(a, b) {
        var distA = distance(a, basis);
        var distB = distance(b, basis);
        if (distA > distB) {
          return b;
        } else {
          return a;
        }
      });
      active.style.outline = "none";
      aTag.style.outline = "2px aqua solid";
      aTag.focus();
    }
  },

  blur: function() {
    var active = document.activeElement;
    active.style.outline = "none";
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
