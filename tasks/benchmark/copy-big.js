import TinyBuffer from '../index.js'
import util from './util.js'

var suite = util.suite()

var LENGTH = 16000

var tinySubject = new TinyBuffer(LENGTH)
var typedarraySubject = new Uint8Array(LENGTH)
var nodeSubject = Buffer.alloc(LENGTH)

var tinyTarget = new TinyBuffer(LENGTH)
var typedarrayTarget = new Uint8Array(LENGTH)
var nodeTarget = Buffer.alloc(LENGTH)

suite
  .add('TinyBuffer#copy(' + LENGTH + ')', function () {
    tinySubject.copy(tinyTarget)
  })
  .add('Uint8Array#copy(' + LENGTH + ')', function () {
    typedarrayTarget.set(typedarraySubject, 0)
  })

if (!process.browser) suite
  .add('NodeBuffer#copy(' + LENGTH + ')', function () {
    nodeSubject.copy(nodeTarget)
  })
