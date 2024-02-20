<template>
  <div v-if="recipe" class="recipe-detail-container">
    <img :src="recipe.strMealThumb" :alt="recipe.strMeal" class="recipe-image" />
    <h2>{{ recipe.strMeal }}</h2>
    <p>{{ recipe.strInstructions }}</p>
  </div>
  <div v-else>
    <p>Laddar receptdetaljer...</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<style>
.recipe-detail-container {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 5px 5px rgb(116, 116, 116);
}

.recipe-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

p {
  padding-bottom: 15px;
}
</style>

<script>
import { ref, onMounted } from 'vue'
import { fetchRecipeById } from '@/api'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const recipe = ref(null)
    const error = ref(null)

    onMounted(async () => {
      try {
        const recipeId = props.id

        if (recipeId) {
          console.log('RecipeDetail - Recipe ID:', recipeId)
          recipe.value = await fetchRecipeById(recipeId)
          console.log('Fetched Recipe:', recipe.value)
        } else {
          console.warn('RecipeDetail - id is undefined')
        }
      } catch (err) {
        error.value = `Error fetching recipe details: ${err.message}`
        console.error(error.value)
      }
    })

    return {
      recipe,
      error
    }
  }
}
</script>
