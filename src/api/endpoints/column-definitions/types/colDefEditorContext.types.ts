import type { ApiColDef } from './colDef.types.ts'
import type { ColDefDateType } from './colDefDateType.types.ts'

/**
 * Determine the library type for a breakdown column.
 */
type BreakdownLibraryType =
  | 'ACTUALS'
  | 'ASSET_LEVEL'
  | 'BENCHMARK_LEAD_LEVEL'
  | 'BENCHMARK_LEVEL'
  | 'COMMITMENTS'
  | 'CONTROL_COMPONENTS'
  | 'ENTERPRISE_RESOURCE'
  | 'ENTERPRISE_STRUCTURE'
  | 'ESTIMATES'
  | 'FORM_TRACKING'
  | 'KNOWLEDGEBASE_ESTIMATE'
  | 'PPM_DOCUMENT'
  | 'PROGRESS_REGISTER'
  | 'PROJECT_LEVEL'
  | 'TRANSFERS'
  | 'WORK_PACK'
  | 'WORK_PACK_ASSETS'

/**
 * Represents context to render cell editor components for breakdown column data type.
 */
type ColDefBreakdownEditorContext = ColDefEditorContext & {
  // The type of breakdown library.
  breakdownLibraryType: BreakdownLibraryType
  // Some values may be objects with multiple properties. This defines which properties to show in the editor.
  colDefs: ApiColDef[]
  // The type of the editor context, indicating it's for breakdown.
  type: 'breakdown'
}

/**
 * Represents context to render cell editor components for classification column data type.
 */
type ColDefClassificationEditorContext = ColDefEditorContext & {
  // Some values may be objects with multiple properties. This defines which properties to show in the editor.
  colDefs: ApiColDef[]
  // The type of the editor context, indicating it's for classification.
  type: 'classification'
}

/**
 * Defines behavior when committing blank values in numeric editors.
 * - COMMIT_AS_NULL: Blank values are committed as null.
 * - COMMIT_AS_ZERO: Blank values are committed as zero.
 * - NOT_ALLOWED: Blank values are not allowed and will trigger validation errors.
 */
type ColDefCommitBlankBehaviour =
  | 'COMMIT_AS_NULL'
  | 'COMMIT_AS_ZERO'
  | 'NOT_ALLOWED'

/**
 * Represents context to render cell editor components for component choice column data type.
 */
type ColDefComponentChoiceEditorContext = ColDefEditorContext & {
  // Some values may be objects with multiple properties. This defines which properties to show in the editor.
  colDefs: ApiColDef[]
  // The type of the editor context, indicating it's for component choice.
  type: 'componentChoice'
}

/**
 * Represents context to render cell editor components for component tree choice column data type.
 */
type ColDefComponentTreeChoiceEditorContext = ColDefEditorContext & {
  // Some values may be objects with multiple properties. This defines which properties to show in the editor.
  colDefs: ApiColDef[]
  // The type of the editor context, indicating it's for component tree choice.
  type: 'componentTreeChoice'
}

/**
 * Represents context to render cell editor components for currency column data type.
 */
type ColDefCurrencyEditorContext = ColDefEditorContext & {
  // Some values may be objects with multiple properties. This defines which properties to show in the editor.
  colDefs: ApiColDef[]
  // The type of the editor context, indicating it's for currency.
  type: 'currency'
}

/**
 * Represents context to render cell editor components for custom choice column data type.
 */
type ColDefCustomChoiceEditorContext = ColDefEditorContext & {
  // Some values may be objects with multiple properties. This defines which properties to show in the editor.
  colDefs: ApiColDef[]
  // The type of the editor context, indicating it's for custom choice.
  type: 'customChoice'
}

/**
 * Represents context to render cell editor components for date column data type.
 */
type ColDefDateEditorContext = ColDefEditorContext & {
  // Allows clearing the date selection.
  allowClear: boolean
  // Allows selecting today's date quickly.
  allowToday: boolean
  // Specifies the level of date granularity (e.g., date, month, year).
  dateType: ColDefDateType
  // The type of the editor context, indicating it's for date.
  type: 'date'
}

/**
 * Represents context to render cell editor components for double column data type.
 */
type ColDefDoubleEditorContext = ColDefEditorContext & {
  // Defines behavior when committing blank values in the double editor.
  commitBlankBehaviour: ColDefCommitBlankBehaviour
  // The type of the editor context, indicating it's for double.
  type: 'double'
}

type ColDefEditorContext = object

/**
 * Represents context to render cell editor components for different column data types.
 */
type ColDefEditorContextUnion =
  | ColDefBreakdownEditorContext
  | ColDefClassificationEditorContext
  | ColDefComponentChoiceEditorContext
  | ColDefComponentTreeChoiceEditorContext
  | ColDefCurrencyEditorContext
  | ColDefCustomChoiceEditorContext
  | ColDefDateEditorContext
  | ColDefDoubleEditorContext
  | ColDefEnumEditorContext
  | ColDefIntegerEditorContext
  | ColDefMonetaryValueEditorContext
  | ColDefPercentageEditorContext
  | ColDefStringEditorContext

/**
 * Represents context to render cell editor components for enum column data type.
 */
type ColDefEnumEditorContext = ColDefEditorContext & {
  // Some values may be objects with multiple properties. This defines which properties to show in the editor.
  colDefs: ApiColDef[]
  // The type of the editor context, indicating it's for enum.
  type: 'enum'
}

/**
 * Represents context to render cell editor components for integer column data type.
 */
type ColDefIntegerEditorContext = ColDefEditorContext & {
  /**
   * Defines behavior when committing blank values in numeric editors.
   * - COMMIT_AS_NULL: Blank values are committed as null.
   * - COMMIT_AS_ZERO: Blank values are committed as zero.
   * - NOT_ALLOWED: Blank values are not allowed and will trigger validation errors.
   */
  commitBlankBehaviour: ColDefCommitBlankBehaviour
  // The type of the editor context, indicating it's for integer.
  type: 'int'
}

/**
 * Represents context to render cell editor components for monetary value column data type.
 */
type ColDefMonetaryValueEditorContext = ColDefEditorContext & {
  /**
   * Defines behavior when committing blank values in numeric editors.
   * - COMMIT_AS_NULL: Blank values are committed as null.
   * - COMMIT_AS_ZERO: Blank values are committed as zero.
   * - NOT_ALLOWED: Blank values are not allowed and will trigger validation errors.
   */
  commitBlankBehaviour: ColDefCommitBlankBehaviour
  // The type of the editor context, indicating it's for monetary value.
  type: 'monetaryValue'
}

type ColDefPercentageEditorContext = ColDefEditorContext & {
  // Defines behavior when committing blank values in the percentage editor.
  commitBlankBehaviour: ColDefCommitBlankBehaviour
  // The type of the editor context, indicating it's for percentage.
  type: 'percentage'
}

/**
 * Represents context to render cell editor components for string column data type.
 */
type ColDefStringEditorContext = ColDefEditorContext & {
  // Whether to trim whitespace from the string input.
  trimmed: boolean
  // The type of the editor context, indicating it's for string.
  type: 'string'
  // Whether the string values must be unique within the column.
  unique: boolean
}

export { type ColDefEditorContextUnion }
