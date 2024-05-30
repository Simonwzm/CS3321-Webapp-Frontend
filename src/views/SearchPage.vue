<template>
  <div class="wrapper flex flex-row justify-center" style="width:1800px">
    <div class="min-h-full  flex flex-col justify-start  w-4/5 " >
      <n-scrollbar trigger="none">
  <div class="flex justify-center items-center space-x-6 pt-4 w-full" style="height:100px"  >
    <div class=" flex items-center h-full  align-middle " v-for="(tab, index) in tabs" :key="index" :class="['tab', { 'active-tab': activeTab === index }]" @click="selectTab(index)">
      {{ tab }}
    </div>
    <div class="text-2xl items-end">
      <i class="fas fa-user pl-10"></i>
    </div>
  </div>
  <div class="relative " style="min-height: 90vh;">
    <!-- <div class="ring-binder" v-for="index in 5" :key="index"></div> -->
    <div class="flex flex-row  justify-start note-paper min-h-full z-1 w-full" >
      <!-- <div class="tape" v-for="index in 5" :key="index"></div> -->
      <div class="middle-line w-14 " >
        <!-- <img src="../assets/middle-line.png" alt=""> -->
      </div>
      <div class="wrapper1 w-11/12 flex flex-col note-paper2 min-h-full z-1" >
          <div class="course-stack-view" v-if="this.activeTab==0">

            <n-spin :show="isLoading">
            <div class="input-search-line h-10 flex-row w-full justify-start items-center">
              <input class="text-lg h-full font-bold mb-4 w-1/2 border-2 border-gray-300 rounded-lga" placeholder="   result for: naive-ui" v-model="message" @keyup.enter="submitValue" ></input>
              <div class="select_container w-1/3 ml-10 inline-block h-full z-11" style="line-height:2.5em">
              <n-space vertical>
                <n-select v-model:value="cur_search_value" multiple :options="search_options" size="large" />
              </n-space>
              </div>
              <!-- <div class="search-pane inline-flex justify-start align-middle w-1/3 pl-5">
                  <n-button> 111 </n-button> 
              </div> -->
  
            </div>
            <br />
            <div class="empty-show z-2" v-if="false">
              <div class="empty-bg">
                Search list empty.
              </div>
            </div>

            <n-list  v-for="course_info in this.flattend_retrieved_list" class=" bg-gray-200 mb-20 z-2 bg-opacity-20" >

              
              <n-list-item content-style="z-index:2; "  >
                <!-- <template #prefix class="bg-force z-10 w-1000 h-full bg-emerald-200 relative block" > -->
                <!-- </template> -->
  
                <div class="bg-force" >
                </div>
    <n-thing content-indented content-style="margin-top: 0 10px; padding-bottom:0px" style="z-index:2;position:relative; padding-left: 20px; padding-top: 10px" >
      <template  #avatar class="z-2">
        <n-avatar>
          <n-icon>
            <AttachFileFilled v-if="course_info.entry_type=='files'"/>
            <OndemandVideoFilled v-if="course_info.entry_type=='video'"/>
            <AssignmentSharp v-if="course_info.entry_type=='assignments'"/>
            <AnnouncementOutlined v-if="course_info.entry_type=='announcements'"/>
            <ViewModuleRound v-if="course_info.entry_type=='modules'"/>
            <div v-else> {{ course_info.entry_type }} </div>
          </n-icon>
        </n-avatar>
      </template>
      <template  #header class="z-2">
        {{ course_info.title }}
      </template>
      <!-- <template  #header-extra class="z-2">
      </template> -->
      <template  #description class="z-3">
                    <n-space size="small" style="margin-top: 4px" class="z-3">
                      <n-tag :bordered="false" type="info" size="small">
                        {{ course_info.course_name }}
                      </n-tag>
                      <n-tag :bordered="false" type="info" size="small">
                        {{ course_info.entry_type }}
                      </n-tag>
                    </n-space>
      </template>
      <div class="priv-item-container flex-col justify-start align-middle max-h-16 overflow-clip">
          <div>
            <!-- {{ priv_item[0] }}: {{ priv_item[1] }} -->
              Click Detail for more info
          </div>
            <br/>
      </div>
      <template  #footer class="z-a3">
          <n-rate allow-half clearable color="#4fb233" />
      </template>
    </n-thing>
   
        <template #suffix class="z-3">
          <n-button class="mr-40 " @click="handleListClick(course_info)">Details</n-button>
        </template>
              </n-list-item>
            </n-list>
            </n-spin>
          </div>
          <div class="chapter-view" v-if="this.activeTab==1">
            <FavouriteCourse />
          </div>

          <div class="chapter-view" v-if="this.activeTab==2">
            <AddCourse />
          </div>

          <div class="chapter-view" v-if="this.activeTab==3">
            <UserPane />
          </div>
          <div class="course-stack-view" v-if="this.activeTab==0">

          </div>
      </div>
      

      <div class="flex  flex-col justify-center items-start space-x-6 pt-4 w-1/12 h-full mt-40"   >
        <div class=" flex items-center w-full  align-middle mt-40" style="margin: 50px 0px">
          <div class="tab2" style="background-color:lightpink" @click="addTabIdx">
              next tab
            <n-modal v-model:show="showCourseModal">
              <SingleCourseModal :course_info="this.this_course" />
            </n-modal>
          </div>
        </div>
        <div class=" flex items-center w-full  align-middle mt-40" style="margin: 50px 0px">
          <div class="tab2" style="background-color:lightgreen" @click="activate('right')">
            <n-button @click="activate('right')">
              <span> -> </span>
            </n-button>
            <n-drawer
              v-model:show="active"
              :default-width="1024"
              :placement="placement"
              resizable
            >

              <n-drawer-content title="Neo4j Pane">
                <!-- <n-split direction="vertical" style="height: 100%">
                  <template #1>
                    <GraphComponent :init_search="CS1604" />
                  </template>
                  <template #2>
                    <GraphControlPane />
                  </template>
                </n-split> -->

                <GraphControlDrawer :init_search="'CS1604'" />
              </n-drawer-content>

            </n-drawer>         

          </div>
        </div>
        <div class=" flex items-center w-full  align-middle mt-40" style="margin: 50px 0px">
          <div class="tab2" style="background-color:lightskyblue" @click="minusTabIdx">
            <!-- <button class="btnn" style="width: 100%; height: 100%; border: none; background: none; color: inherit" @click="showModal = true">
              123
            </button> -->
          </div>
        </div>

        <!-- <div class="flex items-center w-full mt-40" style="margin: 50px 0;">
          <div class="tab2 bg-lightskyblue transition-all duration-1500 ease-in-out transform origin-right hover:scale-200">132</div>
        </div> -->


      </div>

    </div>
  </div>
      </n-scrollbar> 
    </div>
  </div>
