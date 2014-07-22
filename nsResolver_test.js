/**
 * Namespace resolver test.
 */

goog.require('goog.dom');
goog.require('goog.testing.jsunit');
goog.require('wgxpath.nsResolver');


function setUpPage() {
  document.documentElement.setAttribute('xmlns:a', 'http://www.example.org/a');
  document.documentElement.setAttribute('xmlns:b', 'http://www.example.org/b');
}

function testDocumentResolver() {
  var resolver = wgxpath.nsResolver.getResolver(document);
  assertEquals('http://www.w3.org/1999/xhtml', resolver(null));
  assertEquals('http://www.example.org/a', resolver('a'));
  assertEquals('http://www.example.org/b', resolver('b'));
  assertEquals(null, resolver('c'));
}

function testElementResolver() {
  var elem = goog.dom.getRequiredElement('elem');
  var resolver = wgxpath.nsResolver.getResolver(elem);
  assertEquals('http://www.w3.org/1999/xhtml', resolver(null));
  assertEquals('http://www.example.org/a2', resolver('a'));
  assertEquals('http://www.example.org/b', resolver('b'));
  assertEquals(null, resolver('c'));
}

function testAttributeResolver() {
  var attr = document.getElementById('elem').attributes[0];
  var resolver = wgxpath.nsResolver.getResolver(attr);
  assertEquals(null, resolver(null));
  assertEquals(null, resolver('a'));
  assertEquals(null, resolver('b'));
  assertEquals(null, resolver('c'));
}

function testDocumentFragmentResolver() {
  var docFragment = document.createDocumentFragment();
  var resolver = wgxpath.nsResolver.getResolver(docFragment);
  assertEquals(null, resolver(null));
  assertEquals(null, resolver('a'));
  assertEquals(null, resolver('b'));
  assertEquals(null, resolver('c'));
}
