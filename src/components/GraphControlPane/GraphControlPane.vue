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
        </n-flex>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script>
import { defineComponent, ref, computed } from "vue";




export default defineComponent({
  props: ['graphData'],
  setup(props) {

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