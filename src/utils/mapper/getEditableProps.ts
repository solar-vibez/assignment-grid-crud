import type {
  CellClassParams,
  ColDef,
  EditableCallbackParams,
} from 'ag-grid-enterprise'

import type {
  CanModify,
  ColDefMeta,
  FieldReference,
} from '../../api/endpoints/column-definitions/types/colDefMeta.types.ts'
import type {
  ColDefDoubleValidationContext,
  ColDefStringValidationContext,
} from '../../api/endpoints/column-definitions/types/colDefValidationContext.ts'
import type { RowDataType } from '../../api/endpoints/rows/types/rowData.types.ts'

/**
 * Determines if a cell is editable based on the `canModify` type from column metadata.
 * @param canModify {CanModify} the editability mode from column definition
 * @param fieldRef {FieldReference | null} field reference to determine if we allow edit by condition
 * @returns a function that checks if a specific cell is editable
 */
const isCellEditable =
  (canModify: CanModify, fieldRef: FieldReference | null) =>
  (
    params: CellClassParams<RowDataType> | EditableCallbackParams<RowDataType>,
  ): boolean => {
    if (canModify === 'NEVER') {
      return false
    }

    if (canModify === 'ALWAYS' || fieldRef === null) {
      return true
    }

    // For CONDITIONAL, check if the field is in nonEditableFields (row's metadata)
    const { nonEditableFields = {} } = params.data?.metaData ?? {}
    const allNonEditableFields = Object.values(nonEditableFields).flat()

    // If the field is in nonEditableFields, it's not editable
    return !allNonEditableFields.includes(fieldRef.name)
  }

const getEditableProps = (columnMetadata: ColDefMeta): ColDef<RowDataType> => {
  const config: ColDef<RowDataType> = {
    editable: isCellEditable(
      columnMetadata.canModify,
      columnMetadata.fieldReference,
    ),
  }
  const { editorContext, validationContext } = columnMetadata

  if (editorContext?.type === 'string') {
    const vContext = validationContext as ColDefStringValidationContext

    if (editorContext.trimmed) {
      config.valueParser = (params) => {
        return params.newValue.trim()
      }
    }

    return {
      ...config,
      cellEditor: 'agTextCellEditor',
      cellEditorParams: {
        maxLength: vContext.maxLength,
      },
    }
  }

  if (editorContext?.type === 'double') {
    const vContext = validationContext as ColDefDoubleValidationContext

    return {
      ...config,
      cellEditor: 'agNumberCellEditor',
      cellEditorParams: {
        max: vContext.maxValue,
        min: vContext.minValue,
      },
      valueParser: (params) => {
        switch (editorContext.commitBlankBehaviour) {
          case 'COMMIT_AS_NULL': {
            return null
          }

          case 'COMMIT_AS_ZERO': {
            return 0
          }

          // no idea for now how to disallow
          case 'NOT_ALLOWED': {
            return params.oldValue as number
          }
        }
      },
    }
  }

  return config
}

export { getEditableProps }