</template>

<script>
import { NList } from 'naive-ui'
import { NButton } from 'naive-ui'
import { NEmpty } from 'naive-ui';
import { NModal } from 'naive-ui';
// import type { DrawerPlacement } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { CashOutline as CashIcon } from "@vicons/ionicons5";
import { AttachFileFilled } from "@vicons/material";
import { OndemandVideoFilled } from "@vicons/material";
import { AssignmentSharp } from "@vicons/material";
import { ViewModuleRound } from "@vicons/material";
import { AnnouncementOutlined } from "@vicons/material";

import axios from 'axios';
// import component GraphComponent.vue from /compoonents dir
import GraphComponent from '../components/GraphComponent.vue'
import  SingleCourseModal from '../components/SingleCourseModal.vue'
import FavouriteCourse from '../components/FavouriteCourse/FavouriteCourse.vue'
import AddCourse from '../components/AddCourse/AddCourse.vue'
import GraphControlDrawer from '../components/GraphControlPane/GraphControlDrawer.vue'
import UserPane from '../components/UserPane/UserPane.vue'

export default {
  components: {
    NList,
    NButton,
    NEmpty,
    NModal,
    GraphComponent,
    CashIcon,
    SingleCourseModal,
    AttachFileFilled,
    OndemandVideoFilled,
    AssignmentSharp,
    ViewModuleRound,
    AnnouncementOutlined,
    FavouriteCourse,
    AddCourse,
    GraphControlDrawer,
    UserPane
  },
  name: 'SearchPage',
  data() {
    return {
      isLoading: false,
      showModal: ref(false),
      showCourseModal: ref(false),
      showEntryModal: ref(false),
      activeTab: 0,
      limit: 4,
      tabs: ['Course Stack', 'Statistics', 'Homework', 'Experiment', 'Reference'],
      cur_search_value: ['all',],
      search_options: [
        { label: 'All', value: 'all' },
        { label: 'Announcement', value: 'announcement' },
        { label: 'Video', value: 'video' },
        { label: 'Assignment', value: 'assignment' },
        { label: 'File', value: 'file' },
        { label: 'Module', value: 'module' },
      ],

      /* drawer vars */
      active: false,
      placement: "right",
      course_list: [],
      message: "",
      retrieved_list: [],
      this_course: {},
    };
  },
  computed: {
    // computed property for the search result
    flattend_retrieved_list() {
      let res_vec = [];
      for (let i=0; i<this.retrieved_list.length; i++) {
        // for each key in this object
        let course_name = "";
        let course_url = "";
        for (let key in this.retrieved_list[i]) {
          if (key === "course_url") {
            course_url = this.retrieved_list[i][key];
          } else if (key === "course_name") {
            course_name = this.retrieved_list[i][key];
          } else {
            for (let j=0; j<this.retrieved_list[i][key].length; j++) {
              let title_ = this.parseTitle(key, this.retrieved_list[i][key][j]);
              // console.log(title_)
              res_vec.push({
                title: title_,
                course_name: course_name,
                entry_type: key,
                priv_data: this.parsePriv(key, this.retrieved_list[i][key][j])
              });
            }
          }
        } 
      }
      return res_vec;
    },
  },
  methods: {

    handleListClick(this_course) {
      this.this_course = this_course;
      this.showCourseModal = true;
    },



    limitedPrivData(ob) {
      return Object.entries(ob).slice(2, this.limit);
    },

    parsePriv(key, priv_data) {
      let res_obj = {};
      if (key==="files") {
        res_obj["name"] = priv_data.file_name;
        res_obj["description"] = null
        res_obj["link"] = [priv_data.file_url,];
        res_obj["extern_obj"] = null;
        res_obj["type"] = "files"
        return res_obj;
      }
      if (key==="assignments") {
        res_obj["name"] = priv_data.assign_title;
        res_obj["description"] = priv_data.assign_message;
        res_obj["link"] = [priv_data.assign_url,];
        res_obj["type"] = "assignments"
        let extern_list = []
        for (let i=0; i<priv_data.assign_file.length; i++) {
          extern_list.push(this.parsePriv("files", priv_data.assign_file[i]));
        }
        res_obj["extern_obj"] = extern_list;
        return res_obj;
      }
      if (key==="attachments") {
        res_obj["name"] = priv_data.attachment_name;
        res_obj["description"] = null;
        res_obj["link"] = [priv_data.attachment_url,];
        res_obj["extern_obj"] = null;
        res_obj["type"] = "files"
        return res_obj;
      }
      if (key === "video") {
        res_obj["name"] = priv_data.video_discrption;
        res_obj["description"] = priv_data.video_discrption + " " + "video";
        res_obj["link"] = [priv_data.video_link1,priv_data.video_link2,];
        res_obj["extern_obj"] = null;
        res_obj["type"] = "video"
        return res_obj;
      }
      if (key === "modules") {
        res_obj["name"] = priv_data.module_name;
        res_obj["description"] = null;
        res_obj["link"] = null;
        let extern_list = []
        // TODO: data structure is not structured for nesting
        for (let i=0; i<priv_data.attachments.length; i++) {
          extern_list.push(this.parsePriv("attachments", priv_data.attachments[i]));
        }
        res_obj["type"] = "modules"
        res_obj["extern_obj"] = extern_list;
        return res_obj;
      }
      if (key === "announcements") {
        res_obj["name"] = priv_data.ann_title;
        res_obj["description"] = priv_data.ann_message;
        res_obj["link"] = null;
        res_obj["extern_obj"] = null;
        res_obj["type"] = "announcements"
        return res_obj;
      }
      console.error("Error: key not found: ", key, priv_data)
      return null;
    },

    parseTitle(key, priv_data) {
      if (key==="files") {
        return priv_data.file_name;
      } else if (key==="video") {
        return priv_data.video_discrption;
      } else if (key==="assignments") {
        return priv_data.assign_title;
      } else if (key==="modules") {
        return priv_data.module_name;
      } else if (key==="announcements") {
        return priv_data.ann_title;
      } else {
        console.log(key);
      }
    },
    submitValue() {
      this.SendCourseSearch(this.message, this.cur_search_value);
    },

    selectTab(index) {
      this.activeTab = index;
    },
    addTabIdx() {
      this.activeTab = (this.activeTab + 1) % this.tabs.length;
    },
    minusTabIdx() {
      this.activeTab = (this.activeTab - 1) % this.tabs.length;
    },
    activate(place) {
      this.active = true;
      this.placement = place;
    },

    SendCourseSearch(title, modules) {
      // Set the loading status to true before sending the request
      this.isLoading = true;

      axios.post('http://localhost:3000/search', {
        keyword: title,
        modules: modules
      })
      .then((response) => {
        this.retrieved_list = response.data[0];
        console.log(this.retrieved_list);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        // Set the loading status to false after the request is complete
        this.isLoading = false;
      });
    }
  },
};
</script>

