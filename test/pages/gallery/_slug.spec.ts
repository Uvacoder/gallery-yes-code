import Vue from 'vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueMeta from 'vue-meta'
import slugPage from '~/pages/gallery/_slug.vue'
import { mockContent } from '@hankei6km/jest-mock-nuxt-content'

const head = require('~/lib/head').head
jest.mock('~/lib/head')
beforeEach(() => {
  head.mockClear()
})

// https://stackoverflow.com/questions/59964001/how-to-test-head-in-nuxt-js-using-jest
// create vue with vue-meta
const localVue = createLocalVue()
localVue.use(VueMeta, { keyName: 'head' })

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
      description: 'excerpt text2',
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
    {
      id: 'id4',
      title: 'iamge4',
      mainImage: {
        url: '/images/gallery/image4.png',
        size: { width: 800, height: 400 },
      },
      'og:description': 'exceprt text4 in og:description',
      mainImageSize: 'normal',
    },
  ]
  const mockDataSiteTitle = {
    title: 'site',
  }

  it('should calls $content.fetch() method in asyncData', async () => {
    const content = mockContent()
    const $content = content.$content

    // aysncData 実行用のインスタンスを作成.
    const localVueAsyncData = createLocalVue()
    localVueAsyncData.use(VueMeta, { keyName: 'head' })
    const wrapperAsyncData = shallowMount(slugPage, {
      localVue: localVueAsyncData,
      mocks: {
        $config: {
          baseURL: 'https://localhost:3000',
        },
        $img: 'dummy img',
      },
      stubs: {
        NuxtImg: true,
        NuxtContent: true,
        ImageNav: true,
      },
    })
    if (wrapperAsyncData.vm.$options.asyncData) {
      // Nuxt のライフサイクルとは厳密には異なる挙動、かな?
      const data = wrapperAsyncData.vm.$options.asyncData({
        $content,
        params: { slug: 'id2' },
      } as any)

      expect($content).toHaveBeenCalledWith('gallery', 'id2')
      await content.mockResponse(mockDataImages[1])

      expect($content).toHaveBeenCalledWith('gallery')
      const galleryChain = await content.mockResponse([
        mockDataImages[0],
        mockDataImages[2],
      ])
      expect(galleryChain.find('sortBy')).toHaveBeenCalledWith('position')
      expect(galleryChain.find('surround')).toHaveBeenCalledWith('id2')

      expect($content).toHaveBeenCalledWith('pages/default')
      const siteTitleChain = await content.mockResponse(mockDataSiteTitle)
      expect(siteTitleChain.find('only')).toHaveBeenCalledWith(['title'])

      expect(await data).toEqual({
        image: mockDataImages[1],
        prev: mockDataImages[0],
        next: mockDataImages[2],
        siteTitle: mockDataSiteTitle.title,
        title: mockDataImages[1].title,
        description: mockDataImages[1].description,
        ogImage: mockDataImages[1].mainImage.url,
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
          NuxtImg,
          NuxtContent: true,
          ImageNav,
        },
      })

      expect(head).toHaveBeenCalledWith(
        'site',
        'iamge2',
        'excerpt text2',
        '/images/gallery/image2.png',
        'https://localhost:3000',
        'dummy img'
      )
      const img = wrapper.findAllComponents({ name: 'NuxtImg' })
      expect(img.at(0).props()).toHaveProperty(
        'src',
        '/images/gallery/image2.png'
      )
    }
  })

  it('should setiup head by og:description', async () => {
    const content = mockContent()
    const $content = content.$content
    const vm = new Vue(slugPage)
    if (vm.$options.asyncData) {
      // https://tech.actindi.net/2019/07/12/083702
      const data = vm.$options.asyncData({
        $content,
        params: { slug: 'id4' },
      } as any)
      await content.mockResponse(mockDataImages[3])
      await content.mockResponse([mockDataImages[1], null])

      await content.mockResponse([mockDataImages[0]])
      await content.mockResponse(mockDataSiteTitle)

      const mockData = await data
      const wrapper = shallowMount(slugPage, {
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
          NuxtImg: true,
          NuxtContent: true,
          ImageNav: true,
        },
      })

      expect(head).toHaveBeenCalledWith(
        'site',
        'iamge4',
        'exceprt text4 in og:description',
        '/images/gallery/image4.png',
        'https://localhost:3000',
        'dummy img'
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

      expect($content).toHaveBeenCalledWith('pages/default')
      await content.mockResponse(mockDataSiteTitle)

      expect(await data).toEqual({
        image: mockDataImages[0],
        prev: mockDataImages[2],
        next: mockDataImages[1],
        siteTitle: mockDataSiteTitle.title,
        title: mockDataImages[0].title,
        description: '',
        ogImage: mockDataImages[0].mainImage.url,
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

      expect($content).toHaveBeenCalledWith('pages/default')
      await content.mockResponse(mockDataSiteTitle)

      expect(await data).toEqual({
        image: mockDataImages[2],
        prev: mockDataImages[1],
        next: mockDataImages[0],
        siteTitle: mockDataSiteTitle.title,
        title: mockDataImages[2].title,
        description: '',
        ogImage: mockDataImages[2].mainImage.url,
      })
    }
  })
})
