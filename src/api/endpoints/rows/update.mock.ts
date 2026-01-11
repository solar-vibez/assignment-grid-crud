import { http, HttpResponse } from 'msw'

import type { RowDataType } from './types/rowData.types.ts'

import { delay } from '../../util/delay.ts'
/**
 * Mock handler for updating row data.
 */
export const handlers = [
  http.put('*/api/rows/:id', async ({ request }) => {
    await delay()

    const body = await request.json()

    return HttpResponse.json<RowDataType>(body as RowDataType)
  }),
]
