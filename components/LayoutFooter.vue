<template>
  <footer class="h-48 bg-footer p-2">
    <section class="text-xl text-footer">
      <p>Copyright (c) 2021 hankei6km</p>
      <div class="flex gap-4 mt-2">
        <a href="https://github.com/hankei6km/gallery-yes-code">
          <fa :icon="faGithub" size="lg" />
        </a>
        <a href="https://twitter.com/hankei6km">
          <fa :icon="faTwitter" size="lg" />
        </a>
      </div>
    </section>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'

export default Vue.extend({
  computed: {
    faGithub() {
      return faGithub
    },
    faTwitter() {
      return faTwitter
    },
  },
})
</script>
