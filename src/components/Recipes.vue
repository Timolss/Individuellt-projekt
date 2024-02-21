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

<!-- Recipe list styling -->
<style>
body {
  background-color: rgb(238, 219, 201);
}

.recipes-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* center the cards on smaller screens */
  margin: 70px 10px; /* reduce the margin on smaller screens */
}

.recipe-card {
  width: calc(40% - 20px); /* reduce the card width on smaller screens */
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

@media (max-width: 768px) {
  .recipe-card {
    width: calc(50% - 20px); /* adjust card width for screens between 600px and 768px */
  }
}

@media (max-width: 600px) {
  .recipe-card {
    width: calc(100% - 20px); /* full-width cards for screens 600px and below */
  }
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
