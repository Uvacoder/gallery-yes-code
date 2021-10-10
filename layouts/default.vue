<template>
  <div class="w-full min-h-screen flex flex-col bg-outer">
    <header class="h-24 md:h-48 flex items-center justify-center bg-header">
      <h1 class="text-3xl md:text-6xl font-black text-header">
        <NuxtLink to="/">
          {{ layout.title }}
        </NuxtLink>
      </h1>
    </header>
    <Nuxt class="flex-grow bg-main" />
    <LayoutFooter />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      layout: {},
    }
  },
  async fetch() {
    const { $content } = this.$nuxt.context
    const article = await $content('pages/default').fetch()
    this.layout = article
  },
})
</script>
