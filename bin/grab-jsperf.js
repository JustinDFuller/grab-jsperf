#!/usr/bin/env node

const grabJsperf = require('../')

const [,, url] = process.argv

grabJsperf(url).then(() => console.log('Benchmark file created for: ' + url))
