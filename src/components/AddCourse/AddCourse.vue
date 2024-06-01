
<template>
  <div id="fc-container" class="p-8 bg-gray-100 min-h-full bg-opacity-70" style="border-radius: 20px">
    <div class="text-3xl font-semibold mb-6">Course Add</div>
    <div class="w-full min-h-24 progress-line-wrapper">
      <n-space vertical>
        <n-steps :current="(current)" :status="currentStatus">
          <n-step
            title="Course Info"
            description="All through the day, I me mine I me mine, I me mine"
          />
          <n-step
            title="Attached Files"
            description="When I find myself in times of trouble Mother Mary comes to me"
          />
          <n-step
            title="Submission"
            description="Here come old flat top He come grooving up slowly"
          />
        </n-steps>

      </n-space>
    </div>
    <div class="bg-white p-6 rounded-lg shadow mb-6 min-h-80">
      <div class="font-semibold text-2xl mb-6">
        {{ stepid2formtitle[current] }}
      </div>
      <div class="w-full min-h-24">
        <div class="form">
          <n-collapse-transition :show="current==1">
          <CourseForm v-if="current==1" @updateCourseForm="callbackUCF" />
          </n-collapse-transition> 
          <n-collapse-transition :show="current==2">
          <FileForm v-if="current==2" @updateFileForm="callbackUFF" />
          </n-collapse-transition> 

          <n-collapse-transition :show="current==3">
            <div v-if="current==3">
              <n-result status="success" title="Success" >
                <n-gradient-text :size="24" type="success" style="text-align: center; margin-left: auto; margin-right:auto; width:100%;">
                  Successfully created {{ prev_added_course.courseName }}
                </n-gradient-text>
                <template #footer>
                  <n-button @click="() => {current = 1;}">继续添加</n-button>
                </template>
              </n-result>
            </div>
          </n-collapse-transition>
        </div>

      </div>
    </div>
    <n-space>
      <n-button-group>
        <n-button @click="prev">
          <template #icon>
            <n-icon>
              <md-arrow-round-back />
            </n-icon>
          </template>
        </n-button>
        <n-button @click="next">
          <template #icon>
            <n-icon>
              <md-arrow-round-forward />
            </n-icon>
          </template>
        </n-button>
      </n-button-group>
      <!-- <n-radio-group v-model:value="currentStatus" size="medium" name="basic">
        <n-radio-button value="error">
          Error
        </n-radio-button>
        <n-radio-button value="process">
          Process
        </n-radio-button>
        <n-radio-button value="wait">
          Wait
        </n-radio-button>
        <n-radio-button value="finish">
          Finish
        </n-radio-button>
      </n-radio-group> -->
    </n-space>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { MdArrowRoundBack, MdArrowRoundForward } from "@vicons/ionicons4";
import CourseForm from "./CourseForm.vue";
import FileForm from "./FileForm.vue";
import axios from 'axios';
export default defineComponent({
  components: {
    MdArrowRoundBack,
    MdArrowRoundForward,
    CourseForm,
    FileForm
  },
  setup() {
    const currentRef = ref(1);
    const stepid2formtitle = {
      1: "Create a new course",
      2: "Add course files",
      3: "Permission Control"
    };

    const callbackUFF = (FF_model) => {
      // console.log(FF_model);
      // console.log("---------");
      let obj_list = FF_model.updateData;
      let classname_ = FF_model.name;
      let payload_obj_list = [];
      for (let i = 0; i < obj_list.length; i++) {
        let payload_obj = {
          className: classname_,
        }
        payload_obj.moduleName = [obj_list[i].kind+'s'];
        if (payload_obj.moduleName[0] == "videos") {
          payload_obj.moduleName[0] = "video";
        }
        payload_obj.data = {}
        if (obj_list[i].kind == "module") {
          payload_obj.data.module_name = obj_list[i].module_name;
          payload_obj.data.module_id = obj_list[i].module_id;
          payload_obj.data.attachments = null;
        } else if (obj_list[i].kind == "file") {
          payload_obj.data.file_id = obj_list[i].file_id;
          payload_obj.data.file_url = obj_list[i].file_url;
          payload_obj.data.file_name = obj_list[i].file_name;
        } else if (obj_list[i].kind == "video") {
          payload_obj.data.video_discrption = obj_list[i].video_discrption;
          payload_obj.data.video_id = obj_list[i].video_id;
          payload_obj.data.video_link1 = obj_list[i].video_link1;
          payload_obj.data.video_link2 = obj_list[i].video_link2;
        } else if (obj_list[i].kind == "announcement") {
          payload_obj.data.ann_id = obj_list[i].ann_id;
          payload_obj.data.ann_message = obj_list[i].ann_message;
          payload_obj.data.ann_title = obj_list[i].ann_title;
        } else if (obj_list[i].kind == "assignment") {
          payload_obj.data.assign_message = obj_list[i].assign_message;
          payload_obj.data.assign_id = obj_list[i].assign_id;
        }
        payload_obj_list.push(payload_obj);
      }
      // console.log(payload_obj_list);
      
      // send the payload_obj in list one by one
      for (let i = 0; i < payload_obj_list.length; i++) {
        console.log(payload_obj_list[i]);
        axios.post('http://localhost:3000/insert', payload_obj_list[i]).then((response) => {
          console.log(response.data);
          next();
        }).catch((error) => {
          console.log(error);
        });
      }
    };

    const next = () => {
      if (currentRef.value === null)
        currentRef.value = 1;
      else if (currentRef.value >= 4)
        currentRef.value = null;
      else
        currentRef.value++;
    };

    const prev = () => {
      if (currentRef.value === 0)
        currentRef.value = null;
      else if (currentRef.value === null)
        currentRef.value = 4;
      else
        currentRef.value--;
    };

    const callbackUCF = (CF_model) => {
      console.log(CF_model);
      let payload_obj = {
        courseName: CF_model.courseName,
        courseUrl: CF_model.courseUrl,
        courseId: CF_model.course_id,
      }
      prev_added_course.value = payload_obj;
      console.log(payload_obj)

      axios.post('http://localhost:3000/create', payload_obj).then((response) => {
        console.log(response.data);
        next();
      }).catch((error) => {
        console.log(error);
      });

    };
    return {
      callbackUFF,
      callbackUCF,
      stepid2formtitle,
      currentStatus: ref("process"),
      current: currentRef,
      next,
      prev,
      prev_added_course: ref({
        courseName: "Not a Course",
      }),
    };
  }
});
</script>

<style scoped>
* {
  font-family: 'Inter', sans-serif;
}
</style>