import type { ColDef } from 'ag-grid-enterprise'

import type { ApiColDef } from '../../api/endpoints/column-definitions/types/colDef.types.ts'
import type { ColDefMeta } from '../../api/endpoints/column-definitions/types/colDefMeta.types.ts'
import type { RowDataType } from '../../api/endpoints/rows/types/rowData.types.ts'

import { getAdditionalColumnProps } from './getAdditionalColumnProps.ts'
import { getEditableProps } from './getEditableProps.ts'

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
 * Map API column definitions into AG Grid ColDef objects.
 * @param apiDefs {ApiColDef[]} column definitions from API
 * @returns {ColDef<RowDataType>[]} data structure needed for AG Grid to define columns
 * @see ColDef
 * @see ApiColDef
 * @see RowDataType
 */
const mapApiToAgColDefs = (apiDefs: ApiColDef[]): ColDef<RowDataType>[] =>
  apiDefs.map(
    ({ colId, context, field, headerName, headerTooltip, initialHide }) => ({
      colId,
      field: field as keyof RowDataType,
      filter: getAGFilter(context.filterType) ?? true,
      headerName,
      headerTooltip,
      hide: initialHide,
      sortable: true,
      ...getAdditionalColumnProps(context, field as keyof RowDataType),
      ...getEditableProps(context),
    }),
  )

export { mapApiToAgColDefs }
