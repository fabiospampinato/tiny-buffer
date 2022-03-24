var TinyBuffer = require('../').Buffer // (this module)
var util = require('./util')
var suite = util.suite()

var LENGTH = 160
var tinyBuffer = new TinyBuffer(LENGTH)
var tinyBuffer2 = new TinyBuffer(LENGTH)
var typedarray = new Uint8Array(LENGTH)
var typedarray2 = new Uint8Array(LENGTH)
var nodeBuffer = Buffer.alloc(LENGTH)
var nodeBuffer2 = Buffer.alloc(LENGTH)

;[tinyBuffer, tinyBuffer2, typedarray, typedarray2, nodeBuffer, nodeBuffer2].forEach(function (buf) {
  for (var i = 0; i < LENGTH; i++) {
    buf[i] = i + 97
  }
})

suite
  .add('TinyBuffer#concat', function () {
    var x = TinyBuffer.concat([tinyBuffer, tinyBuffer2], LENGTH * 2)
  })
  .add('Uint8Array#concat', function () {
    var x = new Uint8Array(LENGTH * 2)
    x.set(typedarray, 0)
    x.set(typedarray2, typedarray.length)
  })

if (!process.browser) suite
  .add('NodeBuffer#concat', function () {
    var x = Buffer.concat([nodeBuffer, nodeBuffer2], LENGTH * 2)
  })
