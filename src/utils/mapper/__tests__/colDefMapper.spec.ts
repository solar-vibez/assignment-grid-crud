import { describe, expect, it } from 'vitest'

import type { ApiColDef } from '../../../api/endpoints/column-definitions/types/colDef.types.ts'

import { mapApiToAgColDefs } from '../colDefMapper.ts'

// helper to create api def
const makeApiCol = (overrides = {}): ApiColDef => ({
  colId: 'c1',
  context: {
    appliesTo: [],
    canModify: 'ALWAYS',
    dataType: 'STRING',
    editorContext: {
      trimmed: true,
      type: 'string',
      unique: false,
    },
    fieldReference: {
      category: String.raw`component\Example`,
      name: 'REFERENTIAL_ID',
    },
    filterType: 'TEXT',
    index: 2,
    rendererContext: null,
    requiresCustomHandling: false,
    treePath: [2],
    type: 'column',
    validationContext: {
      maxLength: 255,
      minLength: 0,
      type: 'string',
    },
  },

  field: 'referentialID',
  headerName: 'Referential ID',
  headerTooltip: 'Referential ID',
  initialHide: false,
  type: 'column',
  ...overrides,
})

describe('colDefMapper', () => {
  it('maps API defs to AG ColDefs and includes additional props', () => {
    const apiDefs = [makeApiCol()]
    const cols = mapApiToAgColDefs(apiDefs)

    expect(Array.isArray(cols)).toBe(true)
    const [col] = cols
    expect(col?.colId).toBe('c1')
    expect(col?.field).toBe('referentialID')
    expect(col?.headerName).toBe('Referential ID')
    expect(col?.headerTooltip).toBe('Referential ID')
    // sortable must be defined
    expect(col?.sortable).toBe(true)
  })
})
