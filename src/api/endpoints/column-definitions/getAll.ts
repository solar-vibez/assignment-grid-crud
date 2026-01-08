import type { ApiColDef } from './types/colDef.types.ts'

/**
 * Fetches all column definitions from the API.
 * Unlike row data, this is not randomly generated so it will be consistent across calls.
 *
 * See the README.md file for more information.
 */
const getAll = async (): Promise<ApiColDef[]> => {
  const res = await fetch('/api/column-definitions', { method: 'GET' })

  if (!res.ok) {
    throw new Error(
      `Failed to fetch column definitions: ${res.status} ${res.statusText}`,
    )
  }

  return (await res.json()) as ApiColDef[]
}

export { getAll }
