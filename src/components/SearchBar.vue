<template>
  <div>
    <input v-model="searchTerm" @input="emitSearch" placeholder="Sök recept..." />
  </div>
</template>

<script>
export default {
  props: {
    value: String
  },
  data() {
    return {
      searchTerm: this.value
    }
  },
  methods: {
    emitSearch() {
      this.$emit('search', this.searchTerm)
    }
  }
}
</script>
