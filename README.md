# Sass Windmill [![Build Status](https://travis-ci.org/RikuOta/sass-windmill.svg?branch=master)](https://travis-ci.org/RikuOta/sass-windmill) <img alt="MIT licensed" src="https://img.shields.io/github/license/RikuOta/sass-windmill?color=blue">

A [Sass](https://sass-lang.com/) mixin that helps you define utility classes such as `.mb-10px` flexibly and quickly.

Example:

```scss
@import 'windmill';

$wm-breakpoints: (
  all: 0,
  sm: 576px
);

$grid-columns: (
  4: 33%,
  8: 66%,
  12: 100% 
);

.BR-col-VAL {
  @include windmill((
    flex: 0 0 $grid-columns,
    max-width: $grid-columns
  )) {
    min-width: 0;
    word-break: break-word;
  }
}
```

Compiles to:

```css
.col-4, .col-8, .col-12 {
  min-width: 0;
  word-break: break-word;
}
.col-4 {
  flex: 0 0 33%;
  max-width: 33%;
}
.col-8 {
  flex: 0 0 66%;
  max-width: 66%;
}
.col-12 {
  flex: 0 0 100%;
  max-width: 100%;
}

@media (min-width: 576px) {
  .sm-col-4, .sm-col-8, .sm-col-12 {
    min-width: 0;
    word-break: break-word;
  }
  .sm-col-4 {
    flex: 0 0 33%;
    max-width: 33%;
  }
  .sm-col-8 {
    flex: 0 0 66%;
    max-width: 66%;
  }
  .sm-col-12 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
```

## Table of Contents

- [How to get started](#how-to-get-started)
- [Usage](#usage)
- [Parameters](#parameters)
- [Running tests](#running-tests)
- [License](#license)

## How to get started

[Immediately play with it on CodePen.](https://codepen.io/RikuOta/pen/qBWzpwW)

OR:

1. Install:

    * with [npm](https://www.npmjs.com/): `npm i sass-windmill`
    * with [yarn](https://yarnpkg.com/): `yarn add sass-windmill`

1. Import the partial in your Sass files:

    ```scss
    @import 'node_modules/sass-windmill/sass/windmill';
    ```

1. Override default settings with your own preferences.  
    Default settings:

    ```scss
    // A map of (name: screen width),
    // if screen width <= 0, outputs CSS rules outside @media blocks
    $wm-breakpoints: (
      all: 0,
      sm: 576px,
      md: 768px,
      lg: 992px,
      xl: 1200px
    ) !default;

    // Placeholder to include in the selector,
    // replaced by the breakpoint name
    $wm-breakpoint-placeholder: 'BR' !default;

    // Placeholder to include in the selector,
    // replaced by the value name
    $wm-val-placeholder: 'VAL' !default;

    // For minimum screen width, the number of strings to be removed
    // from the selector with `$wm-breakpoint-placeholder`
    //  0: .foo-BR-bar => .foo--bar
    //  1: .foo-BR-bar => .foo-bar
    // -1: .foo-BR-bar => .foo-bar
    $wm-min-breakpoint-addition: 1 !default;

    // If you want output error messages in CSS files
    // instead of the terminal, set `true`
    $wm-error-to-css: false !default;

    // If you want to display error messages in the your site
    // instead of the terminal, set `true`
    $wm-show-error: false !default;
    ```

1. Call `windmill()` (see below)

## Usage

`$wm-breakpoints` is a map of (name: screen width).  
If you set the breakpoints, `windmill` replaces `BR` placeholder in the selector with key names and outputs CSS rules to each breakpoints:

```scss
$wm-breakpoints: (
  all: 0,
  sm: 576px
);

.BR-foo {
  @include windmill() {
    display: block;
  }
}
```

Compiles to:

```css
.foo {
  display: block;
}

@media (min-width: 576px) {
  .sm-foo {
    display: block;
  }
}
```

If you want to change Media Query mixin:

```scss
@mixin wm-override-mq($from) {
  @include your-mq($from) {
    @content;
  }
}
```

`$style` parameter of `windmill($style, $selector, $breakpoints)` is general CSS declarations block. The only difference is that the value accepts `map` such as `margin: (1: 10px, 2: 20px)`.  
If `map` is included, `windmill()` replaces `VAL` placeholder in the selector with key names, embeds the value in `$style`, and outputs CSS rules:

```scss
.foo-VAL {
  @include windmill((
    margin: 0 (1: 10px, 2: 20px) auto
  ));
}
```

Compiles to:

```css
.foo-1 {
  margin: 0 10px auto;
}
.foo-2 {
  margin: 0 20px auto;
}
```

## Parameters

`windmill()` takes up 3 parameters:

1. `$style`: general CSS declarations block

1. `$selector`: the selector to use instead of `.foo { @include ... }`

    ```scss
    @include windmill($selector: '.BR-foo') {
      display: block;
    }
    ```

1. `$breakpoints`: the breakpoints to use instead of `$wm-breakpoints`

    ```scss
    $wm-breakpoints: (
      all: 0,
      sm: 576px
    );

    .BR-foo {
      @include windmill($breakpoints: (
        all: 0, 
        sm: 600px
      )) {
        display: block;
      }
    }
    ```

    Compiles to:

    ```css
    .foo {
      display: block;
    }

    @media (min-width: 600px) {
      .sm-foo {
        display: block;
      }
    }
    ```

## Running tests

```sh
npm test
```

## License

This software is released under the MIT License, see [LICENSE](https://github.com/RikuOta/sass-windmill/blob/master/LICENSE).
