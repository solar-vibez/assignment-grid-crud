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
  rows: RowDataType[]
  columnDefs: ApiColDef[]
}
/**
 * Atom that loads data in parallel and saves it into state
 */
export const dataAtom = atom<Promise<GridData>>(async (get) => {
  const [columnDefs, rows] = await Promise.all([
    get(columnDefsAtom),
    get(rowsAtom),
  ])
  return {
    rows,
    columnDefs,
  }
})

// wrap with `loadable` to be able to react to the loading state changes
export const loadableDataAtom = loadable(dataAtom)
