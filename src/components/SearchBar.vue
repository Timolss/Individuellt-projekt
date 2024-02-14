<!-- SearchBar.vue -->
<template>
  <div>
    <input v-model="searchTerm" @input="emitSearch" placeholder="Sök recept..." />
  </div>
</template>

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

    // Watch for changes in the external modelValue
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