<style scoped>
/* body {
  background-color: #FFF8DC;
  font-family: 'Arial', sans-serif;
} */
/* #app {
    dis
} */
.btnn:focus {
  outline: none;
  box-shadow: none;
}

div.empty-show {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width:100%;
  font-size: 1.5rem;
  color: #666;
}

div.empty-show > div.empty-bg {
  background-image: url(../assets/bianqian.png);
  background-size: 100% 100%;
  width:60%;
  height:60%;
  text-align: center;
  line-height: 650px;
}

.bg-force {
position: absolute; left:-25px; top: -25px; width:1100px; height:300px; opacity: 1;
background-image: url(../assets/paper-piece.png);
background-size: 100% 90%;
background-repeat: no-repeat;
color:black;
z-index: 0;
}

.middle-line  {
  background-image: url(../assets/middle-line.png);
  background-size:100% 10%;
  opacity:1;

}

.n-thing-main {
  z-index: 10;
}

.tab {
  background-color: #D2B48C;
  padding: 10px 30px;
  margin: 0 5px;
  border-radius: 10px 10px 0 0;
  font-weight: bold;
}

.tab2 {

  background-color: aliceblue;
  padding: 10px 30px;
  margin: 0 5px;
  margin-left: -10px;
  border-radius: 0px 10px 10px 0px;
  font-weight: bold;
  height: 200px;
  width: 90px;
  line-height: 200px;
  box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, 0.2);
  transition: width ease-in-out 0.5s;
}

