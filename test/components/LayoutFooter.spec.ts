import { shallowMount } from '@vue/test-utils'
import LayoutFooter from '~/components/LayoutFooter.vue'
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'

describe('LayoutFooter', () => {
  it('should tiles has setuped', () => {
    const fa = { name: 'fa', template: '<div/>', props: ['icon'] }
    const wrapper = shallowMount(LayoutFooter, {
      stubs: {
        fa,
      },
    })
    expect(wrapper.vm).toBeTruthy()
    const links = wrapper.findAll('a')
    expect(links.at(0).attributes()).toHaveProperty(
      'href',
      'https://github.com/hankei6km/gallery-yes-code'
    )
    expect(links.at(1).attributes()).toHaveProperty(
      'href',
      'https://twitter.com/hankei6km'
    )
    const icons = wrapper.findAllComponents({ name: 'fa' })
    expect(icons.at(0).props()).toHaveProperty('icon', faGithub)
    expect(icons.at(1).props()).toHaveProperty('icon', faTwitter)
  })
})
