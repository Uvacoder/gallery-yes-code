import { shallowMount } from '@vue/test-utils'
import ImageTiles from '~/components/ImageTiles.vue'
import ImageTile from '~/components/ImageTile.vue'

describe('ImageTiles', () => {
  const images = [
    {
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
    },
    {
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
      mainImageSize: 'large',
    },
    {
      id: 'id3',
      title: 'test3',
      mainImage: {
        url: '/path/to/image3.png',
        size: {
          width: 400,
          height: 800,
        },
        meta: {},
      },
      mainImageSize: 'normal',
    },
  ]

  it('should tiles has setuped', () => {
    const wrapper = shallowMount(ImageTiles, {
      propsData: { images },
      stubs: {
        ImageTile: ImageTile,
      },
    })
    expect(wrapper.vm).toBeTruthy()
    const tiles = wrapper.findAll('li')
    expect(tiles.length).toEqual(3)
    expect(tiles.at(0).classes()).toContain('col-span-1')
    expect(tiles.at(0).classes()).toContain('row-span-1')
    expect(tiles.at(1).classes()).toContain('col-span-2')
    expect(tiles.at(1).classes()).toContain('row-span-2')
    expect(tiles.at(2).classes()).toContain('col-span-1')
    expect(tiles.at(2).classes()).toContain('row-span-2')
  })

  it('should slots has setuped', () => {
    const wrapper = shallowMount(ImageTiles, {
      propsData: { images },
      stubs: {
        ImageTile: ImageTile,
      },
      scopedSlots: {
        tile: '<div><a :href="props.tile.id"><img :alt="props.tile.image.alt" :src="props.tile.image.src" :width="props.tile.image.width" :height="props.tile.image.height" /></a></div>',
      },
    })
    expect(wrapper.vm).toBeTruthy()
    const links = wrapper.findAll('a')
    expect(links.length).toEqual(3)
    expect(links.at(0).attributes()).toHaveProperty('href', 'id1')
    expect(links.at(1).attributes()).toHaveProperty('href', 'id2')
    expect(links.at(2).attributes()).toHaveProperty('href', 'id3')
    const imgs = wrapper.findAll('img')
    expect(imgs.length).toEqual(3)
    expect(imgs.at(0).attributes()).toHaveProperty('alt', 'test1')
    expect(imgs.at(0).attributes()).toHaveProperty('src', '/path/to/image1.png')
    expect(imgs.at(0).attributes()).toHaveProperty('width', '350')
    expect(imgs.at(0).attributes()).toHaveProperty('height', '175')
    expect(imgs.at(1).attributes()).toHaveProperty('alt', 'test2')
    expect(imgs.at(1).attributes()).toHaveProperty('src', '/path/to/image2.png')
    expect(imgs.at(1).attributes()).toHaveProperty('width', '800')
    expect(imgs.at(1).attributes()).toHaveProperty('height', '400')
    expect(imgs.at(2).attributes()).toHaveProperty('alt', 'test3')
    expect(imgs.at(2).attributes()).toHaveProperty('src', '/path/to/image3.png')
    expect(imgs.at(2).attributes()).toHaveProperty('width', '350')
    expect(imgs.at(2).attributes()).toHaveProperty('height', '700')
  })
})
