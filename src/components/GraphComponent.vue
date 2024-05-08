<template>
  <div>
    <div id="graph">
      <v-chart :option="chartOption" :autoresize="true" style="height: 800px;"></v-chart>
    </div>
    <div class="navbar flex justify-between items-center p-4 shadow-lg">
      <div>
        <form @submit.prevent="search" class="flex gap-2">
          <input v-model="searchQuery" type="text"  class="form-control" style="color:black;">
          <button class="btn btn-default">Search</button>
        </form>
      </div>
      <div class="flex items-center gap-4">
        <img src="https://neo4j-documentation.github.io/developer-resources/language-guides/assets/img/logo-white.svg" alt="Neo4j World's Leading Graph Database" class="h-8">
        <div>Neo4j Movies</div>
      </div>
    </div>
    <div class="flex">
      <div class="panel panel-default w-1/3">
        <div class="panel-heading">Search Results</div>
        <table class="table-auto w-full">
          <thead>
            <tr>
              <th>Movie</th>
              <th>Released</th>
              <th>Tagline</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(movie, index) in movies" :key="index" @click="showMovie(movie.title)">
              <td>{{ movie.title }}</td>
              <td>{{ movie.released }}</td>
              <td>{{ movie.tagline }}</td>
              <td>{{ movie.votes }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="panel panel-default w-2/3">
        <div class="panel-heading">{{ movieDetails.title || 'Details' }}</div>
        <div class="flex">
          <img :src="movieDetails.poster" class="w-1/4"/>
          <div class="w-3/4">
            <h4>Crew</h4>
            <ul>
              <li v-for="crew in movieDetails.crew" :key="crew.name">{{ crew.name }} {{ crew.job }} {{ crew.role }}</li>
            </ul>
          </div>
        </div>
        <div class="panel-footer">
          <button @click="voteInMovie(movieDetails.title)">Vote</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import ECharts from 'vue-echarts';
import { use } from 'echarts/core';

import {
  CanvasRenderer
} from 'echarts/renderers';
import {
  GraphChart
} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent
} from 'echarts/components';

use([
  CanvasRenderer,
  GraphChart,
  TitleComponent,
  TooltipComponent,
  GridComponent
]);

axios.defaults.baseURL = 'http://localhost:8080';

export default {
  name: "GraphComponent",
  components: {
    'v-chart': ECharts
  },
  setup() {
    const searchQuery = ref('Matrix');
    const movies = ref([]);
    const movieDetails = ref({});
    const chartOption = ref({});

    function search(showFirst = true) {
      axios.get(`/search?q=${encodeURIComponent(searchQuery.value)}`)
        .then(response => {
          movies.value = response.data;
          if (showFirst && movies.value.length > 0) {
            showMovie(movies.value[0].title);
          }
        });
    }

    function showMovie(title) {
      axios.get(`/movie/${encodeURIComponent(title)}`)
        .then(response => {
          movieDetails.value = response.data;
        });
    }

    function voteInMovie(title) {
      axios.post(`/movie/${encodeURIComponent(title)}/vote`)
        .then(() => {
          search(false);
          showMovie(title);
        });
    }

    function loadGraphData() {
      axios.get('/graph').then(response => {
        const graph = response.data;
        // log the datas
        console.log(graph);
        chartOption.value = {
          tooltip: {},
          series: [
            {
              type: 'graph',
              layout: 'force',
              data: graph.nodes.map(node => ({
                ...node,
                symbolSize: 10,
                category: node.label,
                draggable: true
              })),
              edges: graph.links.map(link => ({
                ...link,
                value: link.value
              })),
              force: {
                edgeLength: 30,
                repulsion: 250
              },
              categories: [{ name: 'actor' }, { name: 'movie' }],
            }
          ]
        };
      });
    }

    onMounted(() => {
      loadGraphData();
    });

    return { searchQuery, movies, movieDetails, search, showMovie, voteInMovie, chartOption };
  }
}
</script>

<style scoped>
  /* Tailwind CSS and other styles */
  .navbar { @apply bg-gray-800 text-white; }
  .panel { @apply border rounded shadow-lg bg-white; }
  .panel-heading { @apply bg-gray-200 p-2 font-bold; }
  .panel-footer { @apply bg-gray-200 p-2; }
</style>
