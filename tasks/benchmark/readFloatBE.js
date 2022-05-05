import TinyBuffer from '../index.js'
import util from './util.js'

var suite = util.suite()

var LENGTH = 160

var tinyBuffer = new TinyBuffer(LENGTH * 4)
var typedarray = new Uint8Array(LENGTH * 4)
var dataview = new DataView(typedarray.buffer)
var nodeBuffer = Buffer.alloc(LENGTH * 4)

;[tinyBuffer, nodeBuffer].forEach(function (buf) {
  for (var i = 0; i < LENGTH; i++) {
    buf.writeFloatBE(97.1919 + i, i * 4)
  }
})

for (var i = 0; i < LENGTH; i++) {
  dataview.setFloat32(i * 4, 97.1919 + i)
}

suite
  .add('TinyBuffer#readFloatBE', function () {
    for (var i = 0; i < LENGTH; i++) {
      var x = tinyBuffer.readFloatBE(i * 4)
    }
  })
  .add('DataView#getFloat32', function () {
    for (var i = 0; i < LENGTH; i++) {
      var x = dataview.getFloat32(i * 4)
    }
  })

if (!process.browser) suite
  .add('NodeBuffer#readFloatBE', function () {
    for (var i = 0; i < LENGTH; i++) {
      var x = nodeBuffer.readFloatBE(i * 4)
    }
  })
