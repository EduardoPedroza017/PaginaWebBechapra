const assert = require('node:assert').strict
const { findSuggestion, normalize } = require('../utils/findSuggestion')

function run(){
  // base not used
  assert.equal(findSuggestion('new-handle', ['old','another']), 'new-handle')

  // base exists, pick -2
  assert.equal(findSuggestion('base', ['base','base-2','base-3']), 'base-4')

  // handles with different separators
  assert.equal(findSuggestion('Mi Título', ['mi-titulo','mi-titulo-2']), 'mi-titulo-3')

  // many numbers missing
  assert.equal(findSuggestion('x', ['x','x-2','x-4']), 'x-3')

  // empty base
  assert.equal(findSuggestion('', ['a','b']), null)

  console.log('All suggestion tests passed')
}

run()
