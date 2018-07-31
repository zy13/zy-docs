const glob = require('glob')

glob('./docs/classify/**/*.md', function(er, files){
  console.log(er)
  console.log(files)
})


console.log(glob)
