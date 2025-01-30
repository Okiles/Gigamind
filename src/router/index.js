import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { inject } from 'vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/game',
    name: 'game',
    component: () => import('../views/GameView.vue'),
  },
  {
    path: '/stats',
    name: 'stats',
    component: () => import('../views/StatsView.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const app = inject('pseudo');
  const pseudo = app.pseudo;

  if (pseudo === '' && to.name !== 'home') {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;
