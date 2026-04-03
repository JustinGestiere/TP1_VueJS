import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../Button.vue'

describe('Button Component', () => {
  it('renders with default props', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me'
      }
    })
    
    expect(wrapper.text()).toBe('Click me')
    expect(wrapper.classes()).toContain('inline-flex')
  })

  it('applies variant classes correctly', () => {
    const wrapper = mount(Button, {
      props: { variant: 'destructive' },
      slots: { default: 'Delete' }
    })
    
    expect(wrapper.classes()).toContain('bg-destructive')
  })

  it('applies size classes correctly', () => {
    const wrapper = mount(Button, {
      props: { size: 'lg' },
      slots: { default: 'Large' }
    })
    
    expect(wrapper.classes()).toContain('h-11')
  })

  it('emits click event', async () => {
    const wrapper = mount(Button, {
      slots: { default: 'Click me' }
    })
    
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('supports custom class', () => {
    const wrapper = mount(Button, {
      props: { class: 'custom-class' },
      slots: { default: 'Custom' }
    })
    
    expect(wrapper.classes()).toContain('custom-class')
  })
})
