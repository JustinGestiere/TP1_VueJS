import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from '../Input.vue'

describe('Input Component', () => {
  it('renders input element', () => {
    const wrapper = mount(Input)
    const input = wrapper.find('input')
    
    expect(input.exists()).toBe(true)
    expect(input.classes()).toContain('flex')
  })

  it('applies custom class', () => {
    const wrapper = mount(Input, {
      props: { class: 'w-full' }
    })
    
    expect(wrapper.find('input').classes()).toContain('w-full')
  })

  it('supports v-model binding', async () => {
    const wrapper = mount(Input)
    const input = wrapper.find('input')
    
    await input.setValue('test value')
    expect(input.element.value).toBe('test value')
  })

  it('passes through attributes', () => {
    const wrapper = mount(Input, {
      attrs: {
        placeholder: 'Enter text',
        type: 'email'
      }
    })
    
    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('Enter text')
    expect(input.attributes('type')).toBe('email')
  })

  it('has proper styling classes', () => {
    const wrapper = mount(Input)
    const input = wrapper.find('input')
    
    expect(input.classes()).toContain('h-10')
    expect(input.classes()).toContain('w-full')
    expect(input.classes()).toContain('rounded-md')
  })
})
