import type { ICellRendererParams } from 'ag-grid-community'

import { FlagOutlined } from '@ant-design/icons'
import { Space, Typography } from 'antd'
import type {
  ColorFlag,
  RowDataType,
} from '../../../../api/endpoints/rows/types/rowData.types.ts'
import type { ColDefEnumDisplayMode } from '../../../../api/endpoints/column-definitions/types/colDefRendererContext.types.ts'

const { Text } = Typography

const COLOR_MAP: Record<string, string> = {
  FLAG_BLUE: '#2f54eb',
  FLAG_GREEN: '#52c41a',
  FLAG_ORANGE: '#fa8c16',
  FLAG_PURPLE: '#722ed1',
  FLAG_RED: '#ff4d4f',
  FLAG_YELLOW: '#fadb14',
}

/**
 * React cell renderer for enum-style color flags.
 * Renders based on displayMode from the renderer context:
 * - ICON: Shows only the colored flag icon
 * - ICON_AND_TEXT: Shows the colored flag icon with text label
 * - TEXT: Shows only the text label (uncolored)
 */
const FlagCellRenderer = ({
  value,
  colDef,
}: Readonly<ICellRendererParams<RowDataType, ColorFlag>>) => {
  if (!value) {
    return null
  }

  const color = COLOR_MAP[value.value] ?? '#d9d9d9'
  const displayMode: ColDefEnumDisplayMode =
    colDef?.context?.rendererContext?.displayMode ?? 'ICON_AND_TEXT'
  const nullPlaceholder = colDef?.context?.rendererContext?.showNullAs ?? ''

  return (
    <Space align="center">
      {!value && nullPlaceholder} {<Text>{nullPlaceholder}</Text>}
      {value && displayMode.includes('ICON') && (
        <FlagOutlined style={{ color }} />
      )}
      {value && displayMode.includes('TEXT') && <Text>{value.text}</Text>}
    </Space>
  )
}

export { FlagCellRenderer }
