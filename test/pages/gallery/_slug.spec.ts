import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import slugPage from '~/pages/gallery/_slug.vue'
import { mockContent } from '@hankei6km/jest-mock-nuxt-content'

describe('GallerySlugPage', () => {
  const mockDataImages = [
    {
      id: 'id1',
      title: 'iamge1',
      mainImage: {
        url: '/images/gallery/image1.png',
        size: { width: 800, height: 400 },
      },
      mainImageSize: 'normal',
    },
    {
      id: 'id2',
      title: 'iamge2',
      mainImage: {
        url: '/images/gallery/image2.png',
        size: { width: 800, height: 400 },
      },
      mainImageSize: 'normal',
      content: 'text2',
    },
    {
      id: 'id3',
      title: 'iamge3',
      mainImage: {
        url: '/images/gallery/image3.png',
        size: { width: 800, height: 400 },
      },
      mainImageSize: 'normal',
    },
  ]

  it('should calls $content.fetch() method in asyncData', async () => {
    const content = mockContent()
    const $content = content.$content
    const vm = new Vue(slugPage)
    if (vm.$options.asyncData) {
      // Nuxt のライフサイクルとは厳密には異なる挙動、かな?
      const data = vm.$options.asyncData({
        $content,
        params: { slug: 'id2' },
      } as any)
      expect($content).toHaveBeenLastCalledWith('gallery', 'id2')
      await content.mockResponse(mockDataImages[1])
      expect($content).toHaveBeenLastCalledWith('gallery')
      const galleryChain = await content.mockResponse([
        mockDataImages[0],
        mockDataImages[2],
      ])
      expect(galleryChain.find('sortBy')).toHaveBeenCalledWith('position')
      expect(galleryChain.find('surround')).toHaveBeenCalledWith('id2')
      expect(await data).toEqual({
        image: mockDataImages[1],
        prev: mockDataImages[0],
        next: mockDataImages[2],
      })

      const NuxtImg = {
        name: 'NuxtImg',
        template: '<img></img>',
        props: ['src'],
      }
      const ImageNav = {
        name: 'ImageNav',
        template: '<div></div>',
        props: ['prev', 'next'],
      }
      const mockData = await data
      const wrapper = shallowMount(slugPage, {
        data() {
          return mockData
        },
        stubs: {
          NuxtImg,
          NuxtContent: true,
          ImageNav,
        },
      })
      const img = wrapper.findAllComponents({ name: 'NuxtImg' })
      expect(img.at(0).props()).toHaveProperty(
        'src',
        '/images/gallery/image2.png'
      )
    }
  })

  it('should cyclic prev img', async () => {
    const content = mockContent()
    const $content = content.$content
    const vm = new Vue(slugPage)
    if (vm.$options.asyncData) {
      const data = vm.$options.asyncData({
        $content,
        params: { slug: 'id1' },
      } as any)
      await content.mockResponse(mockDataImages[0])
      await content.mockResponse([null, mockDataImages[1]])

      expect($content).toHaveBeenCalledWith('gallery')
      const countChain = await content.mockResponse([{}, {}, {}])
      expect(countChain.find('only')).toHaveBeenCalledWith([])

      expect($content).toHaveBeenCalledWith('gallery')
      const padChain = await content.mockResponse([mockDataImages[2]])
      expect(padChain.at(0).getMockName()).toEqual('sortBy')
      expect(padChain.at(0)).toHaveBeenCalledWith('position')
      expect(padChain.find('skip')).toHaveBeenCalledWith(2)
      expect(padChain.find('limit')).toHaveBeenCalledWith(1)

      expect(await data).toEqual({
        image: mockDataImages[0],
        prev: mockDataImages[2],
        next: mockDataImages[1],
      })
    }
  })

  it('should cyclic next img', async () => {
    const content = mockContent()
    const $content = content.$content
    const vm = new Vue(slugPage)
    if (vm.$options.asyncData) {
      // https://tech.actindi.net/2019/07/12/083702
      const data = vm.$options.asyncData({
        $content,
        params: { slug: 'id2' },
      } as any)
      await content.mockResponse(mockDataImages[2])
      await content.mockResponse([mockDataImages[1], null])

      const padChain = await content.mockResponse([mockDataImages[0]])
      expect(padChain.at(0).getMockName()).toEqual('sortBy')
      expect(padChain.at(0)).toHaveBeenCalledWith('position')
      expect(padChain.find('limit')).toHaveBeenCalledWith(1)

      expect(await data).toEqual({
        image: mockDataImages[2],
        prev: mockDataImages[1],
        next: mockDataImages[0],
      })
    }
  })
})
