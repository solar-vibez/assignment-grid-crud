
import { describe, expect, it } from 'vitest'

import type {
  ColDefMeta
} from '../../../api/endpoints/column-definitions/types/colDefMeta.types.ts'

import { FlagCellRenderer } from '../../../components/grid/cells/FlagCell/FlagCellRenderer'
import { getAdditionalColumnProps } from '../getAdditionalColumnProps'

const baseMeta = (overrides = {}) => ({
  dataType: 'STRING',
  rendererContext: null,
  ...overrides,
})

describe('getAdditionalColumnProps', () => {
  it('formats percentage values with two decimals and %', () => {
    const meta = baseMeta({ dataType: 'PERCENTAGE' })
    const col = getAdditionalColumnProps(meta as ColDefMeta, 'percentage')

    expect(col.type).toBe('rightAligned')
    const formatter = col.valueFormatter as ({ value}: { value: null | number }) => string;

    expect(formatter({ value: 12.3456 })).toBe('12.35%')
    expect(formatter({ value: null })).toBe('')
  })

  it('formats double values with two decimals without %', () => {
    const meta = baseMeta({ dataType: 'DOUBLE' })
    const col = getAdditionalColumnProps(meta as ColDefMeta, 'percentage')

    const formatter = (col.valueFormatter  as ({ value}: { value: null | number }) => string)

    expect(formatter({ value: 1.5 })).toBe('1.50')
  })

  it('returns flag renderer props for COLOR_FLAG', () => {
    const meta = baseMeta({
      dataType: 'COLOR_FLAG',
      rendererContext: { displayMode: 'ICON_AND_TEXT', showNullAs: '' },
    })

    const col = getAdditionalColumnProps(meta as ColDefMeta, 'colorFlag')

    expect(col.cellRenderer).toBe(FlagCellRenderer)
    expect(col.valueGetter).toBeDefined()
    expect(col.filterValueGetter).toBeDefined();
  })
})

