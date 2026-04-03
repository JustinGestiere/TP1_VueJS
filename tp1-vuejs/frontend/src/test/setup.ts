import { vi } from 'vitest'
import { config } from '@vue/test-utils'

// Mock global
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Configuration Vue Test Utils
config.global.stubs = {
  'router-link': true,
  'router-view': true
}
