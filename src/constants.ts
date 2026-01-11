import type { RowDataType } from './api/endpoints/rows/types/rowData.types.ts'

const COLORS_ENUM_VALUES: RowDataType['colorFlag'][] = [
  { text: 'Blue', value: 'FLAG_BLUE' },
  { text: 'Green', value: 'FLAG_GREEN' },
  { text: 'Orange', value: 'FLAG_ORANGE' },
  { text: 'Purple', value: 'FLAG_PURPLE' },
  { text: 'Red', value: 'FLAG_RED' },
  { text: 'Yellow', value: 'FLAG_YELLOW' },
]

const stubFunction = () => {
  // do nothing, for initializing stuff
}

export { COLORS_ENUM_VALUES, stubFunction }
