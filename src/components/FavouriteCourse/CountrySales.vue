<template>
  <div class="cs-container bg-white p-4 rounded-lg shadow flex flex-col justify-between">
    <div class="flex items-center mb-2">
      <img :src="'https://placehold.co/20x13?text=' + country" :alt="'Flag of ' + country" class="mr-2">
      <div class="text-sm font-medium">Country: <span class="font-semibold">{{ country }}</span></div>
    </div>
    <div class="grid grid-cols-2 gap-4 text-sm">
      <div>Sales: <span class="font-semibold">{{ sales }}</span></div>
      <div>Value: <span class="font-semibold">{{ value }}</span></div>
      <div>Bounce: <span class="font-semibold">{{ bounce }}</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CountrySales',
  props: {
    country: String,
    sales: String,
    value: String,
    bounce: String
  }
};
</script>

<style scoped>
</style>
