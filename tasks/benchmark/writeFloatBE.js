import TinyBuffer from '../index.js'
import util from './util.js'

var suite = util.suite()

var LENGTH = 160

var tinyBuffer = new TinyBuffer(LENGTH * 4)
var typedarray = new Uint8Array(LENGTH * 4)
var dataview = new DataView(typedarray.buffer)
var nodeBuffer = Buffer.alloc(LENGTH * 4)

suite
  .add('TinyBuffer#writeFloatBE', function () {
    for (var i = 0; i < LENGTH; i++) {
      tinyBuffer.writeFloatBE(97.1919 + i, i * 4)
    }
  })
  .add('DataView#setFloat32', function () {
    for (var i = 0; i < LENGTH; i++) {
      dataview.setFloat32(i * 4, 97.1919 + i)
    }
  })

if (!process.browser) suite
  .add('NodeBuffer#writeFloatBE', function () {
    for (var i = 0; i < LENGTH; i++) {
      nodeBuffer.writeFloatBE(97.1919 + i, i * 4)
    }
  })
