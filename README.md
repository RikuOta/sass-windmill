# Sass Windmill [![Build Status](https://travis-ci.org/RikuOta/sass-windmill.svg?branch=master)](https://travis-ci.org/RikuOta/sass-windmill) <img alt="MIT licensed" src="https://img.shields.io/github/license/RikuOta/sass-windmill?color=blue">

A [Sass](https://sass-lang.com/) mixin that helps you define utility classes like `.mb-10px` flexibly and quickly.

Basic example:

```scss
@import 'windmill';

$wm-breakpoints: (
    all: 0,
    sm:  576px,
    md:  768px
);

$spaces: (
    1: 1rem,
    2: 2rem,
    3: 3rem
);

.BR-mb-VAL {
    @include windmill(margin-bottom, $spaces);
}
```

Compiles to:

```css
.mb-1 {
  margin-bottom: 1rem;
}
.mb-2 {
  margin-bottom: 2rem;
}
.mb-3 {
  margin-bottom: 3rem;
}

@media (min-width: 576px) {
  .sm-mb-1 {
    margin-bottom: 1rem;
  }
  .sm-mb-2 {
    margin-bottom: 2rem;
  }
  .sm-mb-3 {
    margin-bottom: 3rem;
  }
}

@media (min-width: 768px) {
  .md-mb-1 {
    margin-bottom: 1rem;
  }
  .md-mb-2 {
    margin-bottom: 2rem;
  }
  .md-mb-3 {
    margin-bottom: 3rem;
  }
}
```

## Table of Contents

- [Try immediately](#try-immediately)
- [Usage](#usage)
- [Customize](#customize)
- [Arguments](#arguments)
- [Changelog](#changelog)
- [License](#license)

## Try immediately

[You can try immediately on CodePen.](https://codepen.io/RikuOta/pen/qBWzpwW)

## Usage

Install with [npm](https://www.npmjs.com/):

```
npm i sass-windmill
```

or [download sass-windmill from the repository](https://github.com/RikuOta/sass-windmill) into your Sass project.  
The target is 3 files:

```text
sass-windmill/
    ├── _windmill.scss
    ├── _windmill-utils.scss
    └── _windmill-lib.scss
```

Import the partial in your Sass files and call `windmill()` with the selector:

```scss
@import 'windmill';

.foo {
    @include windmill() { ... }
}
```

`windmill()` has 2 functions.  
1\. Outputs styles to each breakpoints:

```scss
$wm-breakpoints: (
    all: 0,
    sm:  576px,
    md:  768px
);

.BR-foo {
    @include windmill() {
        margin: 0;
    }
}
```

Compiles to:

```css
.foo {
  margin: 0;
}

@media (min-width: 576px) {
  .sm-foo {
    margin: 0;
  }
}

@media (min-width: 768px) {
  .md-foo {
    margin: 0;
  }
}
```

`windmill()` replaces the `BR` string with a breakpoint name, outputs styles to each breakpoints.

2\. Outputs multiple values:

```scss
.foo-VAL {
    @include windmill(
        margin,
        (1: 1rem, 2: 2rem, 3: 3rem)
    );
}
```

Compiles to:

```css
.foo-1 {
  margin: 1rem;
}
.foo-2 {
  margin: 2rem;
}
.foo-3 {
  margin: 3rem;
}
```

`windmill()` replaces the `VAL` string with a value name, outputs multiple values.

If use 2 functions together:

```scss
$wm-breakpoints: (
    all: 0,
    sm:  576px,
    md:  768px
);

.BR-foo-VAL {
    @include windmill(
        margin,
        (1: 1rem, 2: 2rem, 3: 3rem)
    )
}
```

Compiles to:

```css
.foo-1 {
  margin: 1rem;
}
.foo-2 {
  margin: 2rem;
}
.foo-3 {
  margin: 3rem;
}

@media (min-width: 576px) {
  .sm-foo-1 {
    margin: 1rem;
  }
  .sm-foo-2 {
    margin: 2rem;
  }
  .sm-foo-3 {
    margin: 3rem;
  }
}

@media (min-width: 768px) {
  .md-foo-1 {
    margin: 1rem;
  }
  .md-foo-2 {
    margin: 2rem;
  }
  .md-foo-3 {
    margin: 3rem;
  }
}
```

### Case 1/4: Output multiple properties

```scss
.foo-VAL {
    @include windmill(
        margin padding,
        (1: 1rem, 2: 2rem, 3: 3rem)
    )
}
```

Compiles to:

```css
.foo-1 {
  margin: 1rem;
  padding: 1rem;
}
.foo-2 {
  margin: 2rem;
  padding: 2rem;
}
.foo-3 {
  margin: 3rem;
  padding: 3rem;
}
```

### Case 2/4: Add Important Flag to the result of output

```scss
.foo-VAL {
    @include windmill(
        margin!important,
        (1: 1rem, 2: 2rem, 3: 3rem)
    )
}

// If there are multiple properties:

.foo-VAL {
    @include windmill(
        margin!important padding!important,
        (1: 1rem, 2: 2rem, 3: 3rem)
    )
}
```

### Case 3/4: Output complex values

```scss
.foo-VAL {
    @include windmill(
        (margin: 0 [any-name]),
        (any-name: (1: 1rem, 2: 2rem, 3: 3rem))
    )
}
```

Compiles to:

```css
.foo-1 {
  margin: 0 1rem;
}
.foo-2 {
  margin: 0 2rem;
}
.foo-3 {
  margin: 0 3rem;
}
```

### Case 4/4: Output complex values and normal values together

```scss
.foo-VAL {
    @include windmill(
        (
            margin: 0 [any-name], // complex value
            width: 10rem // normal value
        ), 
        (
            any-name: (1: 1rem, 2: 2rem, 3: 3rem)
        )
    ) {
        height: 10rem // normal value
    }
}
```

Compiles to:

```css
.foo-1, .foo-2, .foo-3 {
  width: 10rem;
  height: 10rem;
}
.foo-1 {
  margin: 0 1rem;
}
.foo-2 {
  margin: 0 2rem;
}
.foo-3 {
  margin: 0 3rem;
}
```

## Customize

You can override global variables and change the default settings with your own settings after `@import 'windmill'`:

```scss
@import 'windmill';

$wm-breakpoints: (all: 0px, sm: 576px, md: 768px, lg: 992px, xl: 1200px);
$wm-breakpoint-placeholder: BR;
...
```

Default settings (global variables):

|Variable|Type|Default|Description|
|:---|:---|:---|:---|
|$wm-breakpoints|`map`|`(all: 0px, sm: 576px, md: 768px, lg: 992px, xl: 1200px)`|A map of `(name: minimum width)`.|
|$wm-breakpoint-placeholder|`string`|`BR`|The string you include in the selector. Is replaced with the breakpoint name.|
|$wm-value-placeholder|`string`|`VAL`|The string you include in the selector. Is replaced with the value name.|
|$wm-min-breakpoint-prefix|`boolean`|`false`|If you want to add a breakpoint name to the selector on the minimum screen width, set true.|
|$wm-min-breakpoint-addition|`number`|`1`|When `$wm-min-breakpoint-prefix` is false, the number of strings to be removed from the selector together.|

## Arguments

`windmill()` accepts the following arguments:

```scss
@include windmill(
    $content, $vars, $remove, $selector, $breakpoints, $disable
);
```

|Argument|Type|Default|Description|
|:---|:---|:---|:---|
|$content|`string` `list` `map`|`null`|string: `property-name`.<br>list: `(property-name, property-name, property-name, ...)`.<br>map: `(property-name: value)`.|
|$vars|`map`|`null`|1: `(value-name: value)`<br>2: `(variable-name: (value-name: value))`.|
|$remove|`list`|`null`|A list of `(value-name, value-name, value-name, ...)`, you can remove specific `value-name` from `$vars`.|
|$selector|`string`|`null`|You can use instead of calling `windmill()` with the selector.|
|$breakpoints|`map`|`$wm-breakpoints`|Instead of `$wm-breakpoints`, you can set the breakpoints that is used on only one output.|
|$disable|`boolean`|`false`|If set true, outputs no styles.|

### Examples

#### $remove

```scss
.foo-VAL {
    @include windmill(
        $content: margin,
        $vars: (
            1: 1rem, // will be removed
            2: 2rem, 
            3: 3rem  // will be removed
        ),
        $remove: 1 3
    );
}
```

## Changelog

### Since version 1.1.2

- Changed setting method of Important Frag on shorthand from (margin, true) to margin !important.

Before:

```scss
.BR-foo-VAL {
    @include windmill(
        $content: (margin, true),
        $vars: ...
    );
}
```

After:

```scss
.BR-foo-VAL {
    @include windmill(
        $content: margin !important,
        $vars: ...
    );
}
```

### Since version 1.1.0

- Changed default value of `$wm-breakpoint-placeholder` global variable from `SCR` to `BR`.
- Changed argument name from `$declarations` to `$content`.
- Changed argument name from `$values` to `$vars`.
- Changed how to set variables.

Before:

```scss
.SCR-test-VAL {
    @include windmill(
        $declarations: (margin: '$your-var-name$'),
        $values: ('$your-var-name$': ...)
    );
}
```

After:

```scss
.BR-test-VAL {
    @include windmill(
        $content: (margin: [your-var-name]),
        $vars: (your-var-name: ...)
    );
}
```

## License

This software is released under the MIT License, see [LICENSE](https://github.com/RikuOta/sass-windmill/blob/master/LICENSE).
