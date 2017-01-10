// Crop copy responsively, to user-defined number of lines, then restore onclick - v1.0 - 08/01/2017 - M.J.Foskett - https://websemantics.uk/
var cropCopyRestore = function (window, document) {

  "use strict";

  var dataAttr = "data-cropCopyRestore";
  var buttonId = "cropCopyRestore_btn-";
  var ellipsis = "…"; // "\u2026"
  var clonedClass = "-clone";

  // https://john-dugan.com/javascript-debounce/
  var debounce=function(e,t,n){var a;return function(){var r=this,i=arguments,o=function(){a=null,n||e.apply(r,i)},s=n&&!a;clearTimeout(a),a=setTimeout(o,t||200),s&&e.apply(r,i)}};


// String cropping functions

  function _removeLastOccur(str, removeStr) {
    return str.substring(0, str.lastIndexOf(removeStr));
  }

  function _removeTrailingPunct(str) {
    return str.replace(/[ .,!?:;"“‘'\-]+$/, "");
  }

// Display and animation functions

  // https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
  function _animLoop(f,g){function b(c){if(!1!==d){window.requestAnimationFrame(b,g);var e=c-a;160>e&&(d=f(e));a=c}}var d,a=+new Date;b(a)}
  // Usage:
  //animLoop(function(deltaT) {
  //  elem.style.left = (left += 10 * deltaT / 16) + "px";
  //  if (left > 400) {
  //    return false;
  //  }
  // optional 2nd arg: elem containing the animation
  //}, animationFunction);

  function _display(obj, str) {
    obj.textContent = str;
  }

  function _displayAppend(obj, str) {
    _display(obj, obj.textContent + str);
  }

  function _displayCroppedText(obj) {
    _display(obj, obj.croppedTxt + ellipsis)
  }

  function _resetAttr(obj, bool) {
    obj.setAttribute("aria-expanded", bool);
    obj.transitioning = false;
  }

  function _addRemainerText(obj) {
    var textArr = obj.remainerTxt.split(" ");
    var i = 0;

    window.requestAnimationFrame(function() {

      // remove ellipsis
      _display(obj, obj.croppedTxt);

      _animLoop(function() {
        _displayAppend(obj, textArr[i] + " ");
        if (i >= textArr.length - 1) {
          _resetAttr(obj, true);
          return false;
        }
        i += 1;
      });
    });
  }

  function _removeRemainerText(obj) {
    var textArr = obj.remainerTxt.split(" ");
    var i = textArr.length;

    _animLoop(function() {
      i -= 1;
      _display(obj, _removeLastOccur(obj.textContent, " " + textArr[i]));
      if (i <= 0) {
        _displayCroppedText(obj);
        _resetAttr(obj, false);
        return false;
      }
    });
  }

// Set copy

  function _getRemainerText(obj) {
    return obj.fullTxt.replace(obj.croppedTxt, "");
  }

  function _createClone(obj, str) {
    // create an invisible clone (used to get an objects height)
    var clone = obj.cloneNode(true);
    clone.setAttribute("class", obj.className + " " + clonedClass);
    clone.textContent = str;
    obj.parentNode.insertBefore(clone, obj.nextSibling);
    clone.initialHeight = clone.clientHeight;
    return clone;
  }

  function _getCroppedText(obj) {
    var txtArr = obj.fullTxt.split(" ");
    var i = 0;
    var lines = 1;
    var clone = _createClone(obj, txtArr[i] + " ");

    for (i = 1; i < txtArr.length; i++) {
      _displayAppend(clone, txtArr[i] + ellipsis);
      if (clone.clientHeight !== clone.initialHeight) {

        if (lines + "" === obj.noOfLines) {
          _display(clone, _removeLastOccur(clone.textContent, txtArr[i] + ellipsis));
          break;
        }
        lines++;
        clone.initialHeight = clone.clientHeight;
      }

      // Bit of an assumption
      _display(clone, clone.textContent.replace(txtArr[i] + ellipsis, txtArr[i] + " "));

    }

    _display(clone, _removeTrailingPunct(clone.textContent));
    obj.parentNode.removeChild(clone);
    return clone.textContent;
  }

// Handle events

  function _clicked(event) {
    var obj = event.target;
    if (!obj.transitioning) {
      obj.transitioning = true;
      if (obj.getAttribute("aria-expanded") === "true") {
        _removeRemainerText(obj);
      } else {
        _addRemainerText(obj);
      }
    }
    event.preventDefault();
  }

  function _keyPressed(event) {
    // Enter or space key
    if (event.which === 13 || event.which === 32) {
      _clicked(event);
    }
  }

  function _addEvents(obj) {
    obj.addEventListener("click", _clicked, false);
    obj.addEventListener("keydown", _keyPressed, false);
  }

  function _removeEvents(obj) {
    obj.removeEventListener("click", _clicked);
    obj.removeEventListener("keydown", _keyPressed);
  }

// Initialisation

  function _initialiseAttributes(obj, i) {
    var str = obj.getAttribute(dataAttr);
    obj.noOfLines = (/^([1-9]\d*)$/.test(str)) ? str : "1"; // 1 - 9 only
    obj.fullTxt = obj.textContent;
    obj.setAttribute("id", obj.id || buttonId + i);
    obj.setAttribute("role", "button");
    obj.setAttribute("tabindex", "0");
    obj.setAttribute("aria-controls", obj.id);
  }

  function start() {

    var objs = document.querySelectorAll("[" + dataAttr + "]");
    var i = objs.length;
    var obj;

    while (i--) {

      obj = objs[i];

      // In case it's a resize call rather than initialisation
      if (obj.fullTxt) {
        _removeEvents(obj);
      } else {
        _initialiseAttributes(obj, i);
      }

      // Reset, or initialise, common attributes
      _resetAttr(obj, false);
      obj.croppedTxt = _getCroppedText(obj);
      obj.remainerTxt = _getRemainerText(obj);

      _displayCroppedText(obj);
      _addEvents(obj);
    }
  }

  start();
  window.addEventListener("resize", debounce(start, 100, false), false);

}(window, document);

window.addEventListener("load", cropCopyRestore, false);
