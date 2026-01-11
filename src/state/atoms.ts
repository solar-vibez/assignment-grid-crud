import type { AgGridReact } from 'ag-grid-react'

import { atom } from 'jotai'
import { loadable } from 'jotai/utils'

import type { ApiColDef } from '../api/endpoints/column-definitions/types/colDef.types'
import type { RowDataType } from '../api/endpoints/rows/types/rowData.types'

import { getAll as getColumnDefs } from '../api/endpoints/column-definitions/getAll'
import { getAll as getRows } from '../api/endpoints/rows/getAll'

/*
 * Atoms that load data asynchronously from the mocked API endpoints.
 */
export const columnDefsAtom = atom(async () => getColumnDefs())
export const rowsAtom = atom(async () => getRows())

type GridData = {
  columnDefs: ApiColDef[]
  rows: RowDataType[]
}

/**
 * Load both column definitions and rows in parallel and expose as a loadable atom
 * This replaces the previous `dataAtom` to avoid duplicating the rows in multiple atoms.
 */
export const loadableDataAtom = loadable(
  atom(async (get) => {
    const [columnDefs, rows] = await Promise.all([
      get(columnDefsAtom),
      get(rowsAtom),
    ])

    return {
      columnDefs,
      rows,
    } as GridData
  }),
)

/**
 * Atom to manage selected rows
 */
export const selectedRowsAtom = atom<RowDataType[]>([])

export const selectedRowAtom = atom((get) => {
  const selectedRows = get(selectedRowsAtom)

  if (selectedRows.length === 1) {
    return selectedRows[0]
  }

  return null
})

export const selectedDescriptionAtom = atom((get) => {
  return get(selectedRowAtom)?.description ?? ''
})
/**
 * Atom to hold AG Grid reference (the AgGridReact instance) so other components can use the grid API
 */
export const gridRefAtom = atom<AgGridReact<RowDataType> | null>(null)
