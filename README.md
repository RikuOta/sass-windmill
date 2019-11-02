# Sass Windmill [![Build Status](https://travis-ci.org/RikuOta/sass-windmill.svg?branch=master)](https://travis-ci.org/RikuOta/sass-windmill) <img alt="MIT licensed" src="https://img.shields.io/github/license/RikuOta/sass-windmill?color=blue">

A [Sass](https://sass-lang.com/) mixin that helps to define utility class like `.mb-10px` flexibly and simply.

Basic example:

```scss
@import 'windmill';

$wm-breakpoints: (
    all: 0,
    sm: 576px,
    md: 768px
);

$your-project-spaces: (
    1: 1rem,
    2: 2rem,
    3: 3rem
);

.BR-mb-VAL {
    @include windmill(
        $content: (margin-bottom: [val]),
        $vars: (val: $your-project-spaces)
    );
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
- [Shorthand](#shorthand)
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

Import the partial in your Sass files:

```scss
@import 'windmill';
```

Set the breakpoints that a map of (breakpoint-name: minimum screen width):

```scss
$wm-breakpoints: (
    all: 0,
    sm: 576px,
    md: 768px
);
```

Call `windmill()` with the selector that contains the `BR` string:

```scss
.BR-foo {
    @include windmill() {
        display: block;
    }
}
```

As a result, `windmill()` replaces the `BR` string with the `breakpoint-name` except for the minimum screen width, outputs styles on for each breakpoints:

```css
.foo {
  display: block;
}

@media (min-width: 576px) {
  .sm-foo {
    display: block;
  }
}

@media (min-width: 768px) {
  .md-foo {
    display: block;
  }
}
```

Instead of the content block, you can use `$content` argument:

```scss
.BR-foo {
    @include windmill(
        $content: (display: block)
    );
}
```

The value in `$content` can accepts variables of `[variable-name]`:

```scss
.BR-foo {
    @include windmill(
        $content: (display: [your-var-name])
    );
}
```

If use variables, set `$vars` argument that a map of (variable-name: (value-name: value)), and contain the `VAL` string in the selector.

```scss
.BR-foo-VAL {
    @include windmill(
        $content: (display: [your-var-name]),
        $vars: (your-var-name: (
            b: block,
            n: none,
            f: flex
        ))
    );
}
```

As a result, `windmill()` replaces the `VAL` string with the `value-name`, outputs styles of each value:

```css
.foo-b {
  display: block;
}
.foo-n {
  display: none;
}
.foo-f {
  display: flex;
}

@media (min-width: 576px) {
  .sm-foo-b {
    display: block;
  }
  .sm-foo-n {
    display: none;
  }
  .sm-foo-f {
    display: flex;
  }
}

@media (min-width: 768px) {
  .md-foo-b {
    display: block;
  }
  .md-foo-n {
    display: none;
  }
  .md-foo-f {
    display: flex;
  }
}
```

If you don't want to output with breakpoints, just remove the `BR` string from the selector:

```scss
.foo-VAL {
    @include windmill(
        $content: (display: [your-var-name]),
        $vars: (your-var-name: (
            b: block,
            n: none,
            f: flex
        ))
    );
}
```

Compiles to:

```css
.foo-b {
  display: block;
}
.foo-n {
  display: none;
}
.foo-f {
  display: flex;
}
```

Finally, if there are normal values in the content block or `$content` argument, `windmill()` will combine them together and outputs:

```scss
.foo-VAL {
    @include windmill(
        $content: (
            display: [your-var-name], 
            width: 1rem // Normal value.
        ),
        $vars: (your-var-name: (
            b: block,
            n: none,
            f: flex
        ))
    ) {
        height: 2rem    // Normal value.
    }
}
```

Compiles to:

```css
.foo-b, .foo-n, .foo-f {
  width: 1rem;
  height: 2rem;
}
.foo-b {
  display: block;
}
.foo-n {
  display: none;
}
.foo-f {
  display: flex;
}
```

## Customize

You can override global variables and change the default settings with your own settings after `@import 'windmill'`:

```
@import 'windmill';

$wm-breakpoints: (all: 0px, sm: 576px, md: 768px, lg: 992px, xl: 1200px);
$wm-breakpoint-placeholder: BR;
...
```

Default settings (global variables):

|Variable|Type|Default|Description|
|:---|:---|:---|:---|
|$wm-breakpoints|`map`|`(all: 0px, sm: 576px, md: 768px, lg: 992px, xl: 1200px)`|A map of (breakpoint-name: minimum screen width).|
|$wm-breakpoint-placeholder|`string`|`BR`|The string that you contain in selector. Will be replaced by the breakpoint-name.|
|$wm-value-placeholder|`string`|`VAL`|The string that you contain in selector. Will be replaced by the value-name.|
|$wm-min-breakpoint-prefix|`boolean`|`false`|If contain the breakpoint-name in the selector on the minimum screen width, set true.|
|$wm-min-breakpoint-addition|`number`|`1`|When $wm-min-breakpoint-prefix is false, the number of strings that delete from the selector together.|

## Arguments

|Argument|Type|Default|Description|
|:---|:---|:---|:---|
|$content|`map`|`null`|A map of (property: value).|
|$vars|`map`|`null`|A map of (variable-name: (value-name: value)).|
|$remove|`list`|`null`|A list of (value-name, value-name, value-name, ...), you can remove specific value-name from `$vars`.|
|$selector|`string`|`null`|You can use instead of calling `windmill()` with the selector.|
|$breakpoints|`map`|`$wm-breakpoints`|Instead of `$wm-breakpoints`, you can set the breakpoints that is used only for that output.|
|$disable|`boolean`|`false`|If set true, outputs no styles.|

### $remove

```scss
.BR-foo-VAL {
    @include windmill(
        $content: (display: [your-var-name]),
        $vars: (your-var-name: (
            b: block, // Will be removed.
            n: none,
            f: flex   // Will be removed.
        )),
        $remove: (b, f)
    );
}
```

### $selector

```scss
@include windmill(
    $selector: '.BR-foo'
) {
    display: block;
}
```

## Shorthand

If there is one property in `$content` and the value is only a variable, you can use shorthand.

Before:

```scss
.BR-foo-VAL {
    @include windmill(
        $content: (display: [your-var-name]),
        $vars: (your-var-name: (
            b: block,
            n: none,
            f: flex
        ))
    );
}
```

After:

```scss
.BR-foo-VAL {
    @include windmill(
        $content: display,
        $vars: (
            b: block,
            n: none,
            f: flex
        )
    );
}
```

If omit the argument name:

```scss
.BR-foo-VAL {
    @include windmill(display, (
        b: block,
        n: none,
        f: flex
    ));
}
```

If add Important flag to the result of output:

```scss
.BR-foo-VAL {
    @include windmill((display, true), (
        b: block,
        n: none,
        f: flex
    ));
}
```

## Changelog

### Since version 1.1.0

- Changed default value of `$wm-breakpoint-placeholder` global variable from `SCR` to `BR`.
- Changed argument name from `$declarations` to `$content`.
- Changed argument name from `$values` to `$vars`.
- Changed how to set variables.

Before:

```
.SCR-test-VAL {
    @include windmill(
        $declarations: (margin: '$your-var-name$'),
        $values: ('$your-var-name$': ...)
    );
}
```

After:

```
.BR-test-VAL {
    @include windmill(
        $content: (margin: [your-var-name]),
        $vars: (your-var-name: ...)
    );
}
```

## License

This software is released under the MIT License, see [LICENSE](https://github.com/RikuOta/sass-windmill/blob/master/LICENSE).
