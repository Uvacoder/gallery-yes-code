/**
 * @jest-environment node
 */

// jsdom だと ReferenceError: setImmediate is not defined になる.

import { get, setupTest } from '@nuxt/test-utils'

describe('ssr:index page', () => {
  setupTest({
    config: {
      content: {
        dir: 'test/fixture/content',
      },
    },
    server: true,
    setupTimeout: 120000,
  })

  it('renders the index page', async () => {
    const { body } = await get('/')

    expect(body).toContain('test - Gallery Yes Code')
  })
})
