<template>
  <nuxt-img class="banner-img" :src="bannerpath" />
</template>

<style>

.banner-img {
  width: 100%;
  height: auto;
}

</style>

<script>
export default {
  data: () => {
    return {
      bannerpath: '/mepealert_banner.png'
    }
  },
  mounted: function () {
    const path = this.$route.path;
    let page = path.replace('/', '');
    if (page == '') {
      page = 'alert';
    }
    this.bannerpath = '/mepe' + page + '_banner.png';
  }
}
</script>
