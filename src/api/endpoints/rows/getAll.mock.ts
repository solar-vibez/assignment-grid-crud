import { http, HttpResponse } from 'msw'

import type { RowDataType } from './types/rowData.types.ts'

import { delay } from '../../util/delay.ts'
import { generateRowsMock } from './generateRows'

/**
 * Mock handler for fetching row data.
 */
export const handlers = [
  http.get('*/api/rows', async () => {
    await delay()

    return HttpResponse.json<RowDataType[]>(generateRowsMock(50))
  }),
]
