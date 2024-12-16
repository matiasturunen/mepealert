// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  app: {
    head: {
      link: [
        { href: 'https://api.mapbox.com/mapbox-gl-js/v3.8.0/mapbox-gl.css', rel: 'stylesheet' },
        { href: 'styles.css', rel: 'stylesheet' }
      ],
      script: [
        { src: 'https://api.mapbox.com/mapbox-gl-js/v3.8.0/mapbox-gl.js', async: false },
        { src: 'https://code.jquery.com/jquery-3.7.1.min.js', async: false, integrity: 'sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=', crossorigin: 'anonymous' }
      ]
    }
  },

  modules: ['@nuxt/image']
})