import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Recipes from './components/Recipes.vue'
import RecipeDetail from './components/RecipeDetail.vue'

const routes = [
  { path: '/', component: Recipes },
  {
    path: '/recipe/:id',
    name: 'RecipeDetail',
    component: RecipeDetail,
    props: (route) => ({ id: route.params.id })
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')
