import { mount } from '@vue/test-utils'
import ImageTile from '~/components/ImageTile.vue'

describe('ImageTile', () => {
  it('should img has setuped', () => {
    const wrapper = mount(ImageTile, {
      propsData: {
        image: {
          title: 'test',
          mainImage: {
            url: '/path/to/image.png',
            size: {
              width: 800,
              height: 400,
            },
            meta: {},
          },
          mainImageSize: 'normal',
        },
      },
    })
    expect(wrapper.vm).toBeTruthy()
    const img = wrapper.find('li > img')
    expect(img.attributes()).toHaveProperty('alt', 'test')
    expect(img.attributes()).toHaveProperty('src', '/path/to/image.png')
    expect(img.attributes()).toHaveProperty('width', '350')
    expect(img.attributes()).toHaveProperty('height', '175')
  })
  it('should img has setuped without size', () => {
    const wrapper = mount(ImageTile, {
      propsData: {
        image: {
          title: 'test',
          mainImage: {
            url: '/path/to/image.png',
            size: [
              {
                width: 800,
                height: 400,
              },
              {
                width: 1600,
                height: 800,
              },
            ],
            meta: {},
          },
          mainImageSize: 'normal',
        },
      },
    })
    expect(wrapper.vm).toBeTruthy()
    const img = wrapper.find('li > img')
    expect(img.attributes()).toHaveProperty('alt', 'test')
    expect(img.attributes()).toHaveProperty('src', '/path/to/image.png')
    expect(img.attributes()).not.toHaveProperty('width')
    expect(img.attributes()).not.toHaveProperty('height')
  })
  it('should avoid multi-size', () => {
    const wrapper = mount(ImageTile, {
      propsData: {
        image: {
          title: 'test',
          mainImage: {
            url: '/path/to/image.png',
            size: {},
            meta: {},
          },
          mainImageSize: 'normal',
        },
      },
    })
    expect(wrapper.vm).toBeTruthy()
    const img = wrapper.find('li > img')
    expect(img.attributes()).toHaveProperty('alt', 'test')
    expect(img.attributes()).toHaveProperty('src', '/path/to/image.png')
    expect(img.attributes()).not.toHaveProperty('width')
    expect(img.attributes()).not.toHaveProperty('height')
  })
  it('should col === 1 and row === 1', () => {
    const wrapper = mount(ImageTile, {
      propsData: {
        image: {
          title: 'test',
          mainImage: {
            url: '/path/to/image.png',
            size: {
              width: 800,
              height: 400,
            },
            meta: {},
          },
          mainImageSize: 'normal',
        },
      },
    })
    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.classes()).toEqual(['col-span-1', 'row-span-1'])
  })
  it('should col === 1 and row === 1 with size is blank', () => {
    const wrapper = mount(ImageTile, {
      propsData: {
        image: {
          title: 'test',
          mainImage: {
            url: '/path/to/image.png',
            size: {},
            meta: {},
          },
          mainImageSize: 'normal',
        },
      },
    })
    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.classes()).toEqual(['col-span-1', 'row-span-1'])
  })
  it('should col === 1 and row === 1 with image-info not exist', () => {
    const wrapper = mount(ImageTile, {
      propsData: {
        image: {
          title: 'test',
          mainImage: {
            url: '/path/to/image.png',
          },
          mainImageSize: 'normal',
        },
      },
    })
    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.classes()).toEqual(['col-span-1', 'row-span-1'])
  })
  it('should col === 2 and row === 2', () => {
    const wrapper = mount(ImageTile, {
      propsData: {
        image: {
          title: 'test',
          mainImage: {
            url: '/path/to/image.png',
            size: {
              width: 800,
              height: 400,
            },
            meta: {},
          },
          mainImageSize: 'large',
        },
      },
    })
    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.classes()).toEqual(['col-span-2', 'row-span-2'])
  })
  it('should col === 2 and row === 1', () => {
    const wrapper = mount(ImageTile, {
      propsData: {
        image: {
          title: 'test',
          mainImage: {
            url: '/path/to/image.png',
            size: {
              width: 400,
              height: 800,
            },
            meta: {},
          },
          mainImageSize: 'normal',
        },
      },
    })
    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.classes()).toEqual(['col-span-1', 'row-span-2'])
  })
  it('should render slot contant', () => {
    const wrapper = mount(ImageTile, {
      propsData: {
        image: {
          id: 'idstring',
          title: 'test',
          mainImage: {
            url: '/path/to/image.png',
            size: {
              width: 800,
              height: 400,
            },
            meta: {},
          },
          mainImageSize: 'normal',
        },
      },
      scopedSlots: {
        tile: '<div><a :href="props.tile.id"><img :alt="props.tile.image.alt" :src="props.tile.image.src" :width="props.tile.image.width" :height="props.tile.image.height" /></a></div>',
      },
    })
    expect(wrapper.vm).toBeTruthy()
    const a = wrapper.find('li > div > a')
    expect(a.attributes()).toHaveProperty('href', 'idstring')
    const img = wrapper.find('li > div > a > img')
    expect(img.attributes()).toHaveProperty('alt', 'test')
    expect(img.attributes()).toHaveProperty('src', '/path/to/image.png')
    expect(img.attributes()).toHaveProperty('width', '350')
    expect(img.attributes()).toHaveProperty('height', '175')
  })
})
