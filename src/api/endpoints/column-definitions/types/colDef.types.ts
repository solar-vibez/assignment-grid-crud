import type { ColDefMeta, ColGroupDefMeta } from './colDefMeta.types.ts'

type AbstractColDef = {
  // The display name of the column or column group.
  headerName: string
  // The tooltip text for the column or column group header.
  headerTooltip: string
}

type AbstractColDefUnion = ApiColDef | ApiColGroupDef

/**
 * Represents the definition of a single column in a data grid.
 */
type ApiColDef = AbstractColDef & {
  // Unique identifier for the column.
  colId: string
  // Contains context to define behaviour for cell rendering, editing, filtering, and validation.
  context: ColDefMeta
  // The field property indicates the data field this column is associated with.
  field: string
  // Whether the column is initially hidden.
  initialHide: boolean
  // The type property is used to discriminate between column and group definitions. (No column groups in this assignment.)
  type: 'column'
}

/**
 * Represents the definition of a group of columns in a data grid.
 * Note: Column groups are not used in this assignment.
 */
type ApiColGroupDef = AbstractColDef & {
  children: AbstractColDefUnion[]
  context: ColGroupDefMeta
  groupId: string
  type: 'group'
}

export {
  type AbstractColDef,
  type AbstractColDefUnion,
  type ApiColDef,
  type ApiColGroupDef,
}
