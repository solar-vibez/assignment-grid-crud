import { faker } from '@faker-js/faker'

import type { RowDataType } from './types/rowData.types'

import { COLORS_ENUM_VALUES } from '../../../constants.ts'

/**
 * Generates an array of mock row data.
 */
const generateRowsMock = (count: number): RowDataType[] =>
  Array.from({ length: count }, (_, i) => {
    const colorFlag = faker.helpers.arrayElement(COLORS_ENUM_VALUES)

    return {
      colorFlag: colorFlag,
      customValues: {
        '3700': faker.lorem.words(2),
        '3701': faker.number.float({ fractionDigits: 2, max: 100, min: 0 }),
      },
      description: faker.lorem.sentence(),
      document: faker.number.int({ max: 999, min: 100 }),
      id: i + 1,
      metaData: {
        nonEditableFields: {
          'component\\Example': ['PERCENTAGE'],
        },
        nonEditableFieldsReason: {},
        notAllowedActions: {},
      },
      percentage: faker.number.float({ fractionDigits: 2, max: 100, min: 0 }),
      referentialID: `RefID ${faker.number.int({
        max: 10,
        min: 1,
      })} - ${faker.number.int({ max: 99, min: 1 })}`,
      valid: faker.datatype.boolean(),
    }
  })

export { generateRowsMock }
