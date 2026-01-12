import {
  CopyOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  PlusOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons'
import { faker } from '@faker-js/faker'
import {
  Button,
  Dropdown,
  Flex,
  Input,
  type MenuProps,
  Space,
  Tooltip,
  Typography,
} from 'antd'
import { useAtomValue } from 'jotai'
import { type FormEvent, useCallback, useMemo, useState } from 'react'

import type { RowDataType } from '../../api/endpoints/rows/types/rowData.types.ts'

import { add } from '../../api/endpoints/rows/add.ts'
import { deleteRow } from '../../api/endpoints/rows/delete.ts'
import { COLORS_ENUM_VALUES } from '../../constants.ts'
import { gridRefAtom, selectedRowsAtom } from '../../state/atoms.ts'
import { useGlobalMessage } from '../notifications/useGlobalMessage.ts'
const { Text } = Typography

/**
 * Toolbar component for adding and deleting rows.
 * Uses AG Grid's transaction API for updates.
 */
const RowActionsToolbar = () => {
  const gridRef = useAtomValue(gridRefAtom)
  const selectedRows = useAtomValue(selectedRowsAtom)
  const showMessage = useGlobalMessage()
  const [quickSearch, setQuickSearch] = useState<string>('')

  const handleQuickSearchChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      setQuickSearch(e.currentTarget.value || '')
      gridRef?.api.setGridOption('quickFilterText', e.currentTarget.value)
    },
    [gridRef?.api],
  )
  const addRow = useCallback(
    async (rowData: RowDataType, pos?: null | number) => {
      if (!gridRef?.api) {
        return
      }

      const newRowData = {
        ...rowData,
        id: gridRef.api.getDisplayedRowCount() + 1,
      }

      try {
        // Call API to add row
        const createdRow = await add(newRowData)

        // Use AG Grid transaction to add the row
        gridRef.api.applyTransaction({
          add: [createdRow],
          addIndex: pos,
        })

        showMessage.success({
          content: 'Row added successfully',
        })

        // scroll to added row
        gridRef.api.ensureIndexVisible(pos ?? newRowData.id - 1)
      } catch (error) {
        showMessage.error({
          content: (error as Error).message,
        })
      }
    },
    [gridRef, showMessage],
  )

  const handleAddRow = useCallback(
    (pos?: number) => async () => {
      if (!gridRef?.api) {
        showMessage.error({ content: 'Grid not initialized' })

        return
      }

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
        percentage: faker.number.float({
          fractionDigits: 2,
          max: 100,
          min: 0,
        }),
        referentialID: `RefID ${faker.number.int({
          max: 10,
          min: 1,
        })} - ${faker.number.int({ max: 99, min: 1 })}`,
        valid: faker.datatype.boolean(),
      }
      await addRow(newRowData, pos)
    },
    [addRow, gridRef, showMessage],
  )

  const handleDeleteRows = useCallback(async () => {
    if (!gridRef?.api) {
      showMessage.error({ content: 'Grid not initialized' })

      return
    }

    if (selectedRows.length === 0) {
      showMessage.warning({
        content: 'Please select at least one row to delete',
      })

      return
    }

    try {
      // Get selected rows data
      const selectedRows = gridRef.api.getSelectedRows()

      // Delete from API
      const rowIds = [...selectedRows]
      await Promise.all(rowIds.map(({ id }) => deleteRow(id)))

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
  }, [gridRef, selectedRows, showMessage])

  const handleDuplicateRow = async () => {
    if (!gridRef?.api) {
      return
    }

    const [{ data, rowIndex } = {}] = gridRef.api.getSelectedNodes()

    if (data) {
      await addRow(data, rowIndex ? rowIndex + 1 : 0)
    }
  }

  const menuProps = useMemo(
    () => ({
      items: [
        {
          icon: <VerticalAlignTopOutlined />,
          key: 'addTop',
          label: 'Create row at the top of the grid',
          onClick: handleAddRow(0) as () => void,
        },
      ] as MenuProps['items'],
    }),
    [handleAddRow],
  )

  const deleteButtonTitle =
    selectedRows.length > 0 ? `Delete ${selectedRows.length} row(s)` : undefined
  const duplicateButtonTitle =
    selectedRows.length === 1 ? 'Duplicate selected row' : undefined

  return (
    <Flex align="center" gap={8} style={{ padding: '12px 16px' }}>
      <Space.Compact>
        <Button
          color="primary"
          icon={<PlusOutlined />}
          onClick={handleAddRow()}
        >
          Create
        </Button>
        <Dropdown menu={menuProps} placement="bottomRight">
          <Button icon={<EllipsisOutlined />} iconPlacement="end" />
        </Dropdown>
      </Space.Compact>

      <Tooltip title={duplicateButtonTitle}>
        <Button
          color="primary"
          disabled={selectedRows.length !== 1}
          icon={<CopyOutlined />}
          onClick={handleDuplicateRow}
        >
          Duplicate
        </Button>
      </Tooltip>
      <Tooltip title={deleteButtonTitle}>
        <Button
          color="primary"
          disabled={selectedRows.length === 0}
          icon={<DeleteOutlined />}
          onClick={handleDeleteRows}
        >
          Delete
        </Button>
      </Tooltip>
      <Text className="ml-4 whitespace-nowrap">Search</Text>
      <Input
        onInput={handleQuickSearchChange}
        placeholder="Search something..."
        value={quickSearch}
      />
    </Flex>
  )
}

export { RowActionsToolbar }
