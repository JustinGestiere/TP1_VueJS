import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useLessonStore } from '../useLessonStore.js'

// Mock fetch
global.fetch = vi.fn()

describe('useLessonStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('initializes with default state', () => {
    const store = useLessonStore()
    
    expect(store.curriculum.value).toHaveLength(4)
    expect(store.activeLesson.value).toBe(11)
    expect(store.courseStatus.value).toBe('draft')
  })

  it('toggles module expansion', () => {
    const store = useLessonStore()
    const initialExpanded = store.curriculum.value[0].expanded
    
    store.toggleModule(1)
    expect(store.curriculum.value[0].expanded).toBe(!initialExpanded)
  })

  it('selects lesson and updates content', () => {
    const store = useLessonStore()
    const lesson = { id: 12, title: 'Test Lesson', type: 'doc' }
    
    store.selectLesson(lesson)
    expect(store.activeLesson.value).toBe(12)
    expect(store.lessonTitle.value).toBe('Test Lesson')
  })

  it('adds new module', () => {
    const store = useLessonStore()
    const initialCount = store.curriculum.value.length
    
    store.addModule('New Module')
    expect(store.curriculum.value).toHaveLength(initialCount + 1)
    expect(store.curriculum.value[initialCount].title).toContain('New Module')
  })

  it('saves draft and shows message', () => {
    const store = useLessonStore()
    
    store.saveDraft()
    expect(store.courseStatus.value).toBe('draft')
    expect(store.saveMessage.value).toBe('✓ Saved as draft')
  })
})
