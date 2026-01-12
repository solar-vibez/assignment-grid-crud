import { render, screen } from '@testing-library/react'
import { Provider } from 'jotai'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { selectedRowsAtom } from '../../../state/atoms.ts'
import { renderWithAtoms } from '../../../utils/testUtils.tsx'
import { Details } from '../Details'

const successMock = vi.fn()
const errorMock = vi.fn()

vi.mock('../../../api/endpoints/rows/update.ts', () => ({
  update: vi.fn(),
}))

vi.mock('../../notifications/useGlobalMessage.ts', () => ({
  useGlobalMessage: () => ({
    error: errorMock,
    success: successMock,
  }),
}))

const mockSelectedRow = {
  colorFlag: { text: 'Red', value: 'FLAG_RED' },
  customValues: {},
  description: 'Original description',
  document: 100,
  id: 1,
  metaData: {
    nonEditableFields: {},
    nonEditableFieldsReason: {},
    notAllowedActions: {},
  },
  percentage: 25.5,
  referentialID: 'REF-1',
  valid: true,
}

describe('Details component', () => {
  beforeEach(() => {
    globalThis.ResizeObserver = class MockedResizeObserver {
      disconnect = vi.fn()

      observe = vi.fn()

      unobserve = vi.fn()
    }

    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders message when no row is selected', () => {
    render(
      <Provider>
        <Details />
      </Provider>,
    )

    expect(screen.getByText('Single row must be selected')).toBeInTheDocument()
  })

  it('renders message when more than one row is selected', () => {
    renderWithAtoms(<Details />, {
      initialValues: [[selectedRowsAtom, [mockSelectedRow, mockSelectedRow]]],
    })

    expect(screen.getByText('Single row must be selected')).toBeInTheDocument()
  })
})
