<template>
  <NuxtLink :to="joinPath(galleryId)">
    <slot />
  </NuxtLink>
</template>

<script lang="ts">
import { join } from 'path'
import Vue from 'vue'
import { PropOptions } from 'vue/types/options'

export default Vue.extend({
  name: 'ToGallery',

  props: {
    galleryPath: { default: '/gallery' } as PropOptions<string>,
    galleryId: { default: '' } as PropOptions<string>,
  },
  methods: {
    joinPath(id: string) {
      // if (id) {
      //   return join(this.$props.galleryPath, id)
      // }
      // return ''
      return join(this.$props.galleryPath, id)
    },
  },
})
</script>