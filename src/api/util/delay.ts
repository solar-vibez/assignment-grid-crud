// Shared delay utility for MSW mocks
export const MIN_RANDOM_DELAY_MS = 150
export const MAX_RANDOM_DELAY_MS = 450

/**
 * Returns a promise that resolves after a random delay.
 * Used to simulate network latency in MSW mocks.
 */
export const delay = () => {
  const timeout =
    Math.floor(
      // eslint-disable-next-line sonarjs/pseudo-random
      Math.random() * (MAX_RANDOM_DELAY_MS - MIN_RANDOM_DELAY_MS + 1),
    ) + MIN_RANDOM_DELAY_MS

  return new Promise<void>((resolve) => setTimeout(resolve, timeout))
}
