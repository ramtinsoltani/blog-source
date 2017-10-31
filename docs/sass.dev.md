# SASS Developer Documentation

This documentation is meant to be read by developers as a cheat sheet for all the defined variables, functions, and mixins.

# Workflow Rule

All partial files except `common` should only be imported in `common`, and any other SCSS file can import `common` which includes all the other partial files and external dependencies at once.

# Variables

The following is a list of all variables categorized by usage purpose.

## URLs

| Name | Description |
|------|-------------|
| url-author-avatar | The url of the author's avatar |

## Colors

| Name | Description |
|------|-------------|
| color-green | The green accent color |
| color-black | The shade of black used for text or backgrounds |
| color-gray | Used for black hover color and some text |
| color-light-gray | Used for light texts |
| color-light | The lightest color to use on non-white backgrounds |
| color-gradient-green | The gradient green-blue color used for headers and backgrounds (full opacity) |
| color-button-gray | Used on white buttons hover |
| color-search-bar | The color of the search bar's background |

## Fonts

| Name | Description |
|------|-------------|
| font-family | The font family used for all text |
| font-size-sub | Very small text |
| font-size-button | For button text |
| font-size-text | For regular text |
| font-size-title | For titles that are not meant to attract too much attention |
| font-size-header | The largest text, mostly header |
| font-size-project-zoom-out | The description text of a project on homepage when zoomed out |
| font-size-project-zoom-in | The description text of a project on homepage when zoomed in |
| font-size-project-title | The size of the project title (also used for posts on homepage) |

## Shadows

| Name | Description |
|------|-------------|
| shadow-light | Light box-shadow |
| shadow-rough | Rough box-shadow |

## Default Values

| Name | Value | Description | Shorthand |
|------|-------|-------------|-----------|
| default-transition-time | .5s | The default time for all transitions | _ttime |
| default-transition-type | ease | The default type for all transitions | _ttype |
| default-gradient-degree | 90deg | The default degree for all gradients | _gdeg |
| default-flex-direction | row | The default flex direction | _fdir |
| default-flex-alignment | center | The default value of align-items | _falign |
| default-flex-justify | center | The default value of justify-content | _fjust |

# Mixins and Functions

The following is a list of all mixins and functions (mixins and functions that begin with `__` are not mentioned since they are private helpers for the public mixins/functions).

| Name | Signature | Description |
|------|-----------|-------------|
| color-gradient-green-transparent | function(opacity, deg: optional) | Calculates a linear gradient of green-blue with the given opacity and degrees (default _gdeg) |
| flex | mixin(dir: optional, align: optional, just: optional) | Defines a flexbox with the given direction (default row), align-items (default center), and justify-content (default center) |
| transition | mixin(time: optional, type: optional, properties: rest) | Defines transition for all the given properties with the given time (default _ttime) and type (default _ttype) |
| _transition | mixin(properties: rest) | Defines transition for all the given properties using the default time and type. |
| gradient-text | mixin(color: optional) | Makes text gradient with the given color (default color-gradient-green) |
| fix | mixin(index) | Makes element fixed with the given z-index |
| horizontal-padding | mixin(left, right: optional) | Defines padding on the left and right of the element. If the right parameter is not given, the value for the left will be used on both sides |
| vertical-padding | mixin(top, bottom: optional) | Defines padding on the top and bottom of the element. If the bottom parameter is not given, the value for the top will be used on both sides |
| horizontal-margin | mixin(left, right: optional) | Defines margin on the left and right of the element. If the right parameter is not given, the value for the left will be used on both sides |
| vertical-margin | mixin(top, bottom: optional) | Defines margin on the top and bottom of the element. If the bottom parameter is not given, the value for the top will be used on both sides |
| square | mixin(size) | Sets the given value for both height and width of the element |

## Media Queries

The following is a list of all mixins for media queries.

| Name | Signature | Description |
|------|-----------|-------------|
| media-ie10 | mixin{content} | Runs the content on IE 10+ only |
