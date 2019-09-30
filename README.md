# Sass Windmill

Provides a `windmill()` [Sass](https://sass-lang.com/) mixin, help to define utility classes like `.mb-10px` flexibly and simply.

  - [Install](#install)
  - [Usage](#usage)
      - [Selector](#selector)
      - [Breakpoints](#breakpoints)
      - [Generate styles](#generate-styles)
      - [Generate styles (with value-variable)](#generate-styles-with-value-variable)
      - [Generate styles (mixed with value-variable)](#generate-styles-mixed-with-value-variable)
      - [Other arguments](#other-arguments)
        - [Remove](#remove)
        - [Disable](#disable)
  - [License](#license)

Basic example:

```scss
@import 'windmill';

$wm-breakpoints: (
    all: 0,
    sm: 576px,
    md: 768px,
    lg: 992px,
    xl: 1200px
);

$your-project-spaces: (
    1: 0.25rem,
    2: 0.5rem,
    3: 0.75rem
);

.SCR-mb-VAL {
    @include windmill(
        $declarations: (
            margin-bottom: '$any-string$'
        ),
        $values: (
            '$any-string$': $your-project-spaces
        )
    );
}
```

Compiles to:

```css
.mb-1 {
  margin-bottom: 0.25rem;
}
.mb-2 {
  margin-bottom: 0.5rem;
}
.mb-3 {
  margin-bottom: 0.75rem;
}

@media (min-width: 576px) {
  .sm-mb-1 {
    margin-bottom: 0.25rem;
  }
  .sm-mb-2 {
    margin-bottom: 0.5rem;
  }
  .sm-mb-3 {
    margin-bottom: 0.75rem;
  }
}

@media (min-width: 768px) {
  .md-mb-1 {
    margin-bottom: 0.25rem;
  }
  .md-mb-2 {
    margin-bottom: 0.5rem;
  }
  .md-mb-3 {
    margin-bottom: 0.75rem;
  }
}

@media (min-width: 992px) {
  .lg-mb-1 {
    margin-bottom: 0.25rem;
  }
  .lg-mb-2 {
    margin-bottom: 0.5rem;
  }
  .lg-mb-3 {
    margin-bottom: 0.75rem;
  }
}

@media (min-width: 1200px) {
  .xl-mb-1 {
    margin-bottom: 0.25rem;
  }
  .xl-mb-2 {
    margin-bottom: 0.5rem;
  }
  .xl-mb-3 {
    margin-bottom: 0.75rem;
  }
}
```

## Install

```
npm i sass-windmill
```

or

[Download sass-windmill](https://github.com/RikuOta/sass-windmill/archive/master.zip) into your Sass project.  
The target is 3 files.

```text
sass-windmill/
    ├── _windmill.scss
    ├── _windmill-utils.scss
    └── _windmill-lib.scss
```

## Usage

1. Import the partial in your Sass files and override default settings with your own preferences.

    ```scss
    @import 'windmill';
    
    // A map of (breakpoint-name: minimum screen width),
    // order from small to large.
    $wm-breakpoints: (
        all: 0px, // Output outside @media block.
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
    // number of strings that delete together from selector.
    //
    // Example:
    // Selector: .foo-SCR-bar
    // If 0: .foo--bar
    // If 1: .foo-bar
    // If 2: .foo-ar
    // If -2: .fo-bar
    $wm-min-breakpoint-addition: 1;
    ```

1. Call with `windmill()` (see below).

### Selector

Use with selector or take `$selector` argument.

```scss
// Use with selector.
.your-selector {
    @include windmill() { }
}

// Take $selector argument.
@include windmill(
    $selector: '.your-selector'
) { }
```

### Breakpoints

- Set `$wm-breakpoints` global variable or take `$breakpoints` argument.  
- Key name of breakpoints replace the "SCR" string in selector.  
("SCR" === `$wm-breakpoint-placeholder`).
- If breakpoint < 1, output styles to outside @media block.

 ```scss
$wm-breakpoints: (
    all: 0px,
    sm: 576px,
    md: 768px,
    lg: 992px,
    xl: 1200px
);

.SCR-your-selector {
    @include windmill() { }
}
```

Compiles to:

 ```css
.your-selector { }

@media (min-width: 576px) {
  .sm-your-selector { }
}

@media (min-width: 768px) {
  .md-your-selector { }
}

@media (min-width: 992px) {
  .lg-your-selector { }
}

@media (min-width: 1200px) {
  .xl-your-selector { }
}
```

- `windmill()` uses the mobile first breakpoint system.  
If you make responsive design, use smaller breakpoint as base and overwrite it with larger breakpoint.

```html
<!-- .your-selector takes effect on all screens. -->
<!-- .md-your-selector takes effect on more than medium screens. -->
<!-- .xl-your-selector takes effect on more than extra large screens. -->
<div class="your-selector md-your-selector xl-your-selector"></div>
```

### Generate styles

Define declarations with @content block or `$declarations` argument.

 ```scss
$wm-breakpoints: (
    all: 0,
    sm: 576px,
    md: 768px,
    lg: 992px,
    xl: 1200px
);

// Use @content block.
.SCR-your-selector {
    @include windmill() {
        font-size: 1rem;
    }
}

// Take $declarations argument.
.SCR-your-selector {
    @include windmill(
        $declarations: (font-size: 1rem)
    );
}
```

Compiles to:

```css
.your-selector {
  font-size: 1rem;
}

@media (min-width: 576px) {
  .sm-your-selector {
    font-size: 1rem;
  }
}

@media (min-width: 768px) {
  .md-your-selector {
    font-size: 1rem;
  }
}

@media (min-width: 992px) {
  .lg-your-selector {
    font-size: 1rem;
  }
}

@media (min-width: 1200px) {
  .xl-your-selector {
    font-size: 1rem;
  }
}
```

### Generate styles (with value-variable)

- `$declarations` argument accepts value-variable of `$variable$`.  
If you use value-variable, define `$values` argument together as below.  
- Key name of map in `$values` argument replace the "VAL" string in selector.  
("VAL" === `$wm-value-placeholder`).

```scss
$wm-breakpoints: (
    all: 0px,
    sm: 576px,
    md: 768px,
    lg: 992px,
    xl: 1200px
);

.SCR-your-selector-VAL {
    @include windmill(
        $declarations: (
            margin-bottom: '$any-string$' // Match.
        ),
        $values: (
            '$any-string$': ( // Match.
                1: 0.25rem,
                2: 0.5rem,
                3: 0.75rem
            )
        )
    );
}
```

Compiles to:

```css
.your-selector-1 {
  margin-bottom: 0.25rem;
}
.your-selector-2 {
  margin-bottom: 0.5rem;
}
.your-selector-3 {
  margin-bottom: 0.75rem;
}

@media (min-width: 576px) {
  .sm-your-selector-1 {
    margin-bottom: 0.25rem;
  }
  .sm-your-selector-2 {
    margin-bottom: 0.5rem;
  }
  .sm-your-selector-3 {
    margin-bottom: 0.75rem;
  }
}

@media (min-width: 768px) {
  .md-your-selector-1 {
    margin-bottom: 0.25rem;
  }
  .md-your-selector-2 {
    margin-bottom: 0.5rem;
  }
  .md-your-selector-3 {
    margin-bottom: 0.75rem;
  }
}

@media (min-width: 992px) {
  .lg-your-selector-1 {
    margin-bottom: 0.25rem;
  }
  .lg-your-selector-2 {
    margin-bottom: 0.5rem;
  }
  .lg-your-selector-3 {
    margin-bottom: 0.75rem;
  }
}

@media (min-width: 1200px) {
  .xl-your-selector-1 {
    margin-bottom: 0.25rem;
  }
  .xl-your-selector-2 {
    margin-bottom: 0.5rem;
  }
  .xl-your-selector-3 {
    margin-bottom: 0.75rem;
  }
}
```

### Generate styles (mixed with value-variable)

- If declarations that has value-variable and not has value-variable are mixed, `windmill()` output declarations that has not value-variable as grouping selector.

```scss
$wm-breakpoints: (
    all: 0,
    sm: 576px,
    md: 768px,
    lg: 992px,
    xl: 1200px
);

$your-project-columns: (
    4: 33.3%,
    8: 66.6%,
    12: 100%
);

.SCR-col-VAL {
    @include windmill(
        $declarations: (
            flex: 0 0 '$width$',
            max-width: '$width$'
        ),
        $values: (
            '$width$': $your-project-columns
        )
    ) {
        word-wrap: break-word;
        min-width: 0;
    }
}
```

Compiles to:

```css
.col-4, .col-8, .col-12 { /* Group */
  word-wrap: break-word;
  min-width: 0;
}
.col-4 {
  flex: 0 0 33.3%;
  max-width: 33.3%;
}
.col-8 {
  flex: 0 0 66.6%;
  max-width: 66.6%;
}
.col-12 {
  flex: 0 0 100%;
  max-width: 100%;
}

@media (min-width: 576px) {
  .sm-col-4, .sm-col-8, .sm-col-12 { /* Group */
    word-wrap: break-word;
    min-width: 0;
  }
  .sm-col-4 {
    flex: 0 0 33.3%;
    max-width: 33.3%;
  }
  .sm-col-8 {
    flex: 0 0 66.6%;
    max-width: 66.6%;
  }
  .sm-col-12 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

@media (min-width: 768px) {
  .md-col-4, .md-col-8, .md-col-12 { /* Group */
    word-wrap: break-word;
    min-width: 0;
  }
  .md-col-4 {
    flex: 0 0 33.3%;
    max-width: 33.3%;
  }
  .md-col-8 {
    flex: 0 0 66.6%;
    max-width: 66.6%;
  }
  .md-col-12 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

@media (min-width: 992px) {
  .lg-col-4, .lg-col-8, .lg-col-12 { /* Group */
    word-wrap: break-word;
    min-width: 0;
  }
  .lg-col-4 {
    flex: 0 0 33.3%;
    max-width: 33.3%;
  }
  .lg-col-8 {
    flex: 0 0 66.6%;
    max-width: 66.6%;
  }
  .lg-col-12 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

@media (min-width: 1200px) {
  .xl-col-4, .xl-col-8, .xl-col-12 { /* Group */
    word-wrap: break-word;
    min-width: 0;
  }
  .xl-col-4 {
    flex: 0 0 33.3%;
    max-width: 33.3%;
  }
  .xl-col-8 {
    flex: 0 0 66.6%;
    max-width: 66.6%;
  }
  .xl-col-12 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
```

### Other arguments

#### Remove
You can remove specific value-name in `$values` argument.

```scss
$wm-breakpoints: (
    all: 0px,
    sm: 576px,
    md: 768px,
    lg: 992px,
    xl: 1200px
);

.SCR-your-selector-VAL {
    @include windmill(
        $declarations: (
            width: '$width$',
            height: '$height$'
        ),
        $values: (
            '$width$': (
                1: 1rem,
                2: 2rem,
                3: 3rem
            ),
            '$height$': (
                1: 10px,
                2: 20px,
                3: 30px
            )
        ),
        $remove: (1, 3)
    );
}
```

Compiles to:

```css
.your-selector-2 {
  width: 2rem;
  height: 20px;
}

@media (min-width: 576px) {
  .sm-your-selector-2 {
    width: 2rem;
    height: 20px;
  }
}

@media (min-width: 768px) {
  .md-your-selector-2 {
    width: 2rem;
    height: 20px;
  }
}

@media (min-width: 992px) {
  .lg-your-selector-2 {
    width: 2rem;
    height: 20px;
  }
}

@media (min-width: 1200px) {
  .xl-your-selector-2 {
    width: 2rem;
    height: 20px;
  }
}
```

#### Disable

If true, output no styles.

```scss
$wm-breakpoints: (
    all: 0,
    sm: 576px,
    md: 768px,
    lg: 992px,
    xl: 1200px
);

.SCR-your-selector {
    @include windmill(
        $disable: true
    ) { }
}
```

```css
/* Output nothing */
```

## License

This software is released under the MIT License, see [LICENSE](https://github.com/RikuOta/sass-windmill/blob/master/LICENSE).
