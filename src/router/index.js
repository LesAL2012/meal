import { createRouter, createWebHistory } from 'vue-router';
import {ROUTES_PATH} from '@/constants';
import Home from '../pages/Home.vue';
import Meal from '../pages/Meal.vue';
import MealRandom from '../pages/MealRandom.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES_PATH.HOME,
      name: ROUTES_PATH.HOME,
      component: Home
    },
    {
      path: ROUTES_PATH.MEAL,
      name: ROUTES_PATH.MEAL,
      component: Meal
    },
    {
      path: ROUTES_PATH.MEAL_RANDOM,
      name: ROUTES_PATH.MEAL_RANDOM,
      component: MealRandom
    },
    
  ]
})

export default router
