import 'babel-polyfill'
import './plugins/vuetify'
import Vue from 'vue'
import App from './views/App/script'
import router, { links } from './router/app'
import store from './vuex/store'

import VueApollo from 'vue-apollo'
import apolloProvider from './apollo'

import Vuetify from 'vuetify'
import BootstrapVue from 'bootstrap-vue'
import MyComponents from './components/my-components/plugin'

Vue.use(Vuetify)
Vue.use(BootstrapVue)
Vue.use(VueApollo)
Vue.use(MyComponents)


import Notifications from 'vue-notification'
Vue.use(Notifications)

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (!(to.meta.preventScrollTop && from.meta.preventScrollTop)) {
    window.scrollTo(0, 0)
  }
  if (to.meta && to.meta.title) {
    document.title = `${to.meta.title} - La conciergerie florale`
  }
  next()
})

new Vue({
  apolloProvider,
  router,
  render: (h) => h(App),
}).$mount('#app');
