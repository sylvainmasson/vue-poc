import Vue from 'vue'
import Router from 'vue-router'
import Post from '@/components/Post'
import Album from '@/components/Album'
import FicheAlbum from '@/components/FicheAlbum'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/post/',
      name: 'Post',
      component: Post
    },
    {
      path: '/albums/',
      name: 'Album',
      component: Album
    },
    {
      path: '/albums/:key',
      name: 'FicheAlbum',
      component: FicheAlbum
    }
  ]
})
