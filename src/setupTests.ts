import * as matchers from '@testing-library/jest-dom/matchers'
import { expect } from 'vitest'

// add jest-dom matchers to be available for vitest expect
expect.extend(matchers)
