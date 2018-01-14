// // ALEX DEBUG BLOCK START
// require('dotenv').config();
// const test = 'postgres://abc:d0ef@hi-j.compute-1.amazonaws.com:5432/dedjj9hcdfiie5'
// const testEncoded = encodeURIComponent(test)
// const testQuote2 = '"a"'
// const testQuote1 = "'a'"
// const testBase = 'hello'
//
// const  yaml = `
// env:
//   - TEST=${test}
//   - TEST_ENCODED=${testEncoded}
//   - TEST_QUOTE1=${testQuote1}
//   - TEST_QUOTE2=${testQuote2}
//   - TEST_BASE=${testBase}
// `
//
//
// const envNames =['TEST', 'TEST_ENCODED', 'TEST_QUOTE1', 'TEST_QUOTE2','TEST_BASE']
// //const envNames = ['DATABASE_URL', 'PORT']
// envNames.forEach(x => console.log(process.env[x]))
//
//
// // ALEX DEBUG BLOCK END
//
//
// // ALEX DEBUG BLOCK START
// require('dotenv').config();
// const envNames = ['DATABASE_URL', 'DBURL', 'PORT']
// envNames.forEach(x => console.log(x, process.env[x]))
//
//
// // ALEX DEBUG BLOCK END
/*
env:
  global:
  - DATABASE_URL=postgres://abc:d0ef@hi-j.compute-1.amazonaws.com:5432/dedjj9hcdfiie5
  - TEST=postgres://abc:d0ef@hi-j.compute-1.amazonaws.com:5432/dedjj9hcdfiie5
  - TEST_ENCODED=postgres%3A%2F%2Fabc%3Ad0ef%40hi-j.compute-1.amazonaws.com%3A5432%2Fdedjj9hcdfiie5
  - TEST_QUOTE1='a'
  - TEST_QUOTE2="a"
  - TEST_BASE=hello
  */

const moment = require('moment');

console.log(
  moment().f)
