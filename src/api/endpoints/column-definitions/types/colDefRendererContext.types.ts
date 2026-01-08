import type { ColDefDateType } from './colDefDateType.types.ts'

/**
 * Represents context to render cell components for breakdown column data type.
 */
type ColDefBreakdownRendererContext = ColDefRendererContext & {
  // Whether to display the full path of the breakdown value.
  displayPath: boolean
  // The display type for the index key in the breakdown.
  displayType: IndexKeyDisplayType
  // Whether the breakdown is inherited from a parent context.
  inherited: boolean
  // The string to display when the value is null.
  showNullAs: string
  // The type of the renderer context, indicating it's for breakdown.
  type: 'breakdown'
}

/**
 * Represents context to render cell components for classification column data type.
 */
type ColDefClassificationRendererContext = ColDefRendererContext & {
  // The string to display when the value is null.
  showNullAs: string
  // The type of the renderer context, indicating it's for classification.
  type: 'classification'
}

/**
 * Represents context to render cell components for component choice column data type.
 */
type ColDefComponentChoiceRendererContext = ColDefRendererContext & {
  // The attribute used to retrieve the icon for the component.
  iconAttribute: null | string
  // The string to display when the value is null.
  showNullAs: string
  // The attribute used to retrieve the text for the component.
  textAttribute: null | string
  // The type of the renderer context, indicating it's for component choice.
  type: 'componentChoice'
}

/**
 * Represents context to render cell components for component tree choice column data type.
 */
type ColDefComponentTreeChoiceRendererContext = ColDefRendererContext & {
  // The attribute used to retrieve the icon for the component.
  iconAttribute: null | string
  // The string to display when the value is null.
  showNullAs: string
  // The attribute used to retrieve the text for the component.
  textAttribute: null | string
  // The type of the renderer context, indicating it's for component tree choice.
  type: 'componentTreeChoice'
}

/**
 * Represents context to render cell components for date column data type.
 */
type ColDefDateRendererContext = ColDefRendererContext & {
  // The specific date type (e.g., DATE_ONLY, DATE_TIME) for rendering the date value.
  dateType: ColDefDateType
  // The string to display when the value is null.
  type: 'date'
}

/**
 * Represents context to render cell components for enum column data type.
 * The displayMode determines how the enum value is presented in the cell.
 * - ICON: Only the icon associated with the enum value is displayed.
 * - ICON_AND_TEXT: Both the icon and the text representation of the enum value are displayed.
 * - TEXT: Only the text representation of the enum value is displayed.
 */
type ColDefEnumDisplayMode = 'ICON' | 'ICON_AND_TEXT' | 'TEXT'

type ColDefEnumRendererContext = ColDefRendererContext & {
  // The mode in which to display the enum value.
  displayMode: ColDefEnumDisplayMode
  // The string to display when the value is null.
  showNullAs: string
  // The type of the renderer context, indicating it's for enum.
  type: 'enum'
}

type ColDefIconNameRendererContext = ColDefRendererContext & {
  // The category of the icon to be displayed.
  category: string
  // The type of the renderer context, indicating it's for icon name.
  type: 'iconName'
}

type ColDefMonetaryValueRendererContext = ColDefRendererContext & {
  // Whether to show the original monetary value before any conversions.
  showOriginalValue: boolean
  // Whether to display the currency symbol alongside the monetary value.
  showSymbol: boolean
  // The type of the renderer context, indicating it's for monetary value.
  type: 'monetaryValue'
}

type ColDefRendererContext = object

/**
 * Represents context to render cell components for different column data types.
 */
type ColDefRendererContextUnion =
  | ColDefBreakdownRendererContext
  | ColDefClassificationRendererContext
  | ColDefComponentChoiceRendererContext
  | ColDefComponentTreeChoiceRendererContext
  | ColDefDateRendererContext
  | ColDefEnumRendererContext
  | ColDefIconNameRendererContext
  | ColDefMonetaryValueRendererContext

/**
 * The display type for the index key in breakdown renderer context.
 * - DESCRIPTION: Displays only the description of the index key.
 * - NAME: Displays only the name of the index key.
 * - NAME_DESCRIPTION: Displays both the name and description of the index key.
 */
type IndexKeyDisplayType = 'DESCRIPTION' | 'NAME' | 'NAME_DESCRIPTION'

export { type ColDefRendererContextUnion }