.tab2:hover {
  width: 115px;
  /* set mouse clickable */
  cursor: pointer;
}

.active-tab {
  background-color: #F5DEB3;
}

.note-paper {
  background-color: #F5DEB3;
  background: linear-gradient(to right, #F5DEB3 , #f3d294);
  box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, 0.2);
  margin: 0px;
  padding: 20px;
  border-radius: 15px;
  position: relative;
}


.note-paper2 {
  /* background-color: #F5DEB3; */
  background-color: #F5DEB3;
  /* background: linear-gradient(to right, #F5DEB3 , #dbbe87); */
  box-shadow: 10px 5px 5px 0 rgba(0, 0, 0, 0.2);
  margin: 0px;
  padding: 20px;
  border-radius: 15px;
  position: relative;
}

.tape {
  width: 50px;
  height: 20px;
  background-color: #F5DEB3;
  position: absolute;
  top: -10px;
  transform: rotate(-5deg);
}

.tape:before {
  content: '';
  position: absolute;
  width: 100%;
  height: 5px;
  background-color: #D2B48C;
  bottom: 0;
}

.tape:nth-child(2) {
  top: -10px;
  left: 50px;
}

.tape:nth-child(3) {
  top: -10px;
  right: 50px;
}

.tape:nth-child(4) {
  bottom: -10px;
  left: 50px;
}

.tape:nth-child(5) {
  bottom: -10px;
  right: 50px;
}

.ring-binder {
  width: 20px;
  height: 20px;
  background-color: #D3D3D3;
  border-radius: 50%;
  position: absolute;
  left: -30px;
}

.ring-binder:nth-child(6) {
  top: 20px;
}

.ring-binder:nth-child(7) {
  top: 120px;
}

.ring-binder:nth-child(8) {
  top: 220px;
}

.ring-binder:nth-child(9) {
  top: 320px;
}

.ring-binder:nth-child(10) {
  top: 420px;
}
</style>
