<template>
  <nuxt-img class="banner-img" :src="banner" />
</template>

<style>

.banner-img {
  width: 100%;
  height: auto;
}

</style>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  page: 'string'
})

const alertBanner = '/mepealert_banner.png'
const generatorBanner = '/mepegenerator_banner.png'

const banner = computed(() => {
  if (props.page == 'generator') return generatorBanner;
  return alertBanner;
})

</script>
 