<template>
  <div class=" sc-container bg-white p-6 rounded-lg shadow flex flex-col items-center justify-center">
    <div class="text-lg font-medium mb-2">{{ title }}</div>
    <div class="flex items-center mb-1">
      <span class="text-2xl font-semibold">{{ value }}</span>
      <span class="ml-2 text-sm font-semibold text-green-500" v-if="change.startsWith('+')">{{ change }}</span>
      <span class="ml-2 text-sm font-semibold text-red-500" v-else>{{ change }}</span>
    </div>
    <div class="text-blue-500 text-2xl">
      <i :class="icon"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatCard',
  props: {
    title: String,
    value: String,
    icon: String,
    change: String
  }
};
</script>

<style scoped>
</style>
