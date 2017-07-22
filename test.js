const parseError = require('parse-error')

process.on('uncaughtException', function(e) {
  const data = parseError(e)
  const json = JSON.stringify(data)
})

nonExistentFunc()
