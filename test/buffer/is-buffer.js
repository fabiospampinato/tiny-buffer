import B from '../index.js'
import isBuffer from 'is-buffer'
import test from 'tape'

test('is-buffer tests', function (t) {
  t.ok(isBuffer(new B(4)), 'new Buffer(4)')

  t.notOk(isBuffer(undefined), 'undefined')
  t.notOk(isBuffer(null), 'null')
  t.notOk(isBuffer(''), 'empty string')
  t.notOk(isBuffer(true), 'true')
  t.notOk(isBuffer(false), 'false')
  t.notOk(isBuffer(0), '0')
  t.notOk(isBuffer(1), '1')
  t.notOk(isBuffer(1.0), '1.0')
  t.notOk(isBuffer('string'), 'string')
  t.notOk(isBuffer({}), '{}')
  t.notOk(isBuffer(function foo () {}), 'function foo () {}')

  t.end()
})
