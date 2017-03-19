<h1>Responsively crop copy, restore onclick</h1>


Responsively crop content copy down to a user-defined number of lines.
Click to restore content via a typed animation.

Vanilla JavaScript running at 60fps.
I believe <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> 2 level AA accessible but unconfirmed.
Super small script: 1K approx minified &amp; gzipped.

<strong>CodePen demo: <a href="http://codepen.io/2kool2/pen/dNPqKj?editors=1000">Responsively crop copy, restore onclick</a></strong>



<br>
<h2>Basic usage</h2>

Include a link to the script:

```html
<script src="js/cropCopyRestore.1.0.min.js"></script>
```

Add data attribute to the content block(s):

```html
<div class=txt data-cropCopyRestore=3>Content copy to trim&hellip;</div>
```

Attribute value equals the number of lines to display.

<br>
<h2>Required CSS:</h2>

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
<h2>Status</h2>

Considered too jarring visually.
Project to be redeveloped with smooth text expansion.


<hr>
Mike Foskett @ <a href="https://websemantics.uk/">webSemantics</a>
