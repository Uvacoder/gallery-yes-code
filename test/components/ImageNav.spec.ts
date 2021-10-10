import { shallowMount } from '@vue/test-utils'
import ImageNav from '~/components/ImageNav.vue'

describe('ImageNavButton', () => {
  const next = {
    id: 'id1',
    title: 'test1',
    mainImage: {
      url: '/path/to/image1.png',
      size: {
        width: 800,
        height: 400,
      },
      meta: {},
    },
    mainImageSize: 'normal',
  }
  const prev = {
    id: 'id2',
    title: 'test2',
    mainImage: {
      url: '/path/to/image2.png',
      size: {
        width: 800,
        height: 400,
      },
      meta: {},
    },
    mainImageSize: 'normal',
  }
  const ImageNavButton = {
    name: 'ImageNavButton',
    template: '<div/>',
    props: ['dir', 'image', 'alwaysShow'],
  }
  it('should render a component', () => {
    const wrapper = shallowMount(ImageNav, {
      propsData: {
        prev,
        next,
      },
      stubs: {
        ImageNavButton,
        NuxtLink: true,
        fa: true,
      },
    })
    expect(wrapper.vm).toBeTruthy()

    const btns = wrapper.findAllComponents({ name: 'ImageNavButton' })
    expect(btns.at(0).props()).toHaveProperty('dir', 'prev')
    expect(btns.at(0).props()).toHaveProperty('image', prev)
    expect(btns.at(0).props()).toHaveProperty('alwaysShow', undefined)
    expect(btns.at(1).props()).toHaveProperty('dir', 'next')
    expect(btns.at(1).props()).toHaveProperty('image', next)
    expect(btns.at(1).props()).toHaveProperty('alwaysShow', true)
  })
})
