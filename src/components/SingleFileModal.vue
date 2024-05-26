


<template>
    <div class="container mb-8" style="border-radius: 20px; overflow: hidden;">
  <n-card
    hoverable
    :segmented="{
      content: true,
      footer: 'soft'
    }"
  >
    <template #header>
        <h3>{{ fileData.name }}</h3>
    </template>
    <!-- <template #default> -->
        <div class="content" v-for="(entry, index) in Object.entries(fileData)">
            <div v-if="entry[0] !== 'name' && entry[1] !== null">
                <h3 style="font-weight:bold;">{{ entry[0] }}</h3>
                <p>{{ entry[1] }}</p>
            </div>
        </div>
    <!-- </template> -->
    <template #action>
      #action {{ fileData.type }}
    </template>
  </n-card>
    </div>

</template>

<script>
export default {
  props: {
    fileData: {
      type: Object,
      required: true
    }
  },
}
</script>

