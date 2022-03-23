const B = require('../').Buffer
const test = require('tape')

test('utf8 buffer to base64', function (t) {
  t.equal(
    new B('Ձאab', 'utf8').toString('base64'),
    '1YHXkGFi'
  )
  t.end()
})

test('utf8 buffer to hex', function (t) {
  t.equal(
    new B('Ձאab', 'utf8').toString('hex'),
    'd581d7906162'
  )
  t.end()
})

test('utf8 to utf8', function (t) {
  t.equal(
    new B('öäüõÖÄÜÕ', 'utf8').toString('utf8'),
    'öäüõÖÄÜÕ'
  )
  t.end()
})

// test('utf16le to utf16', function (t) {
//   t.equal(
//     new B(new B('abcd', 'utf8').toString('utf16le'), 'utf16le').toString('utf8'),
//     'abcd'
//   )
//   t.end()
// })

// test('utf16le to utf16 with odd byte length input', function (t) {
//   t.equal(
//     new B(new B('abcde', 'utf8').toString('utf16le'), 'utf16le').toString('utf8'),
//     'abcd'
//   )
//   t.end()
// })

// test('utf16le to hex', function (t) {
//   t.equal(
//     new B('abcd', 'utf16le').toString('hex'),
//     '6100620063006400'
//   )
//   t.end()
// })

test('ascii buffer to base64', function (t) {
  t.equal(
    new B('123456!@#$%^', 'ascii').toString('base64'),
    'MTIzNDU2IUAjJCVe'
  )
  t.end()
})

test('ascii buffer to hex', function (t) {
  t.equal(
    new B('123456!@#$%^', 'ascii').toString('hex'),
    '31323334353621402324255e'
  )
  t.end()
})

test('base64 buffer to utf8', function (t) {
  t.equal(
    new B('1YHXkGFi', 'base64').toString('utf8'),
    'Ձאab'
  )
  t.end()
})

test('hex buffer to utf8', function (t) {
  t.equal(
    new B('d581d7906162', 'hex').toString('utf8'),
    'Ձאab'
  )
  t.end()
})

test('base64 buffer to ascii', function (t) {
  t.equal(
    new B('MTIzNDU2IUAjJCVe', 'base64').toString('ascii'),
    '123456!@#$%^'
  )
  t.end()
})

test('hex buffer to ascii', function (t) {
  t.equal(
    new B('31323334353621402324255e', 'hex').toString('ascii'),
    '123456!@#$%^'
  )
  t.end()
})

test('base64 buffer to binary', function (t) {
  t.equal(
    new B('MTIzNDU2IUAjJCVe', 'base64').toString('binary'),
    '123456!@#$%^'
  )
  t.end()
})

test('hex buffer to binary', function (t) {
  t.equal(
    new B('31323334353621402324255e', 'hex').toString('binary'),
    '123456!@#$%^'
  )
  t.end()
})

test('utf8 to binary', function (t) {
  /* jshint -W100 */
  t.equal(
    new B('öäüõÖÄÜÕ', 'utf8').toString('binary'),
    'Ã¶Ã¤Ã¼ÃµÃÃÃÃ'
  )
  /* jshint +W100 */
  t.end()
})

test('utf8 replacement chars (1 byte sequence)', function (t) {
  t.equal(
    new B([0x80]).toString(),
    '\uFFFD'
  )
  t.equal(
    new B([0x7F]).toString(),
    '\u007F'
  )
  t.end()
})

test('utf8 replacement chars (2 byte sequences)', function (t) {
  t.equal(
    new B([0xC7]).toString(),
    '\uFFFD'
  )
  t.equal(
    new B([0xC7, 0xB1]).toString(),
    '\u01F1'
  )
  t.equal(
    new B([0xC0, 0xB1]).toString(),
    '\uFFFD\uFFFD'
  )
  t.equal(
    new B([0xC1, 0xB1]).toString(),
    '\uFFFD\uFFFD'
  )
  t.end()
})

