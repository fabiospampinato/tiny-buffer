import TinyBuffer from '../index.js'
import util from './util.js'

var suite = util.suite()

var LENGTH = 9
var singleByte = 'abcdefghi'
var multiByte = '\u0610' + '\u6100' + '\uD944\uDC00'

var tinyBuffer = new TinyBuffer(LENGTH)
var nodeBuffer = Buffer.alloc(LENGTH)

suite
  .add('TinyBuffer#singleByte', function () {
    tinyBuffer.write(singleByte)
  })
  .add('TinyBuffer#multiByte', function () {
    tinyBuffer.write(multiByte)
  })

if (!process.browser) suite
  .add('NodeBuffer#singleByte', function () {
    nodeBuffer.write(singleByte)
  })
  .add('NodeBuffer#multiByte', function () {
    nodeBuffer.write(multiByte)
  })
