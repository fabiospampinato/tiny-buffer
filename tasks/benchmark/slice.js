import TinyBuffer from '../index.js'
import util from './util.js'

var suite = util.suite()

var LENGTH = 160

var tinyBuffer = new TinyBuffer(LENGTH)
var typedarray = new Uint8Array(LENGTH)
var nodeBuffer = Buffer.alloc(LENGTH)

suite
  .add('TinyBuffer#slice', function () {
    var x = tinyBuffer.slice(4)
  })
  .add('Uint8Array#subarray', function () {
    var x = typedarray.subarray(4)
  })

if (!process.browser) suite
  .add('NodeBuffer#slice', function () {
    var x = nodeBuffer.slice(4)
  })
