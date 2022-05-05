import benchmark from 'benchmark'

function suite () {
  var suite = new benchmark.Suite()
  process.nextTick(function () {
    suite
      .on('error', function (event) {
        console.error(event.target.error.stack)
      })
      .on('cycle', function (event) {
        console.log(String(event.target))
      })
      .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'))
      })
      .run({ async: true })
  })
  return suite
}

var util = {suite}

export default util
