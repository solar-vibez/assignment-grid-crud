import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { faker } from '@faker-js/faker'
import { Button, Space, Tooltip } from 'antd'
import { useAtomValue } from 'jotai'
import { useCallback } from 'react'

import type { RowDataType } from '../../api/endpoints/rows/types/rowData.types.ts'

import { add } from '../../api/endpoints/rows/add.ts'
import { deleteRow } from '../../api/endpoints/rows/delete.ts'
import { COLORS_ENUM_VALUES } from '../../constants.ts'
import { gridRefAtom, selectedRowIdsAtom } from '../../state/atoms.ts'
import { useGlobalMessage } from '../notifications/useGlobalMessage.ts'

/**
 * Toolbar component for adding and deleting rows.
 * Uses AG Grid's transaction API for updates.
 */
const RowActionsToolbar = () => {
  const gridRef = useAtomValue(gridRefAtom)
  const selectedRowIds = useAtomValue(selectedRowIdsAtom)
  const showMessage = useGlobalMessage()

  const handleAddRow = useCallback(async () => {
    if (!gridRef?.api) {
      showMessage.error({ content: 'Grid not initialized' })

      return
    }

    try {
      // Generate new row data with default values
      const colorFlag = faker.helpers.arrayElement(COLORS_ENUM_VALUES)

      const newRowData: RowDataType = {
        colorFlag,
        customValues: {
          '3700': faker.lorem.words(2),
          '3701': faker.number.float({ fractionDigits: 2, max: 100, min: 0 }),
        },
        description: faker.lorem.sentence(),
        document: faker.number.int({ max: 999, min: 100 }),
        id: gridRef.api.getDisplayedRowCount() + 1,
        metaData: {
          nonEditableFields: {
            'component\\Example': ['PERCENTAGE'],
          },
          nonEditableFieldsReason: {},
          notAllowedActions: {},
        },
        percentage: faker.number.float({ fractionDigits: 2, max: 100, min: 0 }),
        referentialID: `RefID ${faker.number.int({
          max: 10,
          min: 1,
        })} - ${faker.number.int({ max: 99, min: 1 })}`,
        valid: faker.datatype.boolean(),
      }
      const count = gridRef.api.getDisplayedRowCount()

      // Call API to add row
      const createdRow = await add(newRowData, count + 1)

      // Use AG Grid transaction to add the row
      gridRef.api.applyTransaction({
        add: [createdRow],
      })

      showMessage.success({
        content: 'Row added successfully',
      })

      // scroll to added row
      gridRef.api.ensureIndexVisible(count)
    } catch (error) {
      showMessage.error({
        content: (error as Error).message,
      })
    }
  }, [gridRef, showMessage])

  const handleDeleteRows = useCallback(async () => {
    if (!gridRef?.api) {
      showMessage.error({ content: 'Grid not initialized' })

      return
    }

    if (selectedRowIds.size === 0) {
      showMessage.warning({
        content: 'Please select at least one row to delete',
      })

      return
    }

    try {
      // Get selected rows data
      const selectedRows = gridRef.api.getSelectedRows()

      // Delete from API
      const rowIds = [...selectedRowIds]
      await Promise.all(rowIds.map((id) => deleteRow(id)))

      // Use AG Grid transaction to remove the rows
      gridRef.api.applyTransaction({
        remove: selectedRows,
      })

      gridRef.api.clearCellSelection()
      showMessage.success({
        content: `${selectedRows.length} row(s) deleted successfully`,
      })
    } catch (error) {
      showMessage.error({
        content: (error as Error).message,
      })
    }
  }, [gridRef, selectedRowIds, showMessage])

  const deleteButtonTitle =
    selectedRowIds.size > 0 ? `Delete ${selectedRowIds.size} row(s)` : undefined

  return (
    <Space className="gap-2 px-4 py-3">
      <Button
        color="primary"
        icon={<PlusOutlined />}
        onClick={handleAddRow}
        variant="text"
      >
        Create
      </Button>
      <Tooltip title={deleteButtonTitle}>
        <Button
          color="primary"
          disabled={selectedRowIds.size === 0}
          icon={<DeleteOutlined />}
          onClick={handleDeleteRows}
          variant="text"
        >
          Delete
        </Button>
      </Tooltip>
    </Space>
  )
}

export { RowActionsToolbar }
