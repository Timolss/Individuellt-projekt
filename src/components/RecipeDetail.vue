<template>
  <div>
    <h2>{{ recipe.strMeal }}</h2>
    <p>{{ recipe.strInstructions }}</p>
    <!-- Andra detaljer om receptet -->
  </div>
</template>

<script>
import { fetchRecipeById } from '@/api'
import { onMounted, ref } from 'vue'

export default {
  setup() {
    const recipe = ref({}) // Hämtas från API baserat på route-parametern

    onMounted(() => {
      const recipeId = $route.params.id
      fetchRecipeDetails(recipeId)
    })

    const fetchRecipeDetails = async (id) => {
      recipe.value = await fetchRecipeById(id)
    }

    return {
      recipe,
      fetchRecipeDetails
    }
  }
}
</script>
