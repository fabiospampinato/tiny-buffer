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
    buf.writeUInt32LE(7000 + i, i * 4)
  }
})

for (var i = 0; i < LENGTH; i++) {
  dataview.setUint32(i * 4, 7000 + i)
}

suite
  .add('TinyBuffer#readUInt32LE', function () {
    for (var i = 0; i < LENGTH; i++) {
      var x = tinyBuffer.readUInt32LE(i * 4)
    }
  })
  .add('DataView#getUint32', function () {
    for (var i = 0; i < LENGTH; i++) {
      var x = dataview.getUint32(i * 4, true)
    }
  })

if (!process.browser) suite
  .add('NodeBuffer#readUInt32LE', function () {
    for (var i = 0; i < LENGTH; i++) {
      var x = nodeBuffer.readUInt32LE(i * 4)
    }
  })
