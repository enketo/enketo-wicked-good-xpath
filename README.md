Enketo Wicked Good XPath 
==============

Fork of [Wicked good XPath](https://code.google.com/p/wicked-good-xpath/) with Enketo/ODK/OpenRosa functionality added


###How to Build
1. download [Closure compiler](http://dl.google.com/closure-compiler/compiler-latest.zip) - compiler.latest.zip
2. create folder 'closure-compiler' at same level as this repo (sibling)
3. unpack compiler-latest.zip and place inside the closure-compiler folder, rename compiler-latest to `build`
4. `git clone https://github.com/google/closure-library` and place as sibling folder of this repo
5. from repo's src folder run `sh compile.sh` (or `sh compile-dev.sh`). This will create the library `build/wgxpath.install.js`

folder structure:
````
- wgxp-java-rosa
- closure-library
- closure-compiler
              |build
                   compiler.jar
````

###How to test
1. install test dependencies with `npm install`
2. `grunt karma` will test in PhantomJS, Chrome, Safari, Firefox and Opera

### How to merge from [master project](https://code.google.com/p/wicked-good-xpath/)
1. create a local git clone from the SVN repository with `git svn clone http://wicked-good-xpath.googlecode.com/svn/trunk/`
2. add the local git clone as a remote origin to this repo
3. merge as normal
