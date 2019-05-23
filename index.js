const url = require('url')
const path = require('path')
const fs = require('fs-extra')
const cheerio = require('cheerio')
const fetch = require('node-fetch')

function getScript(html) {
  const $ = cheerio.load(html)
  const [script] = $('script').filter(function (i, elem) {
      return elem.children[0] && elem.children[0].data.includes('ui.add')
  }).map(function (i, elem) {
    return elem.children[0].data
  }).get()

  return script.replace(/(\s+ui.browserscope.key = '\w+')/, '')
}

function createScript(html) {
  return `
    const Benchmark = require('benchmark')
    const ui = new Benchmark.Suite()

    ${html}

    ui.on('cycle', function(event) {
      console.log(String(event.target));  
    })

    ui.on('complete', function() {
      console.log('Fastest is ' + this.filter('fastest').map('name'));    
    })
    
    ui.run();
  `
}

function writeScript(name) {
  return function (script) {
    return fs.writeFile(path.join(process.cwd(), `${name}.js`), script)
  }
}

function getName(jsperfUrl) {
  return url.parse(jsperfUrl).pathname.split('/')[1]
}

module.exports = function (url) {
  return fetch(url)
    .then(res => res.text())
    .then(getScript)
    .then(createScript)
    .then(writeScript(getName(url)))
}
