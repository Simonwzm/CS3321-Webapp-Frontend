<template>
  <div id="fc-container" class="p-8 bg-gray-100 min-h-full bg-opacity-70" style="border-radius: 20px">
    <div class="text-3xl font-semibold mb-6">General Statistics</div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard title="Total Courses" value="8/44" icon="fas fa-dollar-sign" change="+8"></StatCard>
      <StatCard  title="Total Users" value="2" icon="fas fa-users" change="+2"></StatCard>
      <StatCard title="Mongo Collections" value="264" icon="fas fa-user-check" change="+4"></StatCard>
      <StatCard title="Neo4j-Graphs" value="5/6" icon="fas fa-shopping-cart" change="-1"></StatCard>
    </div>
    <div class="bg-white p-6 rounded-lg shadow mb-6 min-h-80">
      <div class="font-semibold text-xl mb-4">Pinned Favourite Course</div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CountrySales country="United States" sales="2,500" value="$230,900" bounce="29.9%"></CountrySales>
        <CountrySales country="Germany" sales="3,900" value="$440,000" bounce="40.22%"></CountrySales>
        <CountrySales country="Great Britain" sales="1,400" value="$190,700" bounce="23.44%"></CountrySales>
        <CountrySales country="Brazil" sales="562" value="$143,960" bounce="32.14%"></CountrySales>
      </div>
    </div>
    <div class="bg-white p-6 rounded-lg">
      <div class="font-semibold text-xl mb-4">Database Status</div>
      <div class="grid grid-cols-3 gap-4">
        <div class="col-span-1">
          <ProgressCircle />
        </div>
        <div class="col-span-1">
          <!-- <div class="text-lg font-semibold mb-2">Database Status</div> -->
          <div class="db-card mb-6">
            <div class="flex items-center mb-1">
              <span class="text-2xl font-semibold">MongoDB</span>
            </div>
            <div class="text-blue-500 text-2xl mt-2">
              <i class="fas fa-database"></i>
              <span class="text-2xl font-semibold">  Online</span>
            </div>
          </div>
          <div class="db-card">
            <div class="flex items-center mb-1">
              <span class="text-2xl font-semibold">Neo4j</span>
            </div>
            <div class="text-blue-500 text-2xl mt-2">
              <i class="fas fa-database"></i>
              <span class="text-2xl font-semibold">  Online</span>
            </div>
          </div>
        </div>
        <div class="col-span-1">
          <!-- <div class="text-lg font-semibold mb-2">Database Status</div> -->
          <div class="db-card mb-6">
            <div class="flex items-center mb-1">
              <span class="text-2xl font-semibold">Elastic Search</span>
            </div>
            <div class="text-red-500 text-2xl mt-2">
              <i class="fas fa-hammer"></i>
              <span class="text-2xl font-semibold text-red-500">  Under Construction</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import StatCard from './StatCard.vue';
import CountrySales from './CountrySales.vue';
import ProgressCircle from './ProgressCircle.vue';

export default {
  name: "FavouriteCourse",
  components: {
    StatCard,
    CountrySales,
    ProgressCircle
  }
};
</script>

<style scoped>
* {
  font-family: 'Inter', sans-serif;
}

</style>