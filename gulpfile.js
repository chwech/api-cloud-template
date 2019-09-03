const { watch } = require('gulp')
const { exec } = require('child_process')
const port = 10915
function defaultTask(cb) {
  const start = `apicloud wifiStart --port ${port}`
  exec(start, function(err, stdout, stderr) {
    if (err) {
      cb(err)
    } else {
      console.log(stdout, stderr)
      cb(stdout)
    }
  })
}

function wifiSync (cb) {
  const wifiSync = `apicloud wifiSync --project ./ --updateAll false --port ${port}`
  exec(wifiSync, function(err, stdout, stderr) {
    if (err) {
      console.log(err)
      cb()
    } else {
      console.log(stdout, stderr)
      cb()
    }
  })
}

watch('*.html', wifiSync)
exports.wifiSync = wifiSync
exports.default = defaultTask
