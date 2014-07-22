/*
 * Context test.
 *
 * Copyright 2012 Google Inc. All Rights Reserved.
 * Author: evanrthomas@google.com (Evan Thomas)
 */

goog.require('goog.dom');
goog.require('goog.testing.jsunit');
goog.require('wgxpath.Context');


var div;

function setUpPage() {
  div = goog.dom.getRequiredElement('div');
}

function testConstructContextWithPositionAndLastArguments() {
  var ctx = new wgxpath.Context(div, 10, 20);
  assertEquals(ctx.getNode(), div);
  assertEquals(ctx.getPosition(), 10);
  assertEquals(ctx.getLast(), 20);
}

function testConstructContextWithNoArguments() {
  var ctx = new wgxpath.Context(div);
  assertEquals(ctx.getNode(), div);
  assertEquals(ctx.getPosition(), 1);
  assertEquals(ctx.getLast(), 1);
}

function testConstructContextWithPosition() {
  var ctx = new wgxpath.Context(div, 5);
  assertEquals(ctx.getPosition(), 5);
  assertEquals(ctx.getLast(), 1);
}
