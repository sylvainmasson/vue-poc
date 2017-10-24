import Vue from 'vue'
import VueFire from 'vuefire'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Table from '@/components/Table'
import Album from '@/components/Album'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
Vue.use(VueResource)
Vue.use(VueFire)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/table/',
      name: 'Table',
      component: Table
    },
    {
      path: '/albums/',
      name: 'Album',
      component: Album
    }
  ]
})
