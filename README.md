# Sass Windmill [![Build Status](https://travis-ci.org/RikuOta/sass-windmill.svg?branch=master)](https://travis-ci.org/RikuOta/sass-windmill)

Provides a `windmill()` [Sass](https://sass-lang.com/) mixin, help to define utility classes like `.mb-10px` flexibly and simply.

- [How to get started](#how-to-get-started)
- [Usage](#usage)
  - [Breakpoints](#breakpoints)
  - [Generate styles](#generate-styles)
  - [Other arguments](#other-arguments)
    - [$remove](#remove)
    - [$disable](#disable)
    - [$selector](#selector)
- [License](#license)

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

.SCR-mb-VAL {
    @include windmill(
        $declarations: (
            margin-bottom: '$val$'
        ),
        $values: (
            '$val$': $your-project-spaces
        )
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

## How to get started

[Try it immediately on CodePen.](https://codepen.io/RikuOta/pen/qBWzpwW)

OR:

1. Install:

    ```
    npm i sass-windmill
    ```

    or [download sass-windmill](https://github.com/RikuOta/sass-windmill) into your Sass project.  
    The target is 3 files.

    ```text
    sass-windmill/
        ├── _windmill.scss
        ├── _windmill-utils.scss
        └── _windmill-lib.scss
    ```

1. Import the partial in your Sass files and override default settings with your own preferences.

    ```scss
    @import 'windmill';
    
    // A map of (breakpoint-name: minimum screen width),
    // order from small to large.
    $wm-breakpoints: (
        all: 0px,
        sm: 576px,
        md: 768px,
        lg: 992px,
        xl: 1200px
    );

    // Temporary selector name to be replaced by breakpoint-name.
    $wm-breakpoint-placeholder: SCR;

    // Temporary selector name to be replaced by value-name.
    $wm-value-placeholder: VAL;

    // If use breakpoint-prefix on minimum screen width, set true.
    //
    // Example:
    // Selector: .foo-SCR-bar
    // Breakpoints: (all: 0px, sm: 576px, md: 768px, ...)
    // If true: .foo-all-bar
    // If false: .foo--bar
    $wm-min-breakpoint-prefix: false;

    // When $wm-min-breakpoint-prefix is false,
    // number of strings that delete from selector together.
    //
    // Example:
    // Selector: .foo-SCR-bar
    // If 0: .foo--bar
    // If 1: .foo-bar
    // If 2: .foo-ar
    // If -2: .fo-bar
    $wm-min-breakpoint-addition: 1;
    ```

1. Call (see usage below).

## Usage

### Breakpoints

- Pass breakpoints to `$wm-breakpoints` global variable or `$breakpoints` argument.
- Breakpoints is a map of (breakpoint-name: minimum screen width), order from small to large.
- The breakpoint-name replace the "SCR" string in selector.  
(You can change "SCR" string by `$wm-breakpoint-placeholder` global variable).
- If breakpoint < 1, `windmill()` outputs styles to outside media block.

```scss
$wm-breakpoints: (
    all: 0,
    sm: 576px,
    md: 768px
);

.SCR-foo {
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

@media (min-width: 768px) {
  .md-foo {
    display: block;
  }
}
```

Note: `windmill()` uses the mobile first breakpoint system. If you make responsive design, use smaller breakpoint as base and overwrite it with larger breakpoint.

```html
<!-- .your-selector takes effect on all screens. -->
<!-- .sm-your-selector takes effect on more than small screens. -->
<!-- .md-your-selector takes effect on more than medium screens. -->
<div class="your-selector sm-your-selector md-your-selector"></div>
```

### Generate styles

- `$declarations` argument is a map of (property: value), value accepts value-variable of `$variable$`.
- `$values` argument is a map of (value-variable: (value-name: value)). If use value-variable in `$declarations` argument, have to specify together.
- The value-name replace the "VAL" string in selector.  
(You can change "VAL" string by `$wm-value-placeholder` global variable).

```scss
$wm-breakpoints: (
    all: 0,
    sm: 576px,
    md: 768px
);

.SCR-foo-VAL {
    @include windmill(
        $declarations: (
            margin: '$margin$',
            padding: 0 '$padding$'
        ),
        $values: (
            '$margin$': (
                1: 1rem,
                2: 2rem,
                3: 3rem
            ),
            '$padding$': (
                1: 10px,
                2: 20px,
                3: 30px
            )
        )
    );
}
```

Compiles to:

```css
.foo-1 {
  margin: 1rem;
  padding: 0 10px;
}
.foo-2 {
  margin: 2rem;
  padding: 0 20px;
}
.foo-3 {
  margin: 3rem;
  padding: 0 30px;
}

@media (min-width: 576px) {
  .sm-foo-1 {
    margin: 1rem;
    padding: 0 10px;
  }
  .sm-foo-2 {
    margin: 2rem;
    padding: 0 20px;
  }
  .sm-foo-3 {
    margin: 3rem;
    padding: 0 30px;
  }
}

@media (min-width: 768px) {
  .md-foo-1 {
    margin: 1rem;
    padding: 0 10px;
  }
  .md-foo-2 {
    margin: 2rem;
    padding: 0 20px;
  }
  .md-foo-3 {
    margin: 3rem;
    padding: 0 30px;
  }
}
```

Note: If value-variable and normal value mixed, `windmill()` outputs normal value as grouping selector.

```scss
$wm-breakpoints: (
    all: 0,
    sm: 576px,
    md: 768px
);

.SCR-foo-VAL {
    @include windmill(
        $declarations: (
            margin: '$margin$' // value-variable.
        ),
        $values: (
            '$margin$': (
                1: 1rem,
                2: 2rem,
                3: 3rem
            )
        )
    ) {
        display: block; // Normal value.
        text-align: center; // Normal value.
    }
}
```

Compiles to:

```css
.foo-1, .foo-2, .foo-3 { // Grouping.
  display: block;
  text-align: center;
}
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
  .sm-foo-1, .sm-foo-2, .sm-foo-3 { // Grouping.
    display: block;
    text-align: center;
  }
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
  .md-foo-1, .md-foo-2, .md-foo-3 { // Grouping.
    display: block;
    text-align: center;
  }
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

### Other arguments

#### $remove
You can remove specific value-name in `$values` argument.

```scss
.SCR-foo-VAL {
    @include windmill(
        $remove: (1, 3),
        $declarations: (
            margin: '$margin$',
            padding: '$padding$'
        ),
        $values: (
            '$margin$': (
                1: 1rem, // Remove.
                2: 2rem,
                3: 3rem  // Remove.
            ),
            '$padding$': (
                1: 10px, // Remove.
                2: 20px,
                3: 30px  // Remove.
            )
        )
    );
}
```

#### $disable

If `$disable` argument is true, output no styles.

#### $selector

Instead of calling with selector, you can pass selector to `$selector` argument.

```scss
@include windmill(
    $selector: '.foo'
) {
    display: block;
}
```

## License

This software is released under the MIT License, see [LICENSE](https://github.com/RikuOta/sass-windmill/blob/master/LICENSE).
