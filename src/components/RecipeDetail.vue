<template>
  <div>
    <h2>{{ recipe.strMeal }}</h2>
    <p>{{ recipe.strInstructions }}</p>
    <!-- Andra detaljer om receptet -->
  </div>
</template>

<script>
import { fetchRecipeById } from '@/api'

export default {
  data() {
    return {
      recipe: {} // Hämtas från API baserat på route-parametern
    }
  },
  created() {
    const recipeId = this.$route.params.id
    this.fetchRecipeDetails(recipeId)
  },
  methods: {
    async fetchRecipeDetails(id) {
      this.recipe = await fetchRecipeById(id)
    }
  }
}
</script>
