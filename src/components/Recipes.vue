<!-- Recipes.vue -->
<template>
  <div>
    <!-- Search component -->
    <SearchBar v-model="searchTerm" @search="searchRecipes" />

    <!-- Display filtered recipe list -->
    <div v-for="recipe in displayedRecipes" :key="recipe.idMeal">
      <router-link :to="{ name: 'RecipeDetail', params: { id: recipe.idMeal } }">
        {{ recipe.strMeal }}
      </router-link>
    </div>
  </div>
</template>

<script>
import SearchBar from './SearchBar.vue'
import { ref, onMounted } from 'vue'
import { fetchRecipes } from '@/api'

export default {
  components: {
    SearchBar
  },
  setup() {
    const searchTerm = ref('')
    const recipes = ref([])
    const displayedRecipes = ref([])

    const fetchRecipesData = async () => {
      recipes.value = await fetchRecipes()
      displayedRecipes.value = recipes.value
    }

    const searchRecipes = () => {
      console.log('Search term:', searchTerm.value)

      if (searchTerm.value.trim() !== '') {
        // Filter recipes based on the search term
        displayedRecipes.value = recipes.value.filter((recipe) =>
          recipe.strMeal.toLowerCase().includes(searchTerm.value.toLowerCase())
        )
        console.log('Filtered recipes:', displayedRecipes.value)
      } else {
        // If the search term is empty, show all recipes
        displayedRecipes.value = recipes.value
      }

      console.log('Updated recipes:', displayedRecipes.value)
    }

    onMounted(() => {
      fetchRecipesData()
    })

    return {
      searchTerm,
      displayedRecipes,
      searchRecipes
    }
  }
}
</script>
