import type { RowDataType } from './types/rowData.types.ts'

/**
 * Updates row data, pushes new row to API
 * returns API response in JSON format
 */
const update = async (updatedRow: RowDataType): Promise<unknown> => {
  const { id } = updatedRow
  const res = await fetch(`/api/rows/${id}`, {
    body: JSON.stringify({ ...updatedRow }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  })

  if (!res.ok) {
    throw new Error(`Failed to update row: ${res.status} ${res.statusText}`)
  }

  // for debugging purposes
  // eslint-disable-next-line no-console
  console.debug(`requested row update (id=${id}):`, updatedRow)

  return await res.json()
}

export { update }
