
<template>
    <div class="course-contain flex w-5/6 h-full justify-start bg-white bg-opacity-80 p-20 " style="border-radius: 20px; max-height: 1226px; overflow:hidden">
        <div class="course-data-container w-1/2 h-full mr-4  max-h-full" >
            <n-card  embedded :bordered="true" style="position:relative; overflow: scroll"
            >
                        <h1 style="font-size:25px; font-weight: bold">{{ course_info.title }}</h1>
                            <div class="priv-item-container flex-col justify-start align-middle">
                                <!-- <div v-for="(priv_item, index) in this.limitedPrivData(course_info.priv_data)" :key="index"> -->
                                <div v-for="(priv_item, index) of Object.entries(course_info.priv_data)" :key="index">
                                    <h3 style="font-weight: bold" v-if="priv_item[1] !== null && priv_item[0] != 'extern_obj'">
                                        {{ priv_item[0] }}
                                    </h3>
                                    <span v-if="priv_item[0]!=='link' && priv_item[1] !== null && priv_item[0] != 'extern_obj'">
                                      {{ priv_item[1] }}
                                    </span>
                                    <ul v-if="priv_item[0]=='link'" v-for="priv_item_link in priv_item[1]">
                                      <li class="mb-2">
                                        - {{ priv_item_link }}
                                      </li>
                                    </ul>
                                </div>
                            </div>

                            <!-- <template  #footer>
                            <h3>Footer</h3>
                            </template> -->
                            <template  #action >
                            <n-space>
                                <n-button size="small" v-for="(link, index) in this.links" @click="handleLinkClick(link)">
                                <template #icon>
                                    <n-icon>
                                    <cash-icon />
                                    </n-icon>
                                </template>
                                link{{ index+1 }}
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

        <div class="coure-graph-container w-1/2 h-full ml-4" style="overflow:visible">
            <GraphComponent :init_search="this.computed_course_name"> </GraphComponent>
        </div>

    </div>

</template>

<script>
import GraphComponent from './GraphComponent.vue'
import SingleFileModal from './SingleFileModal.vue'

import { CashOutline as CashIcon } from "@vicons/ionicons5";
import { IosAirplane } from '@vicons/ionicons4'
import { useMessage } from 'naive-ui'


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
    IosAirplane,
    useMessage
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
    handleLinkClick(link) {
      // copy link to user clipboard
      navigator.clipboard.writeText(link);
      window.alert("Link copied to clipboard")
    },
  },
  computed: {
    computed_course_name() {
        if (this.course_info.course_name == "大学物理（荣誉）（1）") {
            return "UNIVERSITY_PHYSICS_1"
        }
        if (this.course_info.course_name == "大学物理（荣誉）（2）") {
            return "UNIVERSITY_PHYSICS_2"
        }
        if (this.course_info.course_name == "操作系统") {
          return "OS"
        }
        if (this.course_info.course_name == "程序设计原理与方法") {
          return "CS1604"
        }
      return "CS1605"
    },
    local_props() {
      console.log(this.course_info.priv_data)
      return this.course_info
    },
    links() {
      for (let [key, value] of Object.entries(this.course_info.priv_data)) {
        if (key == "link") {
          return value
        }
      }
      return null
    },
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