// Copyright 2012 Google Inc. All Rights Reserved.

/**
 * @fileoverview Utility class for the XPath test suite.
 */


goog.provide('wgxpath.test');


goog.require('goog.dom');
goog.require('goog.dom.NodeType');


/**
 * Checks if a node matches the expected one.
 *
 * @param {string} expected The string representation of the expected node.
 * @param {!Node} node The node to check.
 * @return {boolean} Whether the node is the expected one.
 * @private
 */
wgxpath.test.isNodeExpected_ = function(expected, node) {
  return expected.indexOf('(') == - 1 ?
      wgxpath.test.isElementExpected_(expected, node) :
      wgxpath.test.isNonElementExpected_(expected, node);
};


/**
 * Checks if an element matches the expected one.
 *
 * @param {string} expected The string representation of the expected node.
 * @param {!Node} node The node to check.
 * @return {boolean} Whether the node is the expected one.
 * @private
 */
wgxpath.test.isElementExpected_ = function(expected, node) {
  if (node.nodeType != goog.dom.NodeType.ELEMENT) {
    return false;
  }
  var m = expected.match(/(\w+)(?:([#\.])([\w\s-]+))?/);
  var nodeName = m[1], propertyDelimiter = m[2], propertyValue = m[3];
  if (node.nodeName.toLowerCase() != nodeName) {
    return false;
  }
  if (propertyDelimiter) {
    switch (propertyDelimiter) {
      case '.':
        return node.className == propertyValue;
      case '#':
        return node.id == propertyValue;
      default:
        throw new Error('Unknown delimiter: ' + propertyDelimiter);
    }
  }
  return true;
};


/**
 * Checks if a non-element node matches the expected one.
 *
 * @param {string} expected The string representation of the expected node.
 * @param {!Node} node The node to check.
 * @return {boolean} Whether the node is the expected one.
 * @private
 */
wgxpath.test.isNonElementExpected_ = function(expected, node) {
  var m = expected.match(/([\w-]+)\(([\w-=\?"'\s\\:]*)\)/);
  var nodeTypeName = m[1], nodeArgs = m[2];
  var nodeType = wgxpath.test.NON_ELEMENT_NAME_TO_TYPE_MAP_[nodeTypeName];
  if (node.nodeType != nodeType) {
    return false;
  }
  switch (nodeType) {
    case goog.dom.NodeType.ATTRIBUTE:
    case goog.dom.NodeType.PROCESSING_INSTRUCTION:
      var mArgs = nodeArgs.match(/([\w-]+)(?:=)([\w-'"\s]+)/);
      nodeName = mArgs[1];
      nodeValue = mArgs[2];
      break;
    case goog.dom.NodeType.TEXT:
    case goog.dom.NodeType.CDATA_SECTION:
    case goog.dom.NodeType.COMMENT:
      nodeName = '#' + nodeTypeName;
      nodeValue = nodeArgs;
      break;
    case goog.dom.NodeType.DOCUMENT:
      nodeName = '#document';
      nodeValue = null;
      break;
    default:
      throw new Error('Unknown node type: ' + nodeType);
  }
  if (node.nodeName.toLowerCase() != nodeName) {
    return false;
  }
  if (!goog.isNull(nodeValue) && node.nodeValue != nodeValue) {
    return false;
  }
  return true;
};


/**
 * Maps non-element node names to node types.
 *
 * @const
 * @type {!Object.<string, goog.dom.NodeType>}
 * @private
 */
wgxpath.test.NON_ELEMENT_NAME_TO_TYPE_MAP_ = {
  'attribute': goog.dom.NodeType.ATTRIBUTE,
  'text': goog.dom.NodeType.TEXT,
  'cdata-section': goog.dom.NodeType.CDATA_SECTION,
  'entity-reference': goog.dom.NodeType.ENTITY_REFERENCE,
  'entity': goog.dom.NodeType.ENTITY,
  'processing-instruction': goog.dom.NodeType.PROCESSING_INSTRUCTION,
  'comment': goog.dom.NodeType.COMMENT,
  'document': goog.dom.NodeType.DOCUMENT,
  'document-type': goog.dom.NodeType.DOCUMENT_TYPE,
  'document-fragment': goog.dom.NodeType.DOCUMENT_FRAGMENT,
  'notation': goog.dom.NodeType.NOTATION
};


/**
 * The context to evaluate test cases in.
 *
 * @type {!Node}
 * @private
 */
wgxpath.test.context_;


/**
 * Sets up the context.
 *
 * @param {!Node} context The context to evaluate test cases in.
 */
wgxpath.test.setContext = function(context) {
  wgxpath.test.context_ = context;
  window.XPathResult =
      goog.dom.getWindow(goog.dom.getOwnerDocument(context)).XPathResult;
};


/**
 * Executes an xpath expression.
 *
 * @param {string} expr The expression to evaluate.
 * @param {number} type The type of the xpath result to return.
 * @return {!XPathResult} The evaluation result.
 * @private
 */
wgxpath.test.evaluatePath_ = function(expr, type) {
  var doc = goog.dom.getOwnerDocument(wgxpath.test.context_);
  var startTime = goog.now();
  var result = doc.evaluate(expr, wgxpath.test.context_,
      /* namespaceResolver */ null, type,
      /* result */ null);
  // TODO(user): Use this number for benchmarking eventually.
  var elapsedTime = goog.now() - startTime;
  return result;
};


/**
 * Executes one test case that evaluates to nodeset.
 *
 * @param {!Array.<string>} expected The expected result.
 * @param {string} expr The expression to evaluate.
 */
wgxpath.test.assertEvaluatesToNodeSet = function(expected, expr) {
  var result = wgxpath.test.evaluatePath_(expr,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
  assertEquals(expected.length, result.snapshotLength);
  for (var i = 0; i < result.snapshotLength; i++) {
    assert(wgxpath.test.isNodeExpected_(expected[i], result.snapshotItem(i)));
  }
};


/**
 * Executes one test case that evaluates to a value.
 *
 * @param {(string|boolean|number)} expected The expected result.
 * @param {string} expr The expression to evaluate.
 */
wgxpath.test.assertEvaluatesToValue = function(expected, expr) {
  var result = wgxpath.test.evaluatePath_(expr, XPathResult.ANY_TYPE);
  if (result.resultType == XPathResult.NUMBER_TYPE) {
    assertEquals(expected, result.numberValue);
  } else if (result.resultType == XPathResult.STRING_TYPE) {
    assertEquals(expected, result.stringValue);
  } else if (result.resultType == XPathResult.BOOLEAN_TYPE) {
    assertEquals(expected, result.booleanValue);
  } else {
    throw new Error('Unknown result type: ' + result.resultType);
  }
};
