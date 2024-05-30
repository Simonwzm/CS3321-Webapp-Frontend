<template>
    <n-split direction="vertical" style="height: 100%">
    <template #1>
        <div id="graph">
            <v-chart :option="chartOption" :autoresize="true" style="min-height: 600px"></v-chart>
        </div>
    </template>
    <template #2 >
        <n-flex vertical id="graph" class="switch-graph mt-12">
            <n-flex>
            <n-select v-model:value="course" :options="course_opt" @update:value="handleGraphChange" style="width:50%;" />
            <n-button @click="loadGraphData2(course)" type="info" >Switch Graph</n-button>
            </n-flex> 
            <GraphControlPane :graphData="graphData" />
        </n-flex>
    </template>
    </n-split>
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
import GraphControlPane from './GraphControlPane.vue';

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
    'v-chart': ECharts,
    'GraphControlPane': GraphControlPane
  },
  props: {
    init_search: String
  },
  setup(props) {
    const course = props.init_search;
    const graphData = ref([]);
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
    ];
 function loadGraphData2(course) {
      // append course name to url and send get request
      let url = "http://localhost:8080/course/rels/" + course;
      let url2 = "http://localhost:8080/course/entities/" + course;
      axios.get(url).then(response => {
        const graph = response.data;
        console.log('111');
        console.log(graph);

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
      axios.get(url2).then(response => {
        console.log('222');
        console.log(response.data)
        graphData.value = response.data;
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

    return { graphData, course, course_opt, chartOption, loadGraphData2 , handleGraphChange};
  }
});


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


    // function showMovie(title) {
    //   axios.get(`/movie/${encodeURIComponent(title)}`)
    //     .then(response => {
    //       movieDetails.value = response.data;
    //     });
    // }

    // function voteInMovie(title) {
    //   axios.post(`/movie/${encodeURIComponent(title)}/vote`)
    //     .then(() => {
    //       search(false);
    //       showMovie(title);
    //     });
    // }


</script>


