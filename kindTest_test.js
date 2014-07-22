/*
 * Kind test.
 *
 * Copyright 2012 Google Inc. All Rights Reserved.
 * Author: moz@google.com (Michael Zhou)
 */

goog.require('goog.dom.NodeType');
goog.require('goog.testing.jsunit');
goog.require('wgxpath.KindTest');


var testNode;

function setUpPage() {
  testNode =  /** @type {!Node} */(document.getElementById('div-1').firstChild);
}

// TODO: Add test case for PI nodes.
function testIsValid() {
  var nodeTypeName = 'test()';
  assert(!wgxpath.KindTest.isValidType(nodeTypeName));
}

function testMatches() {
  var resultKindTest = new wgxpath.KindTest('text');
  assert(resultKindTest.matches(testNode));
}

function testNotMatches() {
  var resultKindTest = new wgxpath.KindTest('comment');
  assert(!resultKindTest.matches(testNode));
}
