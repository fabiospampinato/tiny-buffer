import TinyBuffer from '../index.js'
import util from './util.js'

var suite = util.suite()

var LENGTH = 50
var tinyBuffer = new TinyBuffer(LENGTH)
var typedarray = new Uint8Array(LENGTH)
var nodeBuffer = Buffer.alloc(LENGTH)

suite
  .add('TinyBuffer#bracket-notation', function () {
    for (var i = 0; i < LENGTH; i++) {
      tinyBuffer[i] = i + 97
    }
  })
  .add('Uint8Array#bracket-notation', function () {
    for (var i = 0; i < LENGTH; i++) {
      typedarray[i] = i + 97
    }
  })

if (!process.browser) suite
  .add('NodeBuffer#bracket-notation', function () {
    for (var i = 0; i < LENGTH; i++) {
      nodeBuffer[i] = i + 97
    }
  })
