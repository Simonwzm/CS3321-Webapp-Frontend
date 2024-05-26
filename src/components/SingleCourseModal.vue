
<template>
    <div class="course-contain flex w-5/6 h-full justify-start bg-white bg-opacity-80 p-20 " style="border-radius: 20px; max-height: 1226px; overflow:hidden">
        <div class="course-data-container w-1/2 h-full mr-4  max-h-full" style="overflow:scroll">
            <n-card  embedded :bordered="true" style="position:relative; overflow: scroll">
                        <h1 style="font-size:25px; font-weight: bold">{{ course_info.title }}</h1>
                            <div class="priv-item-container flex-col justify-start align-middle max-h-16 overflow-clip">
                                <!-- <div v-for="(priv_item, index) in this.limitedPrivData(course_info.priv_data)" :key="index"> -->
                                <div v-for="(priv_item, index) in course_info.priv_data" :key="index">
                                    <h3 style="font-weight: bold">
                                        {{ priv_item }}
                                    </h3>
                                </div>
                            </div>

                            <template  #footer>
                            <h3>Footer</h3>
                            </template>
                            <template  #action >
                            <n-space>
                                <n-button size="small">
                                <template #icon>
                                    <n-icon>
                                    <cash-icon />
                                    </n-icon>
                                </template>
                                1$
                                </n-button>
                                <n-button size="small">
                                <template #icon>
                                    <n-icon>
                                    <cash-icon />
                                    </n-icon>
                                </template>
                                10$
                                </n-button>
                                <n-button size="small">
                                <template #icon>
                                    <n-icon>
                                    <cash-icon />
                                    </n-icon>
                                </template>
                                100$
                                </n-button>
                            </n-space>
                            </template>
            </n-card>
            <div class="extern-container mt-8 "  v-if="course_info.priv_data.extern_obj" style="overflow:scroll; max-height: 750px;">
                <n-scrollbar style="max-height: 760px" trigger="none">
                <n-collapse>
                    <n-collapse-item title="External Files" name="1">
                        <n-space vertical :size="12" v-for="extern_file in course_info.priv_data.extern_obj">
                            <SingleFileModal :fileData="extern_file"></SingleFileModal>
                        </n-space>
                    </n-collapse-item>

                </n-collapse>
            </n-scrollbar>
                </div>
        </div>

        <div class="coure-graph-container w-1/2 h-full ml-4">
            <GraphComponent :init_search="this.computed_course_name"> </GraphComponent>
        </div>

    </div>

</template>

<script>
import GraphComponent from './GraphComponent.vue'
import SingleFileModal from './SingleFileModal.vue'

import { CashOutline as CashIcon } from "@vicons/ionicons5";
import { IosAirplane } from '@vicons/ionicons4'

export default {
  props: {
    course_info: {
      type: Object,
      required: true
    }
  },
  components: {
    SingleFileModal,
    GraphComponent,
    CashIcon,
    IosAirplane
  },
  data() {
    return {
      limit: 3,
      test:10,
    }
  },
  methods: {
    limitedPrivData(ob) {
      return Object.entries(ob).slice(0, this.limit);
    },
  },
  computed: {
    computed_course_name() {
        if (this.course_info.course_name == "大学物理（荣誉）（1）") {
            return "CS1604"
        }
      return "CS1605"
    }
  }
}
</script>

<style scoped>

::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
}
.n-collapse-item__header-main {
    font-size:80px;
}
</style>