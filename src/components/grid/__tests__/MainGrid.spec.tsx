import { render, screen } from '@testing-library/react'
import { Provider } from 'jotai'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { ApiColDef } from '../../../api/endpoints/column-definitions/types/colDef.types.ts'
import type { RowDataType } from '../../../api/endpoints/rows/types/rowData.types.ts'

import { mapApiToAgColDefs } from '../../../utils/mapper/colDefMapper.ts'
import { MainGrid } from '../MainGrid'

vi.mock('../../notifications/useGlobalMessage.ts', () => ({
  useGlobalMessage: () => ({
    error: vi.fn(),
    success: vi.fn(),
  }),
}))

const mockRowData: RowDataType[] = [
  {
    colorFlag: { text: 'Blue', value: 'FLAG_BLUE' },
    customValues: { '3700': 'cattus supplanto', '3701': 76.06 },
    description: 'Test description',
    document: 810,
    id: 1,
    metaData: {
      nonEditableFields: {},
      nonEditableFieldsReason: {},
      notAllowedActions: {},
    },
    percentage: 97.66,
    referentialID: 'RefID Test',
    valid: true,
  },
]

const apiColDefs: ApiColDef[] = [
  {
    colId: String.raw`component\Example\REFERENTIAL_ID`,
    context: {
      appliesTo: [],
      canModify: 'ALWAYS',
      dataType: 'STRING',
      editorContext: {
        trimmed: true,
        type: 'string',
        unique: false,
      },
      fieldReference: {
        category: String.raw`component\Example`,
        name: 'REFERENTIAL_ID',
      },
      filterType: 'TEXT',
      index: 2,
      rendererContext: null,
      requiresCustomHandling: false,
      treePath: [2],
      type: 'column',
      validationContext: {
        maxLength: 255,
        minLength: 0,
        type: 'string',
      },
    },

    field: 'referentialID',
    headerName: 'Referential ID',
    headerTooltip: 'Referential ID',
    initialHide: false,
    type: 'column',
  },
  {
    colId: String.raw`component\Example\DESCRIPTION`,
    context: {
      appliesTo: [],
      canModify: 'ALWAYS',
      dataType: 'STRING',
      editorContext: {
        trimmed: true,
        type: 'string',
        unique: false,
      },
      fieldReference: {
        category: String.raw`component\\Example`,
        name: 'DESCRIPTION',
      },
      filterType: 'TEXT',
      index: 3,
      rendererContext: null,
      requiresCustomHandling: false,
      treePath: [3],
      type: 'column',
      validationContext: {
        maxLength: 255,
        minLength: 0,
        type: 'string',
      },
    },

    field: 'description',
    headerName: 'Description',
    headerTooltip: 'Description',
    initialHide: false,
    type: 'column',
  },
]

const mockColumnDefs = mapApiToAgColDefs(apiColDefs)
describe('MainGrid component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders ag-grid component with provided row and column data', async () => {
    render(
      <Provider>
        <MainGrid columnDefs={mockColumnDefs} rowData={mockRowData} />
      </Provider>,
    )

    // wait until grid is loaded
    expect(
      await screen.findByRole('columnheader', { name: 'Referential ID' }),
    ).toBeInTheDocument()

    const [refId, description] = screen.getAllByRole('gridcell')
    expect(refId).toHaveTextContent('RefID Test')
    expect(description).toHaveTextContent('Test description')
  })

  it('renders with message when no data provided', async () => {
    render(
      <Provider>
        <MainGrid columnDefs={mockColumnDefs} rowData={[]} />
      </Provider>,
    )

    // wait until grid is loaded
    expect(
      await screen.findByRole('columnheader', { name: 'Referential ID' }),
    ).toBeInTheDocument()

    expect(screen.getByText('No Rows To Show')).toBeInTheDocument()
  })
})
