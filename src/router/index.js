import Vue from 'vue'
import Router from 'vue-router'
import Post from '@/components/Post'
import Album from '@/components/Album'
import FicheAlbum from '@/components/FicheAlbum'
import Home from '@/components/Home'
import PrivateBattles from '@/components/privateBattles'
import PublicBattles from '@/components/publicBattles'
import Callback from '@/components/callback'
import { requireAuth } from '../../utils/auth'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/post/',
      name: 'Post',
      component: Post
    },
    {
      path: '/albums/',
      name: 'Album',
      beforeEnter: requireAuth,
      component: Album
    },
    {
      path: '/albums/:key',
      name: 'FicheAlbum',
      beforeEnter: requireAuth,
      component: FicheAlbum
    },
    {
      path: '/public-battles',
      name: 'PublicBattles',
      component: PublicBattles
    },
    {
      path: '/private-battles',
      name: 'PrivateBattles',
      beforeEnter: requireAuth,
      component: PrivateBattles
    },
    {
      path: '/callback',
      component: Callback
    }
  ]
})
