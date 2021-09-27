import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import es from 'vuetify/src/locale/es.ts'

Vue.use(Vuetify);

Vue.component('my-component', {
  methods: {
    changeLocale () {
      this.$vuetify.lang.current = 'es'
    },
  },
})

export default new Vuetify({
    theme: {
      themes: {
        light: {
          background: '#f0f2f2'
        }
      }
    },
    lang: {
      locales: { es },
      current: 'es',
    },
  })
