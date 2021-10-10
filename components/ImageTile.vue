<template>
  <li :class="span">
    <slot
      name="tile"
      :tile="{
        id: image.id,
        image: {
          src: image.mainImage.url,
          // v-bind の中では Optional Chaining 使えない?
          width: thumbWidth,
          height: thumbHeight,
          sizes: thumbSizes,
          alt: image.title,
        },
      }"
    >
      <img
        :src="image.mainImage.url"
        :width="thumbWidth"
        :height="thumbHeight"
        :alt="image.title"
        class="h-full w-full object-cover object-center"
      />
    </slot>
  </li>
</template>

<script  lang="ts">
import { IContentDocument } from '@nuxt/content/types/content'
// import Vue, { PropOptions } from 'vue'
// yarn lin t時の "PropOptions not found in 'vue'" 対応.
import Vue from 'vue'
import { PropOptions } from 'vue/types/options'

// TODO: 算出方法を定型化させる.
// パラメーターが index.vue や tailwind.config.js に分散しているので
// もう少しまとめること.
// TODO: nuxt-image での dpr 指定方法も調べる.
//
// md まではだいたい 2 カラム(50vw).
// lg 以降は max-w-screen-xl が指定されていて固定サイズとなる.
// content 分の幅を引いたものから 2 or 3 カラムを想定.
// (lg - w-80) / 2 = (1024 - 16 * 20) / 2 = 352
// (xl - w-80) / 3 = (1280 - 16 * 20) / 3 = 320
const sizes = 'sm:50vw md:50vw lg:350px xl:320px'
// const sizesLarge = 'sm:100vw lg:700px xl:640px' // col-span-2 用
// 600px を超えたあたりから dpr が 2 以上のデバイスで粗が目立つので、
// 今回は指定なし.
const sizesLarge = undefined
// 基準(デフォルト)となるサイズ.
const baseWidth = 350
const baseWidthLarge = 800 // AppSheet の MEDIUM 設定を想定.

export default Vue.extend({
  name: 'ImageTile',

  props: {
    image: { default: {} } as PropOptions<IContentDocument>,
  },
  computed: {
    span(): [string, string] {
      if (this.image.mainImageSize === 'large') {
        return ['col-span-2', 'row-span-2']
      } else if (this.image.mainImage?.size) {
        if (
          this.image.mainImage.size.width > this.image.mainImage.size.height
        ) {
          return ['col-span-1', 'row-span-1']
        } else if (
          this.image.mainImage.size.width < this.image.mainImage.size.height
        ) {
          return ['col-span-1', 'row-span-2']
        }
      }
      return ['col-span-1', 'row-span-1']
    },
    thumbWidth(): number | undefined {
      if (
        this.$props.image.mainImage?.size?.width !== undefined &&
        this.$props.image.mainImage?.size?.height !== undefined
      ) {
        return this.image.mainImageSize === 'large' ? baseWidthLarge : baseWidth
      }
      return undefined
    },
    thumbHeight(): number | undefined {
      if (
        this.$props.image.mainImage?.size?.width !== undefined &&
        this.$props.image.mainImage?.size?.height !== undefined
      ) {
        const w =
          this.image.mainImageSize === 'large' ? baseWidthLarge : baseWidth
        return Math.round(
          (w * this.$props.image.mainImage.size.height) /
            this.$props.image.mainImage.size.width
        )
      }
      return undefined
    },
    thumbSizes(): string | undefined {
      if (
        this.$props.image.mainImage?.size?.width !== undefined &&
        this.$props.image.mainImage?.size?.height !== undefined
      ) {
        return this.image.mainImageSize === 'large' ? sizesLarge : sizes
      }
      return undefined
    },
  },
})
</script>

