#Responsively crop copy, restore onclick


Responsively crop content copy down to a user-defined number of lines.
Click to restore content via a typed animation.

Vanilla JavaScript running at 60fps.
I believe <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> 2 level AA accessible but unconfirmed.
Super small script: 1K approx minified &amp; gzipped.

<strong>CodePen demo: <a href="http://codepen.io/2kool2/pen/dNPqKj?editors=1000">Responsively crop copy, restore onclick</a></strong>



<br>
##How it works

TBC.


<br>
##Basic usage

Include a link to the script:

```html
<script src="js/cropCopyRestore.1.0.min.js"></script>
```

Add data attributes to the content block(s):

```html
<div class=txt data-cropCopyRestore=3>Content copy to trim&hellip;</div>
```

Data attribute value equals number of lines to display.


<br>
Required CSS:

``` css
[data-cropCopyRestore][role="button"]:focus {
  outline: 0 dotted #fff;
  box-shadow: 0 0 0 4px rgba(255, 255, 255, .5);
}
[data-cropCopyRestore][role="button"]:hover {
  box-shadow: 0 0 0 4px rgba(255, 255, 255, .5);
  cursor: pointer;
}
.-clone {
  visibility: hidden;
  opacity: 0;
  z-index: -1;
}
```

<br>
##Status

Considered too jarring visually.
Project to be redeveloped with smooth text expansion.


<hr>
Mike Foskett @ <a href="https://websemantics.uk/">webSemantics</a>
