<template>
  <div class="search-container">
    <input
      v-model="searchTerm"
      @input="emitSearch"
      placeholder="Sök recept..."
      class="search-input"
    />
  </div>
</template>

<style>
.search-container {
  display: flex;
  justify-content: center;
  margin-top: 20px; /* Lägg till margin mot toppen */
}

.search-input {
  width: 300px;
  padding: 8px;
  font-size: 16px;
}
</style>

<script>
import { ref, watch } from 'vue'

export default {
  props: {
    modelValue: String
  },
  setup(props, { emit }) {
    const searchTerm = ref(props.modelValue)

    const emitSearch = () => {
      emit('update:modelValue', searchTerm.value)
      emit('search', searchTerm.value)
    }

    watch(
      () => props.modelValue,
      (newValue) => {
        searchTerm.value = newValue
      }
    )

    return {
      searchTerm,
      emitSearch
    }
  }
}
</script>
