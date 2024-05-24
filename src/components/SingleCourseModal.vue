
<template>
    <div class="course-contain flex-row w-full h-full ">
        <div class="course-data-container">
            <div class="course-name font-bold">
                <p>Course-name: {{ courseData.course_name }}</p>
            </div>
            <div class="course-url">
                <p>Course-url: {{ courseData.course_url }}</p>
            </div>
            <div class="course-video">
                <p>Course-video: {{ courseData.video }}</p>
            </div>
            <div class="course-files">
                <p>Course-files: {{ courseData.files }}</p>
            </div>
            <div class="course-assignments">
                <p>Course-assignments: {{ courseData.assignments }}</p>
            </div>
            <div class="course-modules">
                <p>Course-modules: {{ courseData.modules }}</p>
            </div>
            <div class="course-announcements">
                <p>Course-announcements: {{ courseData.announcements }}</p>
            </div>
        </div>
        <div class="coure-graph-container">
            <GraphComponent> </GraphComponent>
        </div>
    </div>

</template>

<script>
import GraphComponent from './GraphComponent.vue'
export default {
  props: {
    courseData: {
      type: Object,
      required: true
    }
  }
  components: {
    GraphComponent
  }
}
</script>

