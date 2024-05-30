<template>
  <n-flex class="bg-white rounded-lg">
    <div class="bg-gradient-to-r from-yellow-100 via-red-100 to-blue-100 rounded-lg shadow-lg p-6 w-full">
      <div class="flex items-center space-x-4">
        <img src="https://placehold.co/100x100" alt="Profile picture of Cooper Carder" class="w-24 h-24 rounded-full">
        <div>
          <h1 class="text-2xl font-semibold">Cooper Carder</h1>
          <p class="text-gray-500">Product Designer</p>
          <p class="text-gray-400 text-sm">Last active 2d ago</p>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-4 mt-6">
        <div class="bg-white p-4 rounded-lg shadow">
          <p class="text-gray-500">Modules completed</p>
          <p class="text-2xl font-semibold">24 <i class="fas fa-check-circle text-green-500"></i></p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <p class="text-gray-500">Time spent training</p>
          <p class="text-2xl font-semibold">89h <i class="fas fa-clock text-red-500"></i></p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <p class="text-gray-500">Learning needs identified</p>
          <p class="text-2xl font-semibold">2</p>
        </div>
      </div>
    </div>
    <div class="p-6 w-full">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-semibold">Enrolled Classes</h2>
        <n-button type="warning">
            Export
        </n-button>
      </div>
      <div class="overflow-x-auto mt-4">
        <table class="min-w-full bg-white rounded-lg shadow h-64">
          <thead>
            <tr class="text-left text-gray-500">
              <th class="py-2 px-4">Module name</th>
              <th class="py-2 px-4">Course</th>
              <th class="py-2 px-4">Date completed</th>
              <th class="py-2 px-4">Score</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-t" v-for="(module, index) in modules" :key="index">
              <td class="py-2 px-4">{{ module.name }}</td>
              <td class="py-2 px-4">{{ module.course }}</td>
              <td class="py-2 px-4">{{ module.date }}</td>
              <td class="py-2 px-4">
                <div class="flex items-center">
                  <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div class="bg-blue-600 h-2.5 rounded-full" :style="{ width: module.score + '%' }"></div>
                  </div>
                  <span class="ml-2">{{ module.score }}%</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="p-6 w-full">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-semibold">Pinned files</h2>
        <n-button type="warning">
            Export
        </n-button>
      </div>
      <div class="overflow-x-auto mt-4">
        <table class="min-w-full bg-white rounded-lg shadow h-64">
          <thead>
            <tr class="text-left text-gray-500">
              <th class="py-2 px-4">Module name</th>
              <th class="py-2 px-4">Course</th>
              <th class="py-2 px-4">Date completed</th>
              <th class="py-2 px-4">Score</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-t" v-for="(module, index) in modules" :key="index">
              <td class="py-2 px-4">{{ module.name }}</td>
              <td class="py-2 px-4">{{ module.course }}</td>
              <td class="py-2 px-4">{{ module.date }}</td>
              <td class="py-2 px-4">
                <div class="flex items-center">
                  <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div class="bg-blue-600 h-2.5 rounded-full" :style="{ width: module.score + '%' }"></div>
                  </div>
                  <span class="ml-2">{{ module.score }}%</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</n-flex>
</template>

<script>
export default {
  name: 'UserPane',
  data() {
    return {
      modules: [
        { name: 'Understanding ND in the workplace', course: 'ND Masterclass', date: '19 Sep 23', score: 80 },
        { name: 'Dealing with your ND', course: 'ND Masterclass', date: '13 Sep 23', score: 43 },
        { name: 'Working with others', course: 'ND Masterclass', date: '15 Sep 23', score: 98 },
        { name: 'What ND means to you', course: 'ND Masterclass', date: '1 Sep 23', score: 12 }
      ]
    };
  }
};
</script>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
}
</style>
