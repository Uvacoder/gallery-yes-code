import { shallowMount } from '@vue/test-utils'
import ToGallery from '~/components/ToGallery.vue'

describe('ToGallery', () => {
  const NuxtLink = {
    name: 'NuxtLink',
    template: '<a/>',
    props: ['event', 'to'],
  }
  it('should tiles has setuped', () => {
    const wrapper = shallowMount(ToGallery, {
      propsData: {
        galleryId: 'abc123',
      },
      stubs: {
        NuxtLink,
      },
    })
    expect(wrapper.vm).toBeTruthy()
    const link = wrapper.findComponent({ name: 'NuxtLink' })
    expect(link.props()).toHaveProperty('to', '/gallery/abc123/')
  })
})
