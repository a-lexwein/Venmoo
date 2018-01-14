Goal of debugging:
  Get Travis to use our PGdb
  Which means get DATABASE_URL to log the postgres url.
When bug is fixed:
  My first GET users/id test passes

What gets added into .test console.log()

`test` has the same format as the url we're using, but abc, d0ef, hi-j are subbed in for
```
const test = 'postgres://abc:d0ef@hi-j.compute-1.amazonaws.com:5432/dedjj9hcdfiie5'

const testEncoded = encodeURIComponent(test)

const testQuote2 = '"a"'

const testQuote1 = "'a'"

const testBase = 'hello'


```
Test most as public in .yaml

```

const  = \`
env:
  - DB=postgres
  - TEST=${test}
  - TEST_ENCODED=${testEncoded}
  - TEST_QUOTE1=${testQuote1}
  - TEST_QUOTE2=${testQuote2}
  - TEST_BASE=${base}
\`

```


```
env:
  global:
  - DATABASE_URL=postgres://abc:d0ef@hi-j.compute-1.amazonaws.com:5432/dedjj9hcdfiie5
  - TEST=postgres://abc:d0ef@hi-j.compute-1.amazonaws.com:5432/dedjj9hcdfiie5
  - TEST_ENCODED=postgres%3A%2F%2Fabc%3Ad0ef%40hi-j.compute-1.amazonaws.com%3A5432%2Fdedjj9hcdfiie5
  - TEST_QUOTE1='a'
  - TEST_QUOTE2="a"
  - TEST_BASE=hello

```

So then
```
travis encrypt DATABASE_URL=postgres://abc:d0ef@hi-j.compute-1.amazonaws.com:5432/dedjj9hcdfiie5
```

```

Add two environment variables hashed using travis encrypt cli

encrypted and unencrypted in .travis.yml
in UI, with and without process.env prefix

cases:
plain text

URL looking thing
coded vs unencoded
no quotes
single quotes
double quotes
