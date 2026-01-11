import type {
  CellValueChangedEvent,
  ColDef,
  RowSelectedEvent,
} from 'ag-grid-enterprise'

import { AgGridReact } from 'ag-grid-react'
import { useSetAtom } from 'jotai'
import { useCallback, useEffect, useRef } from 'react'

import type { RowDataType } from '../../api/endpoints/rows/types/rowData.types.ts'

import { update } from '../../api/endpoints/rows/update.ts'
import { gridRefAtom, selectedRowIdsAtom } from '../../state/atoms.ts'
import { useGlobalMessage } from '../notifications/useGlobalMessage.ts'
import { agGridBaseTheme } from './aggrid.ts'

type Props = {
  columnDefs?: ColDef<RowDataType>[]
  rowData?: RowDataType[]
}

/**
 * Displays row data in a grid using AG-Grid.
 */
const MainGrid = ({ columnDefs = [], rowData = [] }: Readonly<Props>) => {
  const gridRef = useRef<AgGridReact<RowDataType>>(null)
  const setGridRef = useSetAtom(gridRefAtom)
  const setSelectedRowIds = useSetAtom(selectedRowIdsAtom)
  const showMessage = useGlobalMessage()

  // Expose gridRef to atoms for use by other components
  useEffect(() => {
    if (gridRef.current) {
      setGridRef(gridRef.current)
    }
  }, [setGridRef])

  const onCellValueChanged = useCallback(
    async (event: CellValueChangedEvent<RowDataType>) => {
      // temp solution to avoid double handling on error
      if (event.source === 'edit') {
        try {
          await update(event.data)
          showMessage.success({
            content: 'Row updated successfully',
          })
        } catch (error) {
          showMessage.error({
            content: (error as Error).message,
          })

          gridRef.current?.api.undoCellEditing()
        }
      }
    },
    [showMessage],
  )

  const onRowSelected = useCallback(
    (_event: RowSelectedEvent<RowDataType>) => {
      const selectedRows = gridRef.current?.api.getSelectedRows() ?? []
      const selectedIds = new Set(selectedRows.map((row) => row.id))
      setSelectedRowIds(selectedIds)
    },
    [setSelectedRowIds],
  )

  return (
    <AgGridReact<RowDataType>
      cellSelection={{
        enableHeaderHighlight: true,
        handle: { mode: 'fill', suppressClearOnFillReduction: true },
        suppressMultiRanges: true,
      }}
      className="maingrid"
      columnDefs={columnDefs}
      enableBrowserTooltips={true}
      enableFilterHandlers={true}
      gridId={'main-grid'}
      onCellValueChanged={onCellValueChanged}
      onRowSelected={onRowSelected}
      ref={gridRef}
      rowData={rowData}
      rowDragEntireRow={false}
      rowDragManaged={false}
      rowDragMultiRow={true}
      rowNumbers={true}
      rowSelection={{
        checkboxes: false,
        enableClickSelection: true,
        headerCheckbox: false,
        mode: 'multiRow',
      }}
      theme={agGridBaseTheme}
      tooltipShowMode="whenTruncated"
      treeData={false}
      undoRedoCellEditing={true}
    />
  )
}

export { MainGrid }
