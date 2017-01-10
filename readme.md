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

#To do

Add an SVG definition for the open / close icons:

```html
<svg style="display:none">
  <defs>
    <symbol viewBox="0 0 34 34" id="icon-plus">
      <path d="M25 17.2l-14 7v-14l14 7z"></path>
    </symbol>
    <symbol viewBox="0 0 34 34" id="icon-minus">
      <path d="M20 11h2v12h-2V11zm-8 0h2v12h-2V11z"></path>
    </symbol>
  </defs>
</svg>
```

<br>
##Browser support

In cross-browser testing. Accessibility testing to follow.


<hr>
Mike Foskett @ <a href="https://websemantics.uk/">webSemantics</a>
