import { join } from 'path'
import { head } from '~/lib/head'

describe('head()', () => {
  const basePath = '/base/'
  const $img = jest.fn()
  beforeEach(() => {
    $img.mockReset().mockImplementation((p: string) => {
      return join(basePath, p)
    })
  })

  it('should return meta info that has been filled each items', () => {
    expect(
      head(
        'site',
        'title',
        'excerpt text',
        '/images/test.png',
        'http://localhost:3000',
        $img
      )
    ).toEqual({
      title: 'title - site',
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: 'title - site',
        },
        {
          hid: 'description',
          name: 'description',
          content: 'excerpt text',
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: 'excerpt text',
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: `http://localhost:3000/base/images/test.png`,
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
      ],
    })
  })

  it('should avoid blank items', () => {
    expect(
      head('site', 'title', '', '', 'http://localhost:3000', $img)
    ).toEqual({
      title: 'title - site',
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: 'title - site',
        },
      ],
    })
  })
})
