import { http, HttpResponse } from 'msw'

import type { RowDataType } from './types/rowData.types.ts'

import { delay } from '../../util/delay.ts'

/**
 * Mock handlers for adding rows.
 */
export const handlers = [
  http.post('*/api/rows', async ({ request }) => {
    await delay()

    const body = await request.json()

    return HttpResponse.json<RowDataType>(body as RowDataType)
  }),
]
