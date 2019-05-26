
    const Benchmark = require('benchmark')
    const ui = new Benchmark.Suite()

    
  
          ui.add(
            'unsorted',
            {
              'defer': false,
              'fn': 'let sum = 0\r\n\r\nfor (let i = 0; i < array.length; i++) {\r\n  if (array[i] >= 128) {\r\n     sum += array[i]\r\n  }\r\n}'
            }
          );
          ui.add(
            'sorted',
            {
              'defer': false,
              'fn': 'let sum = 0\r\n\r\nfor (let i = 0; i < sorted.length; i++) {\r\n  if (sorted[i] >= 128) {\r\n     sum += sorted[i]\r\n  }\r\n}'
            }
          );
          ui.add(
            'bitwise',
            {
              'defer': false,
              'fn': 'let sum = 0\r\n\r\nfor (let i = 0; i < array.length; i++) {\r\n  const t = (array[i] - 128) >> 31;\r\n  sum += ~t & array[i];\r\n}'
            }
          );
          ui.add(
            'Ternary',
            {
              'defer': false,
              'fn': 'let sum = 0\r\n\r\nfor (let i = 0; i < array.length; i++) {\r\n  sum += array[i] >= 128 ? array[i] : 0;\r\n}'
            }
          );
          ui.add(
            'Ternary Sorted',
            {
              'defer': false,
              'fn': 'let sum = 0\r\n\r\nfor (let i = 0; i < sorted.length; i++) {\r\n  sum += sorted[i] >= 128 ? sorted[i] : 0;\r\n}'
            }
          );
  
          Benchmark.prototype.setup = 'array = []\r\n\r\nfor (let i = 0; i < 100; i++) {\r\n array[i] = Math.random() * 256\r\n}\r\n\r\nsorted = [...array].sort(function(a, b) {\r\n  return a - b;\r\n})'
      

    ui.on('cycle', function(event) {
      console.log(String(event.target));  
    })

    ui.on('complete', function() {
      console.log('Fastest is ' + this.filter('fastest').map('name'));    
    })
    
    ui.run();
  