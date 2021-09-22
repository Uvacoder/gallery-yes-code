<template>
  <div
    class="
      mx-auto
      gap-2
      px-0
      py-2
      bg-white
      w-full
      flex flex-col-reverse
      lg:flex lg:flex-row-reverse
      lg:max-w-screen-xl
      lg:p-8
      lg:gap-8
    "
  >
    <section>
      <article class="px-2 lg:px-0 max-w-fit lg:max-w-none lg:w-80">
        <nuxt-content
          :document="article"
          class="w-full prose prose-indigo lg:prose-lg max-w-none"
        />
      </article>
    </section>
    <section class="flex-grow mx-auto sm:max-w-full lg:max-w-none">
      <ImageTiles :images="images">
        <template #tile="{ tile }">
          <p class="w-full h-full">
            <ToGallery :gallery-id="tile.id">
              <nuxt-img
                :src="tile.image.src"
                :width="tile.image.width"
                :height="tile.image.height"
                :sizes="tile.image.sizes"
                :alt="tile.image.alt"
                class="
                  h-full
                  w-full
                  object-cover object-center
                  hover:opacity-50
                "
              />
            </ToGallery>
          </p>
        </template>
      </ImageTiles>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ $content }) {
    const article = await $content('pages/home').fetch()
    const images = await $content('gallery').sortBy('position').fetch()
    return { article, images }
  },
})
</script>
