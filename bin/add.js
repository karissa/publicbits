var path = require('path')
var download = require('../lib/download.js')
var config = require('../lib/config.js')
var usage = require('../lib/usage.js')('add.txt')

module.exports = {
  name: 'add',
  command: handleAdd,
  options: [
    {
      name: 'type',
      boolean: false,
      default: 'http'
    },
    {
      name: 'format',
      boolean: false
    }
  ]
}

function handleAdd (args) {
  var location = args._[0]
  var name = args._[1] || normalize(args._[0])

  var sources = config.read(args).sources

  if (sources[name]) return console.error('Source exists.')

  var source = {
    name: name,
    path: name,
    location: location,
    format: args.format,
    type: args.type
  }

  download(source, function (err) {
    if (err) throw err
    success()
  })

  function success () {
    sources.addSource(source, args)
  }
}

function normalize (source) {
  return source.replace('\/','_').replace(/[^a-z_+A-Z0-9]/ig, '')
}
