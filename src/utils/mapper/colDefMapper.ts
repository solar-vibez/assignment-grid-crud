import type { ColDef } from 'ag-grid-enterprise'

import type { ApiColDef } from '../../api/endpoints/column-definitions/types/colDef.types.ts'
import type { ColDefMeta } from '../../api/endpoints/column-definitions/types/colDefMeta.types.ts'
import type {
  ColorFlag,
  RowDataType,
} from '../../api/endpoints/rows/types/rowData.types.ts'

import { FlagCellRenderer } from '../../components/grid/cells/FlagCell/FlagCellRenderer.tsx'

/**
 * Gets filter name for simple columns based on `filterType` from API
 * @param filterType {FilterType} filter type value from API
 * @returns the type of the filter in AG Grid
 */
const getAGFilter = (
  filterType: ColDefMeta['filterType'],
): string | undefined => {
  if (filterType === 'DOUBLE' || filterType === 'INTEGER') {
    return 'agNumberColumnFilter'
  }

  if (filterType === 'BOOLEAN' || filterType === 'ENUM') {
    return 'agSetColumnFilter'
  }

  if (filterType === 'DATE') {
    return 'agDateColumnFilter'
  }

  if (filterType === 'TEXT') {
    return 'agTextColumnFilter'
  }
}

/**
 * Gets custom props for column definition based on `dataType`
 * @param apiColDef {ApiColDef} column definition from API
 * @returns partial column definition config
 */
const getColumnProps = (apiColDef: ApiColDef): ColDef<RowDataType> => {
  const dataType = apiColDef.context.dataType // ???

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
    const field = apiColDef.field as keyof RowDataType
    return {
      cellRenderer: FlagCellRenderer,
      context: {
        rendererContext: apiColDef.context.rendererContext,
      },
      filterValueGetter: (params) => (params.data?.[field] as ColorFlag)?.text,
      valueGetter: (params) => params.data?.[field] as ColorFlag,
      sortable: false, // it's a bit unclear how to correctly sort
    }
  }

  return {}
}

/**
 * Map API column definitions into AG Grid ColDef objects.
 * @param apiDefs {ApiColDef[]} column definitions from API
 * @returns {ColDef<RowDataType>[]} data structure needed for AG Grid to define columns
 * @see ColDef
 * @see ApiColDef
 * @see RowDataType
 */
const mapApiToAgColDefs = (apiDefs: ApiColDef[]): ColDef<RowDataType>[] =>
  apiDefs.map((d) => ({
    colId: d.colId,
    field: d.field as keyof RowDataType,
    filter: getAGFilter(d.context.filterType) ?? true,
    headerName: d.headerName,
    headerTooltip: d.headerTooltip,
    hide: d.initialHide,
    sortable: true,
    ...getColumnProps(d),
  }))

export { mapApiToAgColDefs }
