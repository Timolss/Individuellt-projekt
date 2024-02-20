import axios from 'axios'

const mealURL = 'https://www.themealdb.com/api/json/v1/1'

export const fetchRecipes = async () => {
  try {
    const response = await axios.get(`${mealURL}/search.php?s=`)
    console.log('Response from API:', response.data)
    return response.data.meals || []
  } catch (error) {
    console.error('Error fetching recipes:', error)
    return []
  }
}

export const fetchRecipeById = async (id) => {
  try {
    const response = await axios.get(`${mealURL}/lookup.php?i=${id}`)
    return response.data.meals[0]
  } catch (error) {
    console.error('Error fetching recipe by ID:', error)
    return null
  }
}

export const fetchRecipesAll = async () => {
  try {
    const response = await axios.get(`${mealURL}/search.php?s=`)
    return response.data.meals || []
  } catch (error) {
    console.error('Error fetching all recipes:', error)
    return []
  }
}
