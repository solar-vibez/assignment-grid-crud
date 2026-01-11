import type { CellValueChangedEvent, ColDef } from 'ag-grid-enterprise'

import { AgGridReact } from 'ag-grid-react'
import { useCallback, useRef } from 'react'

import type { RowDataType } from '../../api/endpoints/rows/types/rowData.types.ts'

import { update } from '../../api/endpoints/rows/update.ts'
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
  const showMessage = useGlobalMessage()

  const onCellValueChanged = useCallback(
    async (event: CellValueChangedEvent<RowDataType>) => {
      // temp solution to avoid double handling on error
      if (event.source === 'edit') {
        try {
          await update(event.data)
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
