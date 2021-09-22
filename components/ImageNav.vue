<template>
  <nav aria-labelledby="image-navigation">
    <ul
      class="
        mx-auto
        w-full
        max-w-full
        md:max-w-screen-md
        grid grid-cols-5
        gap-1
        md:gap-1
        px-2
      "
    >
      <li class="col-span-1 md:col-span-2">
        <ImageNavButton class="mx-auto" dir="prev" :image="prev" />
      </li>
      <li class="col-span-1">
        <NuxtLink to="/" class="mx-auto">
          <div
            class="
              flex
              h-full
              items-center
              justify-center
              rounded-md
              border-2
              rounded-md
              text-2xl
              md:text-3xl
              px-2
            "
          >
            <div class="w-12 h-12 h-full flex items-center justify-center">
              <fa
                :icon="faHome"
                class="text-gray-500"
                aria-label="ホームへ戻る"
              />
            </div>
          </div>
        </NuxtLink>
      </li>
      <li class="col-span-3 md:col-span-2">
        <ImageNavButton
          class="mx-auto"
          dir="next"
          :image="next"
          :always-show="true"
        />
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import { PropOptions } from 'vue/types/options'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { IContentDocument } from '@nuxt/content/types/content'

export default Vue.extend({
  name: 'ImageNav',

  props: {
    prev: { default: null } as PropOptions<IContentDocument>,
    next: { default: null } as PropOptions<IContentDocument>,
  },
  data() {
    return {
      galleryPath: '/gallery',
    }
  },
  computed: {
    faHome() {
      return faHome
    },
  },
})
</script>

