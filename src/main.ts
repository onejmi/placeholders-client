import Vue from 'vue'
import App from './App.vue'
import VueCompositionApi from '@vue/composition-api'
import router from './router'
import vuetify from './plugins/vuetify'
import GAuth from 'vue-google-oauth2'

Vue.config.productionTip = false

Vue.use(VueCompositionApi)

const GAuthOptions = {
  clientId: '130579102697-jga0139h5eqkscf6fptn2jppercepm73.apps.googleusercontent.com',
  scope: 'email profile openid',
  prompt: 'consent'
}

Vue.use(GAuth, GAuthOptions)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
