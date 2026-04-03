import { describe, it, expect } from 'vitest'
import { cn } from '../utils'

describe('cn utility function', () => {
  it('merges class names correctly', () => {
    const result = cn('px-4', 'py-2', 'bg-blue-500')
    expect(result).toBe('px-4 py-2 bg-blue-500')
  })

  it('handles conditional classes', () => {
    const result = cn('base-class', true && 'active', false && 'inactive')
    expect(result).toBe('base-class active')
  })

  it('removes conflicting Tailwind classes', () => {
    const result = cn('px-4', 'px-8')
    expect(result).toBe('px-8')
  })

  it('handles empty inputs', () => {
    expect(cn()).toBe('')
    expect(cn('', null, undefined)).toBe('')
  })

  it('handles arrays and objects', () => {
    const result = cn(
      ['flex', 'items-center'],
      { 'bg-red-500': true, 'bg-blue-500': false },
      'text-white'
    )
    expect(result).toBe('flex items-center bg-red-500 text-white')
  })
})
