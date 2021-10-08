import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueMeta from 'vue-meta'
import { mockContent } from '@hankei6km/jest-mock-nuxt-content'
import indexPage from '~/pages/index.vue'
import ImageTiles from '~/components/ImageTiles.vue'

const head = require('~/lib/head').head
jest.mock('~/lib/head')
beforeEach(() => {
  head.mockClear()
})

// https://stackoverflow.com/questions/59964001/how-to-test-head-in-nuxt-js-using-jest
// create vue with vue-meta
const localVue = createLocalVue()
localVue.use(VueMeta, { keyName: 'head' })

describe('IndexPage', () => {
  it('should calls $content.fetch() method in asyncData', async () => {
    const content = mockContent()
    const $content = content.$content
    const mockDataArticle = {
      title: 'home',
      description: 'excerpt text',
      mainImage: { url: '/images/ogimage.png' },
    }
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
    const mockDataSiteTitle = {
      title: 'site',
    }

    // aysncData 実行用のインスタンスを作成.
    const localVueAsyncData = createLocalVue()
    localVueAsyncData.use(VueMeta, { keyName: 'head' })
    const wrapperAsyncData = shallowMount(indexPage, {
      localVue: localVueAsyncData,
      mocks: {
        $config: {
          baseURL: 'https://localhost:3000',
        },
        $img: 'dummy img',
      },
      stubs: {
        ToGallery: true,
        NuxtContent: true,
        NuxtImg: true,
        ImageTiles: true,
      },
    })
    if (wrapperAsyncData.vm.$options.asyncData) {
      // Nuxt のライフサイクルとは厳密には異なる挙動、かな?
      const data = wrapperAsyncData.vm.$options.asyncData({
        $content,
        params: {},
      } as any)

      expect($content).toHaveBeenCalledWith('pages/home')
      await content.mockResponse(mockDataArticle)

      expect($content).toHaveBeenCalledWith('gallery')
      const imagesChain = await content.mockResponse(mockDataImages)
      expect(imagesChain.at(0).getMockName()).toEqual('sortBy')
      expect(imagesChain.at(0)).toHaveBeenCalledWith('position')

      expect($content).toHaveBeenCalledWith('pages/default')
      const siteTitleChain = await content.mockResponse(mockDataSiteTitle)
      expect(siteTitleChain.find('only')).toHaveBeenCalledWith(['title'])

      expect(await data).toEqual({
        article: mockDataArticle,
        images: mockDataImages,
        siteTitle: mockDataSiteTitle.title,
        title: mockDataArticle.title,
        description: mockDataArticle.description,
        ogImage: mockDataArticle.mainImage.url,
      })

      const ToGallery = {
        name: 'ToGallery',
        template: '<a></a>',
        props: ['galleryId'],
      }

      // asyncData の戻り値を data とするインスタンスを作成
      const mockData = await data
      const wrapper = shallowMount(indexPage, {
        localVue,
        data() {
          return mockData
        },
        mocks: {
          $config: {
            baseURL: 'https://localhost:3000',
          },
          $img: 'dummy img',
        },
        stubs: {
          ToGallery,
          NuxtContent: true,
          NuxtImg: true,
          ImageTiles,
        },
      })

      expect(head).toHaveBeenCalledWith(
        'site',
        'home',
        'excerpt text',
        '/images/ogimage.png',
        'https://localhost:3000',
        'dummy img'
      )
      const link = wrapper.findAllComponents({ name: 'ToGallery' })
      expect(link.at(0).props()).toHaveProperty('galleryId', 'id1')
      expect(link.at(1).props()).toHaveProperty('galleryId', 'id2')
    }
  })
})
