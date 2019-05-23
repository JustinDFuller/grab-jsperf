# grab-jsperf

Grab a jsperf URL and put it into a file that can be run with benchmark.js

## Install

```
npm i grab-jsperf -g
```

## Usage

```
grab-jsperf https://jsperf.com/slug-name-here
```

A file called slug-name-here.js will be created in the directory you run this command in.

To run the tests:
```
node slug-name-here.js
```
