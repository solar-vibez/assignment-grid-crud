import type { ColDef } from 'ag-grid-enterprise'

import type { ColDefMeta } from '../../api/endpoints/column-definitions/types/colDefMeta.types.ts'
import type { ColDefEnumRendererContext } from '../../api/endpoints/column-definitions/types/colDefRendererContext.types.ts'
import type {
  ColorFlag,
  RowDataType,
} from '../../api/endpoints/rows/types/rowData.types.ts'

import { FlagCellRenderer } from '../../components/grid/cells/FlagCell/FlagCellRenderer.tsx'
import { COLORS_ENUM_VALUES } from '../../constants.ts'

/**
 * Gets custom props for column definition based on `dataType`
 * @returns partial column definition config
 * @param columnMetadata {ColDefMeta} column metadata
 * @param field corresponding field
 */
const getAdditionalColumnProps = (
  columnMetadata: ColDefMeta,
  field: keyof RowDataType,
): ColDef<RowDataType> => {
  const dataType = columnMetadata.dataType // ???

  // `.includes` to cover CUSTOM_FIELD_BOOLEAN etc.
  if (dataType.includes('BOOLEAN')) {
    return {
      // we can define it here or move to class
      cellStyle: {
        display: 'flex',
        justifyContent: 'center',
      },
    }
  }

  if (dataType.includes('PERCENTAGE') || dataType.includes('DOUBLE')) {
    return {
      type: 'rightAligned',
      valueFormatter: ({ value }: { value: null | number | undefined }) => {
        if (typeof value !== 'number' || Number.isNaN(value)) {
          return ''
        }

        const showPercent = dataType.includes('PERCENTAGE')

        return `${value.toFixed(2)}${showPercent ? '%' : ''}`
      },
    }
  }

  if (dataType === 'COLOR_FLAG') {
    const { displayMode, showNullAs } =
      columnMetadata.rendererContext as ColDefEnumRendererContext

    const cellRenderProps = {
      cellRenderer: FlagCellRenderer,
      cellRendererParams: {
        displayMode,
        showNullAs,
      },
    }

    return {
      cellEditor: 'agRichSelectCellEditor',
      cellEditorParams: {
        ...cellRenderProps,
        valueListMaxHeight: 220,
        values: COLORS_ENUM_VALUES,
      },
      ...cellRenderProps,
      filterValueGetter: (params) => (params.data?.[field] as ColorFlag).text,
      sortable: false, // it's a bit unclear how to correctly sort,
      valueGetter: (params) => params.data?.[field] as ColorFlag,
    }
  }

  return {}
}

export { getAdditionalColumnProps }
