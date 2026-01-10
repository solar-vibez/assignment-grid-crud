import type { ColDefDataType } from './colDefDataType.types.ts'
import type { ColDefEditorContextUnion } from './colDefEditorContext.types.ts'
import type { ColDefRendererContextUnion } from './colDefRendererContext.types.ts'
import type { ColDefValidationContextUnion } from './colDefValidationContext.ts'

/**
 * Metadata for column definitions and column group definitions.
 */
type AbstractColDefMeta = {
  // The zero-based index of the column or group within its parent.
  index: number
  // The hierarchical path to the column or group within the overall structure.
  treePath: number[]
}

/**
 * Indicates whether a column can be modified.
 * - 'ALWAYS': The column can always be modified.
 * - 'NEVER': The column cannot be modified.
 * - 'CONDITIONAL': The column can be modified under certain conditions.
 *   In this case, the row metaData.nonEditableFields property should be checked
 *   to determine if the cell is editable.
 */
type CanModify = 'ALWAYS' | 'CONDITIONAL' | 'NEVER'

/**
 * Metadata specific to individual column definitions.
 * Includes information about data type, editor context, filter type, and validation context.
 */
type ColDefMeta = AbstractColDefMeta & {
  // The list of contexts or features that this column definition applies to. (Not applicable in this assignment.)
  appliesTo: string[]
  /**
   * Indicates whether a column can be modified.
   * - 'ALWAYS': The column can always be modified.
   * - 'NEVER': The column cannot be modified.
   * - 'CONDITIONAL': The column can be modified under certain conditions.
   *   In this case, the row metaData.nonEditableFields property should be checked
   *   to determine if the cell is editable.
   */
  canModify: CanModify
  // The data type of the column. Should be used to display appropriate cell editors and renderers.
  dataType: ColDefDataType
  // The context for rendering cell editor components.
  editorContext: ColDefEditorContextUnion | null
  // Reference to the underlying field in the data model that provides values for this column.
  fieldReference: FieldReference | null
  // The type of filter to use for this column. Not used in this assignment.
  filterType: FilterType | null
  // The context for rendering cell renderer components.
  rendererContext: ColDefRendererContextUnion | null
  // Indicates if the column requires custom handling beyond standard processing. Not used in this assignment.
  requiresCustomHandling: boolean
  // The type property is used to discriminate between column and group definitions. (No column groups in this assignment.)
  type: 'column'
  // The context for implementing validation rules for the column's data type.
  validationContext: ColDefValidationContextUnion | null
}

/**
 * Metadata specific to column group definitions.
 */
type ColGroupDefMeta = AbstractColDefMeta & {
  // The name of the column group.
  name: string
  // The type property is used to discriminate between column and group definitions. (No column groups in this assignment.)
  type: 'group'
}

/**
 * Reference to a specific field in the data model.
 */
type FieldReference = {
  // The category or namespace of the field.
  category: string
  // The name of the field.
  name: string
}

/**
 * Types of filters that can be applied to columns.
 */
type FilterType =
  | 'BOOLEAN'
  | 'BREAKDOWN'
  | 'CLASSIFICATION'
  | 'COMPONENT_CHOICE'
  | 'CURRENCY'
  | 'CUSTOM_CHOICE_VALUE'
  | 'DATE'
  | 'DOUBLE'
  | 'DURATION'
  | 'ENUM'
  | 'INTEGER'
  | 'MONEY'
  | 'NOTES'
  | 'TEXT'
  | 'UNIT'
  | 'WORKFLOW_STATE'

export {
  type AbstractColDefMeta,
  type CanModify,
  type ColDefMeta,
  type ColGroupDefMeta,
  type FieldReference,
  type FilterType,
}
