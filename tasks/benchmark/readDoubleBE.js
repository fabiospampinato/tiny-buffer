var TinyBuffer = require('../').Buffer // (this module)
var util = require('./util')
var suite = util.suite()

var LENGTH = 160

var tinyBuffer = new TinyBuffer(LENGTH * 8)
var typedarray = new Uint8Array(LENGTH * 8)
var dataview = new DataView(typedarray.buffer)
var nodeBuffer = Buffer.alloc(LENGTH * 8)

;[tinyBuffer, nodeBuffer].forEach(function (buf) {
  for (var i = 0; i < LENGTH; i++) {
    buf.writeDoubleBE(97.1919 + i, i * 8)
  }
})

for (var i = 0; i < LENGTH; i++) {
  dataview.setFloat64(i * 8, 97.1919 + i)
}

suite
  .add('TinyBuffer#readDoubleBE', function () {
    for (var i = 0; i < LENGTH; i++) {
      var x = tinyBuffer.readDoubleBE(i * 8)
    }
  })
  .add('DataView#getFloat64', function () {
    for (var i = 0; i < LENGTH; i++) {
      var x = dataview.getFloat64(i * 8)
    }
  })

if (!process.browser) suite
  .add('NodeBuffer#readDoubleBE', function () {
    for (var i = 0; i < LENGTH; i++) {
      var x = nodeBuffer.readDoubleBE(i * 8)
    }
  })
