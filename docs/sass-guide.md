# SASS (Synthetically Awesome Style Sheets)

Sass lets you use features that don't exist in CSS yet like variables, nesting, mixins, inheritance and other nifty goodies that make writing CSS fun again.

# Prerequisites

Ruby and Gem package manager ([Ruby installer](https://rubyinstaller.org/) for windows).

# Installation

`gem install sass`

Test:  
`sass -v`

# Preprocessing

Single file:  
`sass input.scss output.css`

Watch whole directory:  
`sass --watch app/sass:dist/css`

# Using SASS

Create `.scss` files and use the SASS syntax highlighted below:

## Variables

Define:  
`$color-black: #000;`

Use:  
`background-color: $color-black`

## Nesting

Use:
```scss
nav {

  ul {

    color: black;

  }

}

ul {

  > li {

    font-size: 24px;

  }

}
```

Output:
```css
nav ul {

  color: black;

}

ul > li {

  font-size: 24px;

}
```

## Nested Media Queries

Use:
```scss
header.main {

  width: 100%;
  height: 500px;

  @media screen and (orientation: landscape) {

    height: 300px;

  }

}
```

Output:
```css
header.main {

  width: 100%;
  height: 500px;

}

@media screen and (orientation: landscape) {

  header.main {

    height: 300px;

  }

}
```

## Imports and Partial Files

Use `_` at the beginning of a file name to indicate that the file is a partial file. Partial files
won't be processed as individual files.

Create:  
`_partial.scss`  
`module.scss`

Use:  
```scss
@import 'partial'; // Partial file
@import 'module';  // Non-partial file
```

## Mixins

Define:
```scss
@mixin border-radius($value) {

  -webkit-border-radius: $value;
     -moz-border-radius: $value;
      -ms-border-radius: $value;
          border-radius: $value;

}
```

Use:  
```scss
div.circle {

  @include border-radius(50%);

}
```

## Functions

Functions are like mixins but they only return a value instead.

Define:
```scss
@function background-color-black-transparent($opacity) {

  @return rgba(0, 0, 0, $opacity);

}
```

Use:
```scss
div {

  background: background-color-black-transparent(.5);

}
```

Output:
```css
  div {

    background: rgba(0,0,0,0.5);

  }
```

## Conditional Statements

Syntax:  
```scss
@if condition { statements }
@else if condition { statements }
@else { statements }
```

## String Interpolation

Syntax:  
`#{$variable}`

Example:
```scss
@mixin padding($value, $direction) {

  @if $direction == null {

    padding: $value;

  }
  @else {

    padding-#{$direction}: $value;

  }

}

p.left {

  @include padding(5px, left);

}

p.all {

  @include padding(5px, null);

}
```

Output:
```css
p.left {

  padding-left: 5px;

}

p.all {

  padding: 5px;

}
```

## Advanced Mixin Parameters

### Optional Parameters

Use:
```scss
@mixin background($color, $image:'', $repeat:'no-repeat') {

  // Signature: mixin(required, optional, optional with default value)

  background: $color #{$image} #{$repeat};
  background: $color unquote($image) unquote($repeat); // SASS 3+ only

}

div.black {

  @include background(black);

}

div.red {

  @include background(red, url('./image.jpg'), repeat);

}

div.blue {

  @include background(blue, null, repeat);

}
```

Output:
```css
div.black {

  background: black no-repeat;

}

div.red {

  background: red url('./image.jpg') repeat;

}

div.blue {

  background: blue repeat;

}
```

### Rest Operator

Use:
```scss
@mixin background($args...) {

  background: $args;

}

div.black {

  @include background(black no-repeat);

}
```

Output:
```css
div.black {

  background: black no-repeat;

}
```

### Named Parameters

Parameters can be passed to mixins and functions in any order when using named parameters.

Use:
```scss
@function rgba-ex($red, $green, $blue, $opacity) {

  @return rgba($red, $green, $blue, $opacity);

}

div {

  background: rgba-ex($green: 24, $opacity: .5, $blue: 12, $red: 129);

}
```

Output:
```css
div {

  background: rgba(129, 24, 12, 0.5);

}
```

### Content Directive

Using `@content` with SASS 3.2+ allows passing a content block to a mixin.

Example:
```scss
@mixin ie6-only {

  * html { @content }

}

@include ie6-only {

  #logo {

    background-color: red;

  }

}
```

Output:
```css
* html #logo {

  background-color: red;

}
```

Example (media queries):
```scss
@mixin media($width) {

  @media only screen and (max-width: $width) {

    @content;

  }

}

@include media(320px) {

  background: red;

}
```

Output:
```css
@media only screen and (max-width: 320px) {

  background: red;

}
```

## Inheritance

Use:
```scss
button.red {

  background-color: red;
  font-size: 30px;

}

span.red-button {

  @extend button.red;
  padding: 10px;

}
```

Output:  
```css
button.red,
span.red-button {

  background-color: red;
  font-size: 30px;

}

span.red-button {

  padding: 10px;

}
```

## The Ampersand

The `&` always returns the current selector. It could be very handy if used wisely.

Example (without the ampersand):
```scss
.button:hover   { color: red; }
.button:active  { color: blue; }
.button:visited { color: magenta; }
```

Example (with the ampersand):
```scss
.button {

  &:hover   { color: red; }
  &:active  { color: blue; }
  &:visited { color: magenta; }

}
```

Output of both:
```css
.button:hover   { color: red; }
.button:active  { color: blue; }
.button:visited { color: magenta; }
```

## Math Operators

The `+`, `-`, `*`, `/`, `%` operators are available for all units.

Example:
```scss
div {

  padding: (50px * 2) - 10px;

}
```

Output:
```css
div {

  padding: 90px;

}
```

## More from SASS

Example (for loop):
```scss
@mixin colorSet {

  // Defining a list
  $colors: red, blue, green, yellow, magenta, cyan, white, black, gray, maroon;

  // Using a for loop to iterate through the list
  @for $index from 1 through length($colors) {

    // Using & to get caller's selector
    // in conjunction with string interpolation of the index
    &.button-#{$index} {

      // Getting an element from the list
      color: nth($colors, $index);

    }

  }

}

div { @include colorSet }
```

Example (for each loop):
```scss
@mixin colorSet {

  // Defining a list
  $colors: red, blue, green, yellow, magenta, cyan, white, black, gray, maroon;

  // Index counter
  $index: 0;

  // Using a for each loop to iterate through the list
  @each $color in $colors {

    // Increment the index
    $index: $index + 1;

    // Using & to get caller's selector
    // in conjunction with string interpolation of the index
    &.button-#{$index} { // Or &.button-#{index($colors, $color)}

      color: $color;

    }

  }

}

div { @include colorSet }
```

Output:
```css
div.button-1 { color: red; }
div.button-2 { color: blue; }
div.button-3 { color: green; }
div.button-4 { color: yellow; }
div.button-5 { color: magenta; }
div.button-6 { color: cyan; }
div.button-7 { color: white; }
div.button-8 { color: black; }
div.button-9 { color: gray; }
div.button-10 { color: maroon; }
```
