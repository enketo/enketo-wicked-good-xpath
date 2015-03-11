/*
 * Predicates test.
 *
 * Copyright 2012 Google Inc. All Rights Reserved.
 * Author: evanrthomas@google.com (Evan Thomas)
 */

goog.require('goog.dom');
goog.require('goog.testing.jsunit');
goog.require('wgxpath.NodeSet');
goog.require('wgxpath.Predicates');


/**
  * The nodeset with the nodes for the predicates to be evaluated against.
  */
var nodeset;

function setUp() {
  nodeset = new wgxpath.NodeSet();
  nodeset.add(goog.dom.getRequiredElement('1'));
  nodeset.add(goog.dom.getRequiredElement('2'));
  nodeset.add(goog.dom.getRequiredElement('3'));
  nodeset.add(goog.dom.getRequiredElement('4'));
  nodeset.add(goog.dom.getRequiredElement('5'));
}

/**
  * Asserts that these predicates evaluated against the nodeset defined
  * in setup yields these nodes.
  *
  * @param {!Array.<!Object>} predicatesArray An array of the fake
  *     predicates.
  * @param {!Array.<string>} ids An array with the ids of the nodes that
  *     should result from evaluating these predicates against nodeset.
  */
function assertEvaluatesTo(predicatesArray, ids) {
  var predicates = new wgxpath.Predicates(predicatesArray);
  var result = predicates.evaluatePredicates(nodeset);

  assertEquals(result.getLength(), ids.length);
  var iter = result.iterator();
  for (var i = 0; i < ids.length; i++) {
    assertEquals(iter.next(), goog.dom.getRequiredElement(ids[i]));
  }
  assertEquals(null, iter.next());
}


function makePredicate(evaluate) {
  return {evaluate: evaluate};
}

function testEvaluatePredicatesNumber() {
  var predicate = makePredicate(function(ctx) {
    return 1;
  });
  assertEvaluatesTo([predicate], ['1']);
}

function testEvaluatePredicatesString() {
  // If the predicate evaluates to any non-empty string against some node,
  // that node is kept.
  var predicate = makePredicate(function(ctx) {
    return ctx.getNode().id == 2 ? 'some string' : '';
  });
  assertEvaluatesTo([predicate], ['2']);
}

function testEvaluatePredicatesBoolean() {
  var predicate = makePredicate(function(ctx) {
    return ctx.getNode().id == 1 || ctx.getNode().id == 3;
  });
  assertEvaluatesTo([predicate], ['1', '3']);
}

function testEvaluatePredicatesNodeSet() {
  // If the predicate evaluates to any non-empty nodeset against some node,
  // that node is kept.
  var predicate = makePredicate(function(ctx) {
    var nonEmptyNodeSet = new wgxpath.NodeSet();
    nonEmptyNodeSet.add(goog.dom.getRequiredElement('1'));

    var emptyNodeSet = new wgxpath.NodeSet();
    return ctx.getNode().id == 3 ? nonEmptyNodeSet : emptyNodeSet;
  });
  assertEvaluatesTo([predicate], ['3']);
}

function testEvaluatePredicatesUnsupportedType() {
  var predicate = makePredicate(function(ctx) {
    return {};
  });
  var predicates =
      new wgxpath.Predicates([predicate]);
  assertThrows(function() {
    predicates.evaluatePredicates(nodeset);
  });
}

function testEvaluateMultiplePredicates() {
  var predicate1 = makePredicate(function(ctx) {
    return ctx.getNode().id % 2 == 1;
  });

  var predicate2 = makePredicate(function(ctx) {
    return 2;
  });
  assertEvaluatesTo([predicate1, predicate2], ['3']);
}
