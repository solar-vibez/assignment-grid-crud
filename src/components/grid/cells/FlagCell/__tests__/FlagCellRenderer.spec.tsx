import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FlagCellRenderer } from '../FlagCellRenderer'

describe('FlagCellRenderer', () => {
  it('renders icon and text for ICON_AND_TEXT displayMode', () => {
    const { container } = render(
      <FlagCellRenderer
        displayMode="ICON_AND_TEXT"
        showNullAs=""
        value={{ text: 'Red', value: 'FLAG_RED' }}
      />,
    )
    expect(screen.getByText('Red')).toBeInTheDocument()
    // Check for FlagOutlined icon
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders only icon for ICON displayMode', () => {
    const { container } = render(
      <FlagCellRenderer
        displayMode="ICON"
        showNullAs=""
        value={{ text: 'Blue', value: 'FLAG_BLUE' }}
      />,
    )
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(screen.queryByText('Blue')).not.toBeInTheDocument()
  })

  it('renders only text for TEXT displayMode', () => {
    const { container } = render(
      <FlagCellRenderer
        displayMode="TEXT"
        showNullAs=""
        value={{ text: 'Green', value: 'FLAG_GREEN' }}
      />,
    )
    expect(screen.getByText('Green')).toBeInTheDocument()
    expect(container.querySelector('svg')).not.toBeInTheDocument()
  })
})
