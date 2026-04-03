import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CurriculumSideBar from '../CurriculumSideBar.vue'

// Mock du store avec les vraies données
vi.mock('../../composables/useLessonStore.js', () => ({
  useLessonStore: () => ({
    curriculum: [
      {
        id: 1,
        title: '1. Introduction à Python',
        expanded: true,
        lessons: [
          { id: 11, type: 'doc', title: '1.1 Qu\'est-ce que Python ?', active: true },
          { id: 12, type: 'video', title: '1.2 Installation et Configuration' },
          { id: 13, type: 'quiz', title: '1.3 Quiz d\'introduction' }
        ]
      },
      {
        id: 2,
        title: '2. Les Bases de Python',
        expanded: false,
        lessons: [
          { id: 21, type: 'doc', title: '2.1 Variables et Types de Données' },
          { id: 22, type: 'doc', title: '2.2 Opérateurs Arithmétiques' }
        ]
      }
    ],
    activeLesson: { value: 11 },
    toggleModule: vi.fn(),
    selectLesson: vi.fn(),
    addModule: vi.fn(),
    addLesson: vi.fn()
  })
}))

describe('CurriculumSideBar', () => {
  it('renders module title', () => {
    const wrapper = mount(CurriculumSideBar)
    
    expect(wrapper.text()).toContain('Déroulé du cours')
    expect(wrapper.text()).toContain('Introduction à Python')
  })

  it('renders lessons when module is expanded', () => {
    const wrapper = mount(CurriculumSideBar)
    
    expect(wrapper.text()).toContain('1.1 Qu\'est-ce que Python ?')
    expect(wrapper.text()).toContain('1.2 Installation et Configuration')
  })

  it('displays lesson icons based on type', () => {
    const wrapper = mount(CurriculumSideBar)
    
    // Vérifie que les icônes sont présentes
    const icons = wrapper.findAll('.lucide')
    expect(icons.length).toBeGreaterThan(0)
  })

  it('highlights active lesson', () => {
    const wrapper = mount(CurriculumSideBar)
    const activeLesson = wrapper.find('.lesson-item.active')
    
    expect(activeLesson.exists()).toBe(true)
  })
})
