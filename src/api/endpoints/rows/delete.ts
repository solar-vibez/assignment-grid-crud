/**
 * Deletes a row from the API.
 */
const deleteRow = async (id: number): Promise<void> => {
  const res = await fetch(`/api/rows/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error(`Failed to delete row: ${res.status} ${res.statusText}`)
  }
}

export { deleteRow }
