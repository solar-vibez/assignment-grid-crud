import type { RowDataType } from './types/rowData.types.ts'

/**
 * Fetches all row data from the API.
 * Will be randomly generated, so data may differ between calls.
 */
const getAll = async (): Promise<RowDataType[]> => {
  const res = await fetch('/api/rows', { method: 'GET' })

  if (!res.ok) {
    throw new Error(`Failed to fetch rows: ${res.status} ${res.statusText}`)
  }

  return (await res.json()) as RowDataType[]
}

export { getAll }
