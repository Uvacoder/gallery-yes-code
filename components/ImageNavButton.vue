<template>
  <ToGallery :aria-label="dirLabel" :gallery-id="image.id">
    <div
      class="
        flex
        h-full
        md:h-20
        items-center
        justify-center
        botder-solid
        border-2
        rounded-md
        text-secondary
        px-2
        py-1
        gap-1
      "
    >
      <div
        :class="[
          'md:mx-2',
          'md:inline-block',
          'flex-none',
          'w-12',
          'md:w-16',
          'h-12',
          'md:h-16',
          alwaysShow ? '' : 'hidden',
        ]"
      >
        <NuxtImg
          :src="image.mainImage.url"
          :width="thumbWidth"
          :height="thumbHeight"
          :sizes="thumbSizes"
          :alt="image.title"
          class="object-fit object-cover w-full h-full"
        />
      </div>
      <div
        :class="[
          'md:flex',
          'flex-grow',
          'flex',
          'flex-col',
          'w-3/6',
          'px-1',
          alwaysShow ? '' : 'hidden',
        ]"
      >
        <h3 class="text-md md:text-lg font-medium">{{ dirLabel }}</h3>
        <p
          class="
            mt-1
            text-sm
            md:text-md
            whitespace-nowrap
            overflow-ellipsis overflow-hidden
          "
        >
          {{ image.title }}
        </p>
      </div>
      <div
        :class="[
          'h-full',
          'flex',
          'items-center',
          'justify-center',
          dir === 'next' ? 'order-last' : 'order-first',
        ]"
      >
        <fa :icon="dirIcon" class="text-xl text-secondary" />
      </div>
    </div>
  </ToGallery>
</template>


<script lang="ts">
import Vue from 'vue'
import { PropOptions } from 'vue/types/options'
import { IContentDocument } from '@nuxt/content/types/content'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

type NavDir = 'prev' | 'next'
// サイズを指定しなければ
// 次の画像へ移動したときにサムネイルがキャッシュされているのだが、
// どうしたものかね.
// const sizes = '5rem md:8rem'
const sizes = 'sm:80px md:128px'

export default Vue.extend({
  name: 'ImageNavButton',

  props: {
    dir: { default: 'next' } as PropOptions<NavDir>,
    image: { default: {} } as PropOptions<IContentDocument>,
    alwaysShow: { default: false } as PropOptions<boolean | undefined>,
  },
  computed: {
    dirLabel() {
      if (this.$props.dir === 'prev') {
        return '前の画像'
      }
      return '次の画像'
    },
    dirIcon() {
      if (this.$props.dir === 'prev') {
        return faAngleLeft
      }
      return faAngleRight
    },
    thumbWidth(): number {
      return this.$props.image.mainImage.size.width
    },
    thumbHeight(): number {
      return this.$props.image.mainImage.size.height
    },
    thumbSizes(): string | undefined {
      return sizes
    },
  },
})
</script>