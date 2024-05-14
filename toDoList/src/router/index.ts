import { createRouter, createWebHistory } from 'vue-router'
import MyTasksView from '../views/MyTasksView.vue'
import InProgress from '../views/InProgress.vue'
import CompletedViews from '../views/CompletedViews.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      redirect:'/MyTasks'
    },
    {
      path: '/MyTasks',
      name: 'MyTasks',
      component: MyTasksView
    },
    {
      path: '/InProgress',
      name: 'InProgress',
      component: InProgress
    },
    {
      path: '/Completed',
      name: 'Completed',
      component: CompletedViews
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
