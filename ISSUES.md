ISSUES FOUND
=============


The following issues were found in wgxp:

- **node() implementation not working properly (critical?)**
- no tolerance for absent spacing as in e.g.: `"1and1'`, `"1 and1"`, `"asdf -asdf"`, `"1mod1"`, `"1mod 1"`, `"1 mod1"`, `"1div1"`, `"1 div1"`, `"1div 1"`.
- using the union operator for a combination of a namespace node and attribute node
- `"substring('12345', -1 div 0)"` is '' but probably should be '12345'
- normalize-space() may not properly normalize vertical tabs `\v` and linefeeds `\f`
