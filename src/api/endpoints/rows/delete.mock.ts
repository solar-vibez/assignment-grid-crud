import { http, HttpResponse } from 'msw'

import { delay } from '../../util/delay.ts'

/**
 * Mock handlers for deleting rows.
 */
export const handlers = [
  http.delete('*/api/rows/:id', async () => {
    await delay()

    return HttpResponse.json({ success: true })
  }),
]
