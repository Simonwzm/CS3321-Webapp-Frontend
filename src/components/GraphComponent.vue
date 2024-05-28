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
    <n-space vertical style="overflow: visible;">
      <n-select v-model:value="course" :options="course_opt" @update:value="handleGraphChange" />
    </n-space>
    <div class="switch-graph">
      <button @click="loadGraphData2()">Switch Graph</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, defineComponent } from 'vue';
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

import { LegendComponent } from 'echarts/components';

use([
  CanvasRenderer,
  GraphChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
]);

axios.defaults.baseURL = 'http://localhost:8080';

export default defineComponent({
  name: "GraphComponent",
  components: {
    'v-chart': ECharts
  },
  props: {
    init_search: String
  },
  setup(props) {
    const course = props.init_search;
    const course_opt = [
      {
        label: 'CS1604',
        value: 'CS1604'
      },
      {
        label: 'CS1605',
        value: 'CS1605'
      },
      {
        label: 'OS',
        value: 'OS'
      },
      {
        label: 'DAG',
        value: 'DAG'
      },
      {
        label: 'UNIVERSITY_PHYSICS_1',
        value: 'UNIVERSITY_PHYSICS_1'
      },
      {
        label: 'UNIVERSITY_PHYSICS_2',
        value: 'UNIVERSITY_PHYSICS_2'
      }
    ]
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
    console.log(graph); // It's good practice to log and verify the data structure
    chartOption.value = {
      tooltip: {
        formatter: function (params) {
          if (params.dataType === 'node') {
            // Ensure the correct properties are used. Adjust 'label' and 'title' as per your data structure.
            return `${params.data.label}: ${params.data.title}`;
          } else if (params.dataType === 'edge') {
            // This assumes that the edge tooltip should show connected node indices; customize as needed
            return `Connection between node ${params.data.source} and node ${params.data.target}`;

          }
        }
      },
      series: [
        {
          type: 'graph',
          layout: 'force',
          roam: true, // Enable user panning and zooming on the graph
          data: graph.nodes.map(node => ({
            ...node,
            symbolSize: 20,
            category: node.label,
            draggable: true,
            label: {
              show: true,
              formatter: '{b}', // Ensure the node label is set correctly
              position: 'bottom'
            }
          })),
          edges: graph.links.map(link => ({
            ...link,
            lineStyle: {
              width: 2,
              color: '#ccc'
            }
          })),
          force: {
            edgeLength: [50, 100],
            repulsion: 500
          },
          categories: [
            { name: 'actor' },
            { name: 'movie' }
          ],
        }
      ]
    };
  });
}

 function loadGraphData2(course) {
      // append course name to url and send get request
      let url = "http://localhost:8080/course/rels/" + course;
      console.log(url);
      axios.get(url).then(response => {
        const graph = response.data;

        const nodes = [];
        const nodeMap = new Map();
        const edges = [];

        // Process nodes and edges
        graph.forEach(item => {
          if (!nodeMap.has(item.start.name)) {
            nodes.push({ name: item.start.name, category: item.start.category || 'default', symbolSize: 20 });
            nodeMap.set(item.start.name, nodes.length - 1);
          }
          if (!nodeMap.has(item.end.name)) {
            nodes.push({ name: item.end.name, category: item.end.category || 'default', symbolSize: 20 });
            nodeMap.set(item.end.name, nodes.length - 1);
          }
          edges.push({ source: nodeMap.get(item.start.name), target: nodeMap.get(item.end.name), name: item.rel.name });
        });

        const categories = Array.from(new Set(nodes.map(node => node.category))).map(category => ({ name: category }));

        chartOption.value ={
          tooltip: {
            formatter: function (params) {
              if (params.dataType === 'node') {
                return `${params.data.name}`;
              } else if (params.dataType === 'edge') {
                return `${params.data.source} -> ${params.data.target}: ${params.data.name}`;
              }
            }
          },
          legend: [{
            data: categories.map(a => a.name),
            selected: categories.reduce((acc, category) => {
              acc[category.name] = true;
              return acc;
            }, {})
          }],
          series: [{
            type: 'graph',
            layout: 'force',
            categories,
            data: nodes.map(node => ({
              ...node,
              label: {
                show: true,
                position: 'right'
              }
            })),
            edges: edges.map(edge => ({
              ...edge,
              lineStyle: {
                normal: {
                  width: 2,
                  curveness: 0.3
                }
              }
            })),
            roam: true,
            label: {
              position: 'right',
              formatter: '{b}'
            },
            force: {
              repulsion: 1000,
              edgeLength: [50, 150]
            }
          }]
        };
      }).catch(error => {
        console.error('Graph data loading error:', error);
      });
    }

    function handleGraphChange(course) {
      loadGraphData2(course);
    }


    onMounted(() => {
      console.log(props.init_search)
      loadGraphData2(props.init_search);
    });

    return { course, course_opt, searchQuery, movies, movieDetails, search, showMovie, voteInMovie, chartOption, loadGraphData2 , handleGraphChange};
  }
});
</script>

<style scoped>
  /* Tailwind CSS and other styles */
  .navbar { @apply bg-gray-800 text-white; }
  .panel { @apply border rounded shadow-lg bg-white; }
  .panel-heading { @apply bg-gray-200 p-2 font-bold; }
  .panel-footer { @apply bg-gray-200 p-2; }
</style>
