const { exec } = require('child_process')
const config = require('./config')
const url = config.url.replace('<user>', config.user).replace('<password>', config.password)
var cmd = `wt create --secret MONGO_URL=${url} error-tracker.js`

exec(cmd, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`)
    return
  }
  console.log(`stdout: ${stdout}`)
  console.log(`stderr: ${stderr}`)
})
