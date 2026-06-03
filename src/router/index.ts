import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { RESORTS } from '@/data/resorts'

const RESORT_SLUGS = new Set(RESORTS.map((r) => r.slug))

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    // honour in-page #anchors, otherwise scroll to top on navigation
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/awards',
      name: 'awards',
      component: () => import('../views/AwardsView.vue'),
    },
    {
      // Dynamic resort detail page. Each slug resolves to its own
      // per-resort component (which feeds the shared ResortDetail).
      path: '/resorts/:slug',
      name: 'resort',
      component: () => import('../views/ResortView.vue'),
      beforeEnter: (to) => {
        const slug = String(to.params.slug)
        return RESORT_SLUGS.has(slug) ? true : { name: 'home' }
      },
    },
  ],
})

export default router
