/*
 * Lexer test.
 *
 * Copyright 2012 Google Inc. All Rights Reserved.
 * Author: moz@google.com (Michael Zhou)
 */

goog.require('goog.testing.jsunit');
goog.require('wgxpath.Lexer');


function testTokenize() {
  var sourcePath = '//*[@id="i"]';
  var expectedTokens = ['//', '*', '[', '@', 'id', '=', '"i"', ']'];
  var resultLexer = wgxpath.Lexer.tokenize(sourcePath);
  var expectedLexer = new wgxpath.Lexer(expectedTokens);
  for (var i = 0; i < expectedTokens.length; i++) {
    assertEquals(expectedLexer.next(), resultLexer.next());
  }
}

function testNext() {
  var expectedTokens = ['/', 'bookstore', '/', 'book', '[', 'price', '>',
                        '35.00', ']'];
  var resultLexer = new wgxpath.Lexer(expectedTokens);
  for (var i = 0; i < expectedTokens.length; i++) {
    assertEquals(expectedTokens[i], resultLexer.next());
  }
}

function testEmpty() {
  var resultLexer = new wgxpath.Lexer([]);
  assertEquals(true, resultLexer.empty());
}

function testPeek() {
  var expectedTokens = ['name', '(', '"some_name"', ')'];
  var resultLexer = new wgxpath.Lexer(expectedTokens);
  assertEquals(expectedTokens[0], resultLexer.peek());
  for (var i = 0; i < expectedTokens.length; i++) {
    assertEquals(expectedTokens[i], resultLexer.peek(i));
  }
}

function testBack() {
  var expectedTokens = ['..', '/', 'contents', '/', 'child', '::',
                        'sections'];
  var resultLexer = new wgxpath.Lexer(expectedTokens);
  for (var i = 0; i < expectedTokens.length; i++) {
    resultLexer.next();
  }
  resultLexer.back();
  assertEquals(expectedTokens[expectedTokens.length - 1],
               resultLexer.next());
}
