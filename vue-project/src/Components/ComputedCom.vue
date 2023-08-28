<script setup lang="ts">
import { ref, computed } from 'vue'
const num = ref(1)
const num2 = num.value + 1 // num2 will not be reactive
const num3 = computed(() => num.value + 1)
const increment = () => {
  num.value++
}
</script>

<template>
  <h2>num:{{ num }}</h2>
  <h2>num2:{{ num2 }}</h2>
  <h2>num3:{{ num3 }}</h2>
  <button @click="increment">increment</button>
</template>
