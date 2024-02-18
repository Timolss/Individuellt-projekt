<!-- Recipes.vue -->
<template>
  <div>
    <!-- Search component -->
    <SearchBar v-model="searchTerm" @search="searchRecipes" />

    <!-- Display filtered recipe list -->
    <div class="recipes-container">
      <router-link
        v-for="recipe in displayedRecipes"
        :key="recipe.idMeal"
        :to="{ name: 'RecipeDetail', params: { id: recipe.idMeal } }"
        class="recipe-card"
      >
        <img :src="recipe.strMealThumb" :alt="recipe.strMeal" class="recipe-image" />
        <span class="recipe-name">{{ recipe.strMeal }}</span>
      </router-link>
    </div>
  </div>
</template>

<style>
body {
  background-color: rgb(238, 219, 201);
}

.recipes-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 70px 170px;
}

.recipe-card {
  width: calc(20% - 20px);
  box-sizing: border-box;
  text-align: center;
  margin: 10px;
  text-decoration: none;
  color: #333;
  background-color: rgb(255, 255, 255);
  padding-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0px 5px 5px rgb(116, 116, 116);
}

.recipe-card img {
  width: 100%;
  max-height: 150px;
  object-fit: cover;
  border-radius: 8px 8px 0px 0px;
}

.recipe-card span {
  display: block;
  margin-top: 8px;
}
</style>

<script>
import SearchBar from './SearchBar.vue'
import { ref, onMounted, reactive, computed } from 'vue'
import { fetchRecipes } from '@/api'

export default {
  components: {
    SearchBar
  },
  setup() {
    const searchTerm = ref('')
    const recipes = reactive([])
    const displayedRecipes = computed(() => {
      if (!searchTerm.value.trim()) {
        return recipes
      }
      return recipes.filter((recipe) =>
        recipe.strMeal.toLowerCase().includes(searchTerm.value.toLowerCase())
      )
    })

    const fetchRecipesData = async () => {
      recipes.splice(0, recipes.length, ...(await fetchRecipes()))
    }

    const searchRecipes = () => {
      console.log('Search term:', searchTerm.value)
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
