const sassTrue = require('sass-true')

sassTrue.runSass(
  {file: 'test/windmill.scss'},
  {describe, it}
)
