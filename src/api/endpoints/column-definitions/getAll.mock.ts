import { http, HttpResponse } from 'msw'

import type { ApiColDef } from './types/colDef.types.ts'

import { delay } from '../../util/delay.ts'

/**
 * Mocked handler for the GET /api/column-definitions endpoint.
 */
export const handlers = [
  http.get('*/api/column-definitions', async () => {
    await delay()

    return HttpResponse.json<ApiColDef[]>(columnDefinitions)
  }),
]

/**
 * Example column definitions returned by the mocked endpoint.
 */
const columnDefinitions: ApiColDef[] = [
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
  {
    colId: String.raw`component\Example\PERCENTAGE`,
    context: {
      appliesTo: [],
      canModify: 'CONDITIONAL',
      dataType: 'PERCENTAGE',
      editorContext: {
        commitBlankBehaviour: 'NOT_ALLOWED',
        type: 'percentage',
      },
      fieldReference: {
        category: String.raw`component\\Example`,
        name: 'PERCENTAGE',
      },
      filterType: 'DOUBLE',
      index: 5,
      rendererContext: null,
      requiresCustomHandling: false,
      treePath: [5],
      type: 'column',
      validationContext: {
        allowNull: false,
        constraintLowerBoundField: '',
        constraintUpperBoundField: '',
        inclusive: false,
        maxValue: 1.797_693_134_862_315_7e+308,
        minValue: -1.797_693_134_862_315_7e+308,
        type: 'percentage',
      },
    },

    field: 'percentage',
    headerName: 'Percentage',
    headerTooltip: 'Percentage',
    initialHide: false,
    type: 'column',
  },
  {
    colId: String.raw`component\Example\COLORFLAG`,
    context: {
      appliesTo: [],
      canModify: 'ALWAYS',
      dataType: 'COLOR_FLAG',
      editorContext: {
        colDefs: [
          {
            colId: 'iconCol',
            context: {
              appliesTo: [],
              canModify: 'NEVER',
              dataType: 'ICON_NAME',
              editorContext: null,
              fieldReference: null,
              filterType: 'TEXT',
              index: 1,
              rendererContext: {
                category: 'ColorFlag',
                type: 'iconName',
              },
              requiresCustomHandling: false,
              treePath: [],
              type: 'column',
              validationContext: null,
            },
            field: 'value',
            headerName: '',
            headerTooltip: '',
            initialHide: false,
            type: 'column',
          },
          {
            colId: 'valueCol',
            context: {
              appliesTo: [],
              canModify: 'NEVER',
              dataType: 'STRING',
              editorContext: null,
              fieldReference: null,
              filterType: null,
              index: 2,
              rendererContext: null,
              requiresCustomHandling: false,
              treePath: [],
              type: 'column',
              validationContext: null,
            },
            field: 'text',
            headerName: 'Flag',
            headerTooltip: '',
            initialHide: false,
            type: 'column',
          },
        ],
        type: 'enum',
      },
      fieldReference: {
        category: String.raw`component\\Example`,
        name: 'COLORFLAG',
      },
      filterType: 'ENUM',
      index: 26,
      rendererContext: {
        displayMode: 'ICON_AND_TEXT',
        showNullAs: '',
        type: 'enum',
      },
      requiresCustomHandling: false,
      treePath: [26],
      type: 'column',
      validationContext: {
        allowNull: true,
        type: 'enum',
      },
    },

    field: 'colorFlag',
    headerName: 'Flag',
    headerTooltip: 'Flag',
    initialHide: false,
    type: 'column',
  },
  {
    colId: String.raw`component\\Example\\VALID`,
    context: {
      appliesTo: [],
      canModify: 'NEVER',
      dataType: 'BOOLEAN',
      editorContext: null,
      fieldReference: {
        category: String.raw`component\\Example`,
        name: 'VALID',
      },
      filterType: 'BOOLEAN',
      index: 29,
      rendererContext: null,
      requiresCustomHandling: false,
      treePath: [29],
      type: 'column',
      validationContext: null,
    },

    field: 'valid',
    headerName: 'Valid',
    headerTooltip: 'Valid',
    initialHide: false,
    type: 'column',
  },
  {
    colId: String.raw`custom\example-component\stringfield`,
    context: {
      appliesTo: [],
      canModify: 'ALWAYS',
      dataType: 'CUSTOM_FIELD_STRING',
      editorContext: {
        trimmed: true,
        type: 'string',
        unique: false,
      },
      fieldReference: {
        category: String.raw`custom\example-component`,
        name: 'stringfield',
      },
      filterType: 'TEXT',
      index: 44,
      rendererContext: null,
      requiresCustomHandling: false,
      treePath: [44],
      type: 'column',
      validationContext: {
        maxLength: 255,
        minLength: 0,
        type: 'string',
      },
    },

    field: 'customValues.3700',
    headerName: 'Custom text field',
    headerTooltip: 'Custom text field',
    initialHide: true,
    type: 'column',
  },
  {
    colId: String.raw`custom\example-component\doublefield`,
    context: {
      appliesTo: [],
      canModify: 'ALWAYS',
      dataType: 'CUSTOM_FIELD_DOUBLE',
      editorContext: {
        commitBlankBehaviour: 'NOT_ALLOWED',
        type: 'double',
      },
      fieldReference: {
        category: String.raw`custom\example-component`,
        name: 'doublefield',
      },
      filterType: 'DOUBLE',
      index: 45,
      rendererContext: null,
      requiresCustomHandling: false,
      treePath: [45],
      type: 'column',
      validationContext: {
        allowNull: false,
        constraintLowerBoundField: '',
        constraintUpperBoundField: '',
        inclusive: false,
        maxValue: 1.797_693_134_862_315_7e+308,
        minValue: -1.797_693_134_862_315_7e+308,
        type: 'double',
      },
    },

    field: 'customValues.3701',
    headerName: 'Custom decimal field',
    headerTooltip: 'Custom decimal field',
    initialHide: true,
    type: 'column',
  },
]
