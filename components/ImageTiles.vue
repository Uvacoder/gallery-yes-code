<template>
  <ul
    class="
      grid grid-cols-gallery-small
      sm:grid-cols-gallery
      auto-rows-gallery-small
      sm:auto-rows-gallery
      grid-flow-row-dense
      gap-1
    "
  >
    <ImageTile v-for="i in images" :key="i.id" :image="i">
      <template #tile="{ tile }">
        <slot name="tile" :tile="tile" />
        <!--<div>{{tile }}</div>-->
      </template>
    </ImageTile>
  </ul>
</template>

<script  lang="ts">
import { IContentDocument } from '@nuxt/content/types/content'
import Vue from 'vue'
import { PropOptions } from 'vue/types/options'
import ImageTile from './ImageTile.vue'

export default Vue.extend({
  name: 'ImageTiles',
  components: {
    ImageTile,
  },
  props: {
    images: {} as PropOptions<IContentDocument[]>,
  },
})
</script>
