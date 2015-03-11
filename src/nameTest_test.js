/*
 * Name test.
 *
 * Copyright 2012 Google Inc. All Rights Reserved.
 * Author: moz@google.com (Michael Zhou)
 */

goog.require('goog.dom');
goog.require('goog.testing.jsunit');
goog.require('goog.userAgent');
goog.require('wgxpath.NameTest');


function testStarMatchesWithoutNamespace() {
  var testNode = goog.dom.getRequiredElement('div-1');
  var resultNameTest = new wgxpath.NameTest('*');
  assertTrue(resultNameTest.matches(testNode));
}

function testStarMatchesWithHtmlNamespace() {
  var testNode = goog.dom.getRequiredElement('div-1');
  var resultNameTest = new wgxpath.NameTest('*',
                                            'http://www.w3.org/1999/xhtml');
  assertTrue(resultNameTest.matches(testNode));
}

function testStarMatchesWithNonHtmlNamespace() {
  if (!document.createElementNS) {
    return;
  }
  var testNode = document.createElementNS('http://www.google.com', 'div');
  var resultNameTest = new wgxpath.NameTest('*',
                                            'http://www.google.com');
  assertTrue(resultNameTest.matches(testNode));
}

function testNameMatchesWithoutNamespace() {
  var testNode = goog.dom.getRequiredElement('div-1');
  var resultNameTest = new wgxpath.NameTest('div');
  assertTrue(resultNameTest.matches(testNode));
}

function testNameMatchesWithHtmlNamespace() {
  var testNode = goog.dom.getRequiredElement('div-1');
  var resultNameTest = new wgxpath.NameTest('div',
                                            'http://www.w3.org/1999/xhtml');
  assertTrue(resultNameTest.matches(testNode));
}

function testNameMatchesWithNonHtmlNamespace() {
  if (!document.createElementNS) {
    return;
  }
  var testNode = document.createElementNS('http://www.google.com', 'div');
  var resultNameTest = new wgxpath.NameTest('div',
                                            'http://www.google.com');
  assertTrue(resultNameTest.matches(testNode));
}

function testNameDoesNotMatch() {
  var testNode = goog.dom.getRequiredElement('div-1');
  var resultNameTest = new wgxpath.NameTest('span');
  assertFalse(resultNameTest.matches(testNode));
}

function testNamespaceDoesNotMatch() {
  var testNode = goog.dom.getRequiredElement('div-1');
  var resultNameTest = new wgxpath.NameTest('div',
                                            'http://www.google.com');
  assertFalse(resultNameTest.matches(testNode));
}

function testNamespaceDoesNotMatchWithStar() {
  var testNode = goog.dom.getRequiredElement('div-1');
  var resultNameTest = new wgxpath.NameTest('*',
                                            'http://www.google.com');
  assertFalse(resultNameTest.matches(testNode));
}
