wgxp-java-rosa
==============

Fork of Wicked good XPath with Java rosa APIs added


###How to Build
1. download [closure compiler](http://closure-compiler.googlecode.com/files/compiler-latest.zip)
2. create folder 'closure-compiler' at same level as this repo (sibling)
3. unpack compiler-latest and place inside the closure-compiler folder, rename compiler-latest to `build`
4. `git clone https://code.google.com/p/closure-library/` and place as sibling folder of this repo
5. from repo run `sh compile.sh`. This will create the library `wgxpath.install.js`

folder structure:
````
- wgxp-java-rosa
- closure-library
- closure-compiler
              |_build
                   compiler.jar
````