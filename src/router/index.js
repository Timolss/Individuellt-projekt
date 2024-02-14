import { createRouter, createWebHistory } from 'vue-router'
import Recipes from '../components/Recipes.vue'
import RecipeDetail from '../components/RecipeDetail.vue'

const routes = [
  { path: '/', component: Recipes },
  { path: '/recipe/:id', name: 'RecipeDetail', component: RecipeDetail }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
