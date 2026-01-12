import type { PropsWithChildren } from 'react'

import { useHydrateAtoms } from 'jotai/utils'

import type { AtomInitialValueTuple } from '../testUtils.tsx'

export type HydrateAtomsWrapperProps = PropsWithChildren<{
  initialValues: AtomInitialValueTuple<unknown>[]
}>

/**
 * A wrapper component that hydrates Jotai atoms with initial values.
 *
 * @param initialValues - The initial values for the Jotai atoms.
 * @param children - The child components to render.
 * @returns The rendered children.
 */
const HydrateAtomsWrapper = ({
  children,
  initialValues,
}: HydrateAtomsWrapperProps) => {
  useHydrateAtoms(initialValues)

  return children
}

export { HydrateAtomsWrapper }
