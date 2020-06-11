import Vue from 'vue'
import App from './App.vue'
import VueCompositionApi from '@vue/composition-api'
import router from './router'
import vuetify from './plugins/vuetify'
import GAuth from 'vue-google-oauth2'
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false

Vue.use(VueCompositionApi)

const GAuthOptions = {
  clientId: '130579102697-jga0139h5eqkscf6fptn2jppercepm73.apps.googleusercontent.com',
  scope: 'email profile openid https://www.googleapis.com/auth/youtube',
  prompt: 'consent'
}

Vue.use(GAuth, GAuthOptions)
Vue.use(VueCookies)

// eslint-disable-next-line
// @ts-ignore
Vue.$cookies.config('14d')

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
