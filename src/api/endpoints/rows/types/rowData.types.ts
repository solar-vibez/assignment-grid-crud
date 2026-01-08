/**
 * Possible options when selecting a color flag from a dropdown.
 */
type ColorFlag =
  | { text: 'Blue'; value: 'FLAG_BLUE' }
  | { text: 'Green'; value: 'FLAG_GREEN' }
  | { text: 'Orange'; value: 'FLAG_ORANGE' }
  | { text: 'Purple'; value: 'FLAG_PURPLE' }
  | { text: 'Red'; value: 'FLAG_RED' }
  | { text: 'Yellow'; value: 'FLAG_YELLOW' }

/**
 * Type definition for a row of data in the grid.
 */
type RowDataType = {
  colorFlag: ColorFlag
  customValues: Record<string, number | string>
  description: string
  document: number
  id: number
  metaData: {
    nonEditableFields: Record<string, string[]>
    nonEditableFieldsReason: Record<string, string>
    notAllowedActions: Record<string, boolean>
  }
  percentage: number
  referentialID: string
  valid: boolean
}

export { type ColorFlag, type RowDataType }
