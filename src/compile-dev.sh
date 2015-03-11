#!/bin/sh
mkdir -p ../build
java -jar ../../closure-compiler/build/compiler.jar \
    --closure_entry_point wgxpath \
    --compilation_level WHITESPACE_ONLY \
    --js *.js \
    --js !test_js_deps.js \
    --js ../../closure-library/closure/**.js \
    --js ../../closure-library/closure/!**_test.js \
    --only_closure_dependencies \
    --output_wrapper "(function(){%output%})()" \
    --use_types_for_optimization \
    --warning_level VERBOSE \
    > ../build/wgxpath.install.js
