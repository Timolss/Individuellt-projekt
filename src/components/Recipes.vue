<template>
  <div>
    <!-- Sökkomponent -->
    <SearchBar v-model="searchTerm" @search="searchRecipes" />

    <!-- Visa receptlista -->
    <div v-for="recipe in filteredRecipes" :key="recipe.idMeal">
      <router-link :to="{ name: 'RecipeDetail', params: { id: recipe.idMeal } }">
        {{ recipe.strMeal }}
      </router-link>
    </div>
  </div>
</template>

<script>
import SearchBar from './SearchBar.vue'
import { fetchRecipes } from '@/api'

export default {
  components: {
    SearchBar
  },
  data() {
    return {
      searchTerm: '',
      recipes: [] // Hämtas från API
    }
  },
  computed: {
    filteredRecipes() {
      return this.recipes.filter((recipe) =>
        recipe.strMeal.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    }
  },
  methods: {
    async searchRecipes() {
      this.recipes = await fetchRecipes()
    }
  }
}
</script>
