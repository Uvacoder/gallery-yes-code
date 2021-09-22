import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import { mockContent } from '@hankei6km/jest-mock-nuxt-content'
import indexPage from '~/pages/index.vue'
import ImageTiles from '~/components/ImageTiles.vue'

describe('IndexPage', () => {
  it('should calls $content.fetch() method in asyncData', async () => {
    const content = mockContent()
    const $content = content.$content
    const mockDataArticle = { title: 'home' }
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
      },
    ]
    const vm = new Vue(indexPage)
    if (vm.$options.asyncData) {
      // Nuxt のライフサイクルとは厳密には異なる挙動、かな?
      const data = vm.$options.asyncData({ $content, params: {} } as any)
      expect($content).toHaveBeenLastCalledWith('pages/home')
      await content.mockResponse(mockDataArticle)

      expect($content).toHaveBeenLastCalledWith('gallery')
      const imagesChain = await content.mockResponse(mockDataImages)
      expect(imagesChain.at(0).getMockName()).toEqual('sortBy')
      expect(imagesChain.at(0)).toHaveBeenCalledWith('position')

      expect(await data).toEqual({
        article: mockDataArticle,
        images: mockDataImages,
      })

      const ToGallery = {
        name: 'ToGallery',
        template: '<a></a>',
        props: ['galleryId'],
      }
      const mockData = await data
      const wrapper = shallowMount(indexPage, {
        data() {
          return mockData
        },
        stubs: {
          ToGallery,
          NuxtContent: true,
          NuxtImg: true,
          ImageTiles,
        },
      })

      const link = wrapper.findAllComponents({ name: 'ToGallery' })
      expect(link.at(0).props()).toHaveProperty('galleryId', 'id1')
      expect(link.at(1).props()).toHaveProperty('galleryId', 'id2')
    }
  })
})
