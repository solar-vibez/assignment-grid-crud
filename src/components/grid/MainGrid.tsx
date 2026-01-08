import type { ColDef } from 'ag-grid-enterprise'

import { AgGridReact } from 'ag-grid-react'
import { useRef } from 'react'

import type { RowDataType } from '../../api/endpoints/rows/types/rowData.types.ts'

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
