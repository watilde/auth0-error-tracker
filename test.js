const https = require('https')
const url = process.argv[2]
const parseError = require('parse-error')

process.on('uncaughtException', function(e) {
  const data = parseError(e)
  const param = '?error=' + JSON.stringify(data)
  https.get(url + param, (res) => {
    console.log('done')
  })
})

nonExistentFunc()