test('utf8 replacement chars (3 byte sequences)', function (t) {
  t.equal(
    new B([0xE0]).toString(),
    '\uFFFD'
  )
  t.equal(
    new B([0xE0, 0xAC]).toString(),
    '\uFFFD'
  )
  t.equal(
    new B([0xE0, 0xAC, 0xB9]).toString(),
    '\u0B39'
  )
  t.end()
})

test('utf8 replacement chars (4 byte sequences)', function (t) {
  t.equal(
    new B([0xF4]).toString(),
    '\uFFFD'
  )
  t.equal(
    new B([0xF4, 0x8F]).toString(),
    '\uFFFD'
  )
  t.equal(
    new B([0xF4, 0x8F, 0x80]).toString(),
    '\uFFFD'
  )
  t.equal(
    new B([0xF4, 0x8F, 0x80, 0x84]).toString(),
    '\uDBFC\uDC04'
  )
  t.equal(
    new B([0xFF]).toString(),
    '\uFFFD'
  )
  t.equal(
    new B([0xFF, 0x8F, 0x80, 0x84]).toString(),
    '\uFFFD\uFFFD\uFFFD\uFFFD'
  )
  t.end()
})

test('utf8 replacement chars on 256 random bytes', function (t) {
  t.equal(
    new B([152, 130, 206, 23, 243, 238, 197, 44, 27, 86, 208, 36, 163, 184, 164, 21, 94, 242, 178, 46, 25, 26, 253, 178, 72, 147, 207, 112, 236, 68, 179, 190, 29, 83, 239, 147, 125, 55, 143, 19, 157, 68, 157, 58, 212, 224, 150, 39, 128, 24, 94, 225, 120, 121, 75, 192, 112, 19, 184, 142, 203, 36, 43, 85, 26, 147, 227, 139, 242, 186, 57, 78, 11, 102, 136, 117, 180, 210, 241, 92, 3, 215, 54, 167, 249, 1, 44, 225, 146, 86, 2, 42, 68, 21, 47, 238, 204, 153, 216, 252, 183, 66, 222, 255, 15, 202, 16, 51, 134, 1, 17, 19, 209, 76, 238, 38, 76, 19, 7, 103, 249, 5, 107, 137, 64, 62, 170, 57, 16, 85, 179, 193, 97, 86, 166, 196, 36, 148, 138, 193, 210, 69, 187, 38, 242, 97, 195, 219, 252, 244, 38, 1, 197, 18, 31, 246, 53, 47, 134, 52, 105, 72, 43, 239, 128, 203, 73, 93, 199, 75, 222, 220, 166, 34, 63, 236, 11, 212, 76, 243, 171, 110, 78, 39, 205, 204, 6, 177, 233, 212, 243, 0, 33, 41, 122, 118, 92, 252, 0, 157, 108, 120, 70, 137, 100, 223, 243, 171, 232, 66, 126, 111, 142, 33, 3, 39, 117, 27, 107, 54, 1, 217, 227, 132, 13, 166, 3, 73, 53, 127, 225, 236, 134, 219, 98, 214, 125, 148, 24, 64, 142, 111, 231, 194, 42, 150, 185, 10, 182, 163, 244, 19, 4, 59, 135, 16]).toString(),
    new TextDecoder ().decode ( Uint8Array.from ( [239, 191, 189, 239, 191, 189, 239, 191, 189, 23, 239, 191, 189, 239, 191, 189, 239, 191, 189, 44, 27, 86, 239, 191, 189, 36, 239, 191, 189, 239, 191, 189, 239, 191, 189, 21, 94, 239, 191, 189, 46, 25, 26, 239, 191, 189, 239, 191, 189, 72, 239, 191, 189, 239, 191, 189, 112, 239, 191, 189, 68, 239, 191, 189, 239, 191, 189, 29, 83, 239, 191, 189, 125, 55, 239, 191, 189, 19, 239, 191, 189, 68, 239, 191, 189, 58, 239, 191, 189, 239, 191, 189, 239, 191, 189, 39, 239, 191, 189, 24, 94, 239, 191, 189, 120, 121, 75, 239, 191, 189, 112, 19, 239, 191, 189, 239, 191, 189, 239, 191, 189, 36, 43, 85, 26, 239, 191, 189, 239, 191, 189, 239, 191, 189, 57, 78, 11, 102, 239, 191, 189, 117, 239, 191, 189, 239, 191, 189, 239, 191, 189, 92, 3, 239, 191, 189, 54, 239, 191, 189, 239, 191, 189, 1, 44, 239, 191, 189, 86, 2, 42, 68, 21, 47, 239, 191, 189, 204, 153, 239, 191, 189, 239, 191, 189, 239, 191, 189, 66, 239, 191, 189, 239, 191, 189, 15, 239, 191, 189, 16, 51, 239, 191, 189, 1, 17, 19, 239, 191, 189, 76, 239, 191, 189, 38, 76, 19, 7, 103, 239, 191, 189, 5, 107, 239, 191, 189, 64, 62, 239, 191, 189, 57, 16, 85, 239, 191, 189, 239, 191, 189, 97, 86, 239, 191, 189, 239, 191, 189, 36, 239, 191, 189, 239, 191, 189, 239, 191, 189, 239, 191, 189, 69, 239, 191, 189, 38, 239, 191, 189, 97, 239, 191, 189, 239, 191, 189, 239, 191, 189, 239, 191, 189, 38, 1, 239, 191, 189, 18, 31, 239, 191, 189, 53, 47, 239, 191, 189, 52, 105, 72, 43, 239, 191, 189, 239, 191, 189, 73, 93, 239, 191, 189, 75, 239, 191, 189, 220, 166, 34, 63, 239, 191, 189, 11, 239, 191, 189, 76, 239, 191, 189, 110, 78, 39, 239, 191, 189, 239, 191, 189, 6, 239, 191, 189, 239, 191, 189, 239, 191, 189, 239, 191, 189, 0, 33, 41, 122, 118, 92, 239, 191, 189, 0, 239, 191, 189, 108, 120, 70, 239, 191, 189, 100, 239, 191, 189, 239, 191, 189, 239, 191, 189, 66, 126, 111, 239, 191, 189, 33, 3, 39, 117, 27, 107, 54, 1, 239, 191, 189, 239, 191, 189, 13, 239, 191, 189, 3, 73, 53, 127, 239, 191, 189, 239, 191, 189, 239, 191, 189, 98, 239, 191, 189, 125, 239, 191, 189, 24, 64, 239, 191, 189, 111, 239, 191, 189, 239, 191, 189, 42, 239, 191, 189, 239, 191, 189, 10, 239, 191, 189, 239, 191, 189, 239, 191, 189, 19, 4, 59, 239, 191, 189, 16] ) )
  )
  t.end()
})

test('utf8 replacement chars for anything in the surrogate pair range', function (t) {
  t.equal(
    new B([0xED, 0x9F, 0xBF]).toString(),
    '\uD7FF'
  )
  t.equal(
    new B([0xED, 0xA0, 0x80]).toString(),
    '\uFFFD\uFFFD\uFFFD'
  )
  t.equal(
    new B([0xED, 0xBE, 0x8B]).toString(),
    '\uFFFD\uFFFD\uFFFD'
  )
  t.equal(
    new B([0xED, 0xBF, 0xBF]).toString(),
    '\uFFFD\uFFFD\uFFFD'
  )
  t.equal(
    new B([0xEE, 0x80, 0x80]).toString(),
    '\uE000'
  )
  t.end()
})

test('utf8 don\'t replace the replacement char', function (t) {
  t.equal(
    new B('\uFFFD').toString(),
    '\uFFFD'
  )
  t.end()
})
