
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
          <CourseForm v-if="current==1" />
          <FileForm v-if="current==2" />
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
      <n-radio-group v-model:value="currentStatus" size="medium" name="basic">
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
      </n-radio-group>
    </n-space>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { MdArrowRoundBack, MdArrowRoundForward } from "@vicons/ionicons4";
import CourseForm from "./CourseForm.vue";
import FileForm from "./FileForm.vue";
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
    return {
      stepid2formtitle,
      currentStatus: ref("process"),
      current: currentRef,
      next() {
        if (currentRef.value === null)
          currentRef.value = 1;
        else if (currentRef.value >= 4)
          currentRef.value = null;
        else
          currentRef.value++;
      },
      prev() {
        if (currentRef.value === 0)
          currentRef.value = null;
        else if (currentRef.value === null)
          currentRef.value = 4;
        else
          currentRef.value--;
      }
    };
  }
});
</script>

<style scoped>
* {
  font-family: 'Inter', sans-serif;
}
</style>