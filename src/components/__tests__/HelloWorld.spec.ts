import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HomeViewVue from '@/views/HomeView.vue'

describe('GetStarted', () => {
  it('renders properly', () => {
    const wrapper = mount(HomeViewVue, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('wonJob')
  })
})
