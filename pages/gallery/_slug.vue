<template>
  <div
    class="
      w-full
      h-full
      mx-auto
      flex flex-col
      items-center
      gap-2
      px-0
      py-2
      lg:p-8
      lg:gap-8
      lg:max-w-screen-xl
      bg-white
    "
  >
    <section v-if="image" class="flex-grow w-full">
      <article class="mx-auto flex flex-col gap-4 items-center max-w-fit">
        <h2 class="text-2xl md:text-4xl font-black text-primary">
          {{ image.title }}
        </h2>
        <p class="order-first">
          <NuxtImg
            :src="image.mainImage.url"
            :width="image.mainImage.size.width"
            :height="image.mainImage.size.height"
            :alt="image.title"
            fit="cover"
          />
        </p>
        <NuxtContent
          :document="image"
          class="px-2 lg:px-0 prose prose-indigo lg:prose-lg"
        />
      </article>
    </section>
    <section class="max-w-screen-sm w-full">
      <ImageNav class="mt-4 w-full" :prev="prev" :next="next" />
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { contentFunc, IContentDocument } from '@nuxt/content/types/content'
import MetaInfo from 'vue-meta'
import { head } from '~/lib/head'

const sortedGallery = ($content: contentFunc) =>
  $content('gallery').sortBy('position')

export default Vue.extend({
  async asyncData({ $content, params }) {
    const image: IContentDocument = (await $content(
      'gallery',
      params.slug
    ).fetch()) as IContentDocument
    const sorted = sortedGallery($content)
    let [prev, next] = (await sorted.surround(params.slug).fetch()) as [
      IContentDocument,
      IContentDocument
    ]
    const sortLimit = $content('gallery').sortBy('position').limit(1)
    if (prev === null) {
      // https://github.com/nuxt/content/issues/378
      const cnt = (await $content('gallery').only([]).fetch()).length
      prev = (
        (await sortLimit
          .sortBy('position')
          .skip(cnt - 1)
          .fetch()) as [IContentDocument]
      )[0] // このページを表示しているなら 1 件はあるはず.
    }
    if (next === null) {
      // next = ((await sortLimit.fetch()) as [IContentDocument])[0] // このページを表示しているなら 1 件はあるはず.
      next = (
        (await sortedGallery($content).limit(1).fetch()) as [IContentDocument]
      )[0] // このページを表示しているなら 1 件はあるはず.
    }
    const { title: siteTitle }: IContentDocument = (await $content(
      'pages/default'
    )
      .only(['title'])
      .fetch()) as IContentDocument
    return {
      image,
      prev,
      next,
      siteTitle,
      title: image.title || '',
      description: image.description || '',
      ogImage: image.mainImage?.url || '',
    }
  },
  data() {
    return {
      siteTitle: '',
      title: '',
      description: '',
      ogImage: '',
    }
  },
  head(): MetaInfo {
    return head(
      this.siteTitle,
      this.title,
      this.description,
      this.ogImage,
      this.$config.baseURL,
      this.$img
    )
  },
})
</script>

