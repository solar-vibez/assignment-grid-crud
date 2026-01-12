import type { RowDataType } from './types/rowData.types.ts'

/**
 * Adds a new row to the API.
 * Returns the newly created row with an assigned ID, which is created by current row count + 1
 */
const add = async (newRow: RowDataType): Promise<RowDataType> => {
  const res = await fetch('/api/rows', {
    body: JSON.stringify(newRow),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })

  if (!res.ok) {
    throw new Error(`Failed to add row: ${res.status} ${res.statusText}`)
  }

  return (await res.json()) as RowDataType
}

export { add }
