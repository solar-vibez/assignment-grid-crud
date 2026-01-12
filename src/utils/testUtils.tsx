import type { PrimitiveAtom } from 'jotai'
import type { ReactElement } from 'react'

import { render } from '@testing-library/react'

import { HydrateAtomsWrapper } from './test/HydrateAtomsWrapper.tsx'

export type AtomInitialValueTuple<T> = [PrimitiveAtom<T>, T]

export type RenderWithAtomsOptions = {
  // Jotai types are not well exported, so we will make our life easier by using `any`.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValues: AtomInitialValueTuple<any>[]
}

/**
 * Renders a React component with Jotai atoms for testing purposes.
 *
 * @param component - The React component to render.
 * @param options - The render options including the initial atom values.
 * @returns The render result from `@testing-library/react`.
 */
export const renderWithAtoms = (
  component: ReactElement,
  options: RenderWithAtomsOptions,
) => {
  return render(
    <HydrateAtomsWrapper initialValues={options.initialValues}>
      {component}
    </HydrateAtomsWrapper>,
  )
}
