/*
 * Unary expression test.
 *
 * Copyright 2012 Google Inc. All Rights Reserved.
 * Author: moz@google.com (Michael Zhou)
 */

goog.require('goog.testing.jsunit');
goog.require('wgxpath.Context');
goog.require('wgxpath.DataType');
goog.require('wgxpath.Expr');
goog.require('wgxpath.Number');
goog.require('wgxpath.UnaryExpr');


function testConstructorSetContextPosition() {
  var fakeExpr = new wgxpath.Expr(wgxpath.DataType.NUMBER);
  fakeExpr.setNeedContextPosition(true);
  var expr = new wgxpath.UnaryExpr(fakeExpr);
  assertEquals(true, expr.doesNeedContextPosition());
  fakeExpr.setNeedContextPosition(false);
  expr = new wgxpath.UnaryExpr(fakeExpr);
  assertEquals(false, expr.doesNeedContextPosition());
}

function testConstructorSetContextNode() {
  var fakeExpr = new wgxpath.Expr(wgxpath.DataType.NUMBER);
  fakeExpr.setNeedContextNode(true);
  var expr = new wgxpath.UnaryExpr(fakeExpr);
  assertEquals(true, expr.doesNeedContextNode());
  fakeExpr.setNeedContextNode(false);
  expr = new wgxpath.UnaryExpr(fakeExpr);
  assertEquals(false, expr.doesNeedContextNode());
}

function testEvaluate() {
  var expr = new wgxpath.UnaryExpr(new wgxpath.Number(3));
  assertEquals(-3, expr.evaluate(new wgxpath.Context(document)));
}
