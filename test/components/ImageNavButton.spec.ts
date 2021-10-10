import { shallowMount } from '@vue/test-utils'
import ImageNavButton from '~/components/ImageNavButton.vue'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

describe('ImageNavButton', () => {
  const image = {
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
  const ToGallery = {
    name: 'ToGallery',
    template: '<a><slot/></a>',
    props: ['galleryId'],
  }
  const NuxtImg = {
    name: 'NuxtImg',
    template: '<img/>',
    props: ['src', 'width', 'height', 'alt'],
  }
  const fa = {
    name: 'fa',
    template: '<svg/>',
    props: ['icon'],
  }
  it('should render a component', () => {
    const wrapper = shallowMount(ImageNavButton, {
      propsData: {
        dir: 'next',
        image,
        alwaysShow: true,
      },
      stubs: {
        ToGallery,
        NuxtImg,
        fa,
      },
    })
    expect(wrapper.vm).toBeTruthy()
    const link = wrapper.findComponent({ name: 'ToGallery' })
    expect(link.props()).toHaveProperty('galleryId', 'id1')

    const img = wrapper.findComponent({ name: 'NuxtImg' })
    expect(img.props()).toHaveProperty('src', image.mainImage.url)
    expect(img.props()).toHaveProperty('width', image.mainImage.size.width)
    expect(img.props()).toHaveProperty('height', image.mainImage.size.height)
    expect(img.props()).toHaveProperty('alt', image.title)

    const label = wrapper.find('h3')
    expect(label.text()).toEqual('次の画像')

    const outers = wrapper.findAll('div > div')
    expect(outers.at(0).classes()).not.toContain('hidden')
    expect(outers.at(1).classes()).not.toContain('hidden')

    const icon = wrapper.findComponent({ name: 'fa' })
    expect(icon.props()).toHaveProperty('icon', faAngleRight)
  })
  it('should render alwaysShow = false', () => {
    const wrapper = shallowMount(ImageNavButton, {
      propsData: {
        dir: 'next',
        image,
      },
      stubs: {
        ToGallery,
        NuxtImg,
        fa,
      },
    })
    expect(wrapper.vm).toBeTruthy()

    const outers = wrapper.findAll('div > div')
    expect(outers.at(0).classes()).toContain('hidden')
    expect(outers.at(1).classes()).toContain('hidden')
  })
  it('should render dir = prev', () => {
    const wrapper = shallowMount(ImageNavButton, {
      propsData: {
        dir: 'prev',
        image,
      },
      stubs: {
        ToGallery,
        NuxtImg,
        fa,
      },
    })
    expect(wrapper.vm).toBeTruthy()

    const label = wrapper.find('h3')
    expect(label.text()).toEqual('前の画像')

    const icon = wrapper.findComponent({ name: 'fa' })
    expect(icon.props()).toHaveProperty('icon', faAngleLeft)
  })
})
