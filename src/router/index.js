import Vue from 'vue'
import Router from 'vue-router'
import Latest from '@/components/Latest'
import Single from '@/components/Video'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Latest
    },
    {
      path: '/video/:title',
      component: Single
    }
  ]
})
