<template>
  <n-card>
    <n-tabs
      class="card-tabs"
      default-value="signin"
      size="large"
      animated
      pane-wrapper-style="margin: 0 -4px"
      pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
    >
      <n-tab-pane name="search" tab="Search" style="border: 4px">
        <n-form>
          <n-form-item-row label="用户名">
            <n-input />
          </n-form-item-row>
          <n-form-item-row label="密码">
            <n-input />
          </n-form-item-row>
        </n-form>
        <n-button type="primary" block secondary strong>
          登录
        </n-button>
      </n-tab-pane>
      <n-tab-pane name="create" tab="Create">
        <n-form>
          <n-form-item-row label="Start Node">
            <n-input v-model:value="createdTuple.StartNode"/>
          </n-form-item-row>
          <n-form-item-row label="End Node">
            <n-input v-model:value="createdTuple.EndNode"/>
          </n-form-item-row>
          <n-form-item-row label="Relation">
            <n-input v-model:value="createdTuple.rel"/>
          </n-form-item-row>
        </n-form>
        <n-button type="primary" block secondary strong @click="handleCreate">
          Create Tripplet
        </n-button>
      </n-tab-pane>
      <n-tab-pane name="Update" tab="Update">
        <n-flex size="large">
          <n-transfer ref="transfer" v-model:value="chosenNodeList" :options="ComputedGraphData" />
          <Transition>
            <n-input animated v-if="chosenNodeList.length>=1" v-model:value="rels" placeholder="Start Node Info" />
          </Transition>
          <n-collapse-transition :show="chosenNodeList.length>=2">
            <n-input animated v-if="chosenNodeList.length>=2" v-model:value="rels" placeholder="Second Node Info" />
          </n-collapse-transition>
          <n-collapse-transition :show="chosenNodeList.length>=2">
            <n-input animated v-if="chosenNodeList.length>=2" v-model:value="rels" placeholder="Relation" />
          </n-collapse-transition>
          <n-button type="primary" block secondary strong> Update </n-button>
          <n-button type="error" block secondary strong> Delete </n-button>
          <n-button type="info" block secondary strong @click="testAPIAll"> Test API </n-button>
        </n-flex>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import axios from "axios";




export default defineComponent({
  props: ['graphData'],
  setup(props) {

    function testSearchAPI() {
      // example url: http://127.0.0.1:8080/search/course?q=physics
      let query = "physics";
      axios.get(`http://127.0.0.1:8080/search/course?q=${query}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    function testSearchRelsAPI() {
      let query = "RELATED_TO"
      //example: http://127.0.0.1:{port}/search/course/rel?q=RELATED_TO
      axios.get(`http://127.0.0.1:8080/search/course/rel?q=${query}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    function testCreateAPI() {
      let params = {
        "name": "INTERRUPT",
        "properties": {
          "context": "thread",
          "os": "linux"
        }
      };
      let course_ = "CS1604";
      axios.get(`http://127.0.0.1:8080/create/entities/${course_}`, params)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };


    function testUpdateAPI() {
      let params = {
          "name": "debugging",  
          "new_properties": {
              "utils": "gdb"
          },  
        }
      let course_ = "CS1604";
      axios.get(`http://127.0.0.1:8080/update/entities/${course_}`, params)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      };

    function testDeleteAPI() {
      let params = {
        "name": "debugging"
      };
      let course_ = "CS1604";
      axios.get(`http://127.0.0.1:8080/delete/entities/${course_}`, params)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    function testCreateRelAPI() {
      let params = {
          "name1": "StanfordCppLib",  // 用来匹配起始节点的名字
          "name2": "Queue",  // 用来匹配终点节点的名字
          "rel_type": "USES",  // 用来匹配连接起始节点和终点节点的关系的名字
          "properties": {
              "method": "exclusive"
          },  // 新创建关系的属性,作为键值对的形式存在.
      };
      axios.get(`http://127.0.0.1:8080/create/rels`, params)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };


    function testAPIAll() {
      // testSearchAPI();
      // testSearchRelsAPI();
      // testCreateAPI();
      // testUpdateAPI();
      testDeleteAPI();
      // testCreateRelAPI();
    }

    const createdTuple = ref({
      StartNode: "",
      EndNode: "",
      rel: ""
    });
    function createOptions() {
      let options = [];
      // for each in props.graphData
      for (let i = 0; i < props.graphData.length; i++) {
        if (props.graphData[i].name == null) {
          continue;
        }
        options.push({
          key: i,
          label: props.graphData[i].name,
          value: props.graphData[i].name,
          disabled: false
        });
      }
      return options;
    };

    function handleCreate() {
      console.log("Create Tripplet");
      console.log(createdTuple);
    }

    const ComputedGraphData = computed(() => {
      console.log(props.graphData);
      // return props.graphData;
      return createOptions();
    });
    return {
      options: createOptions(),
      ComputedGraphData,
      chosenNodeList: ref([]),
      rels: ref([]),
      createdTuple,
      handleCreate,
      testAPIAll,
    };
  }
});
</script>


<style scoped>
.card-tabs .n-tabs-nav--bar-type {
  padding-left: 4px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>