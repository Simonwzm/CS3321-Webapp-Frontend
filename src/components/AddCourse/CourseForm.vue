<template>
  <n-radio-group
    v-model:value="size"
    name="top-size"
    style="margin-bottom: 12px"
    v-if="false"
  >
    <n-radio-button value="small">
      小
    </n-radio-button>
    <n-radio-button value="medium">
      中
    </n-radio-button>
    <n-radio-button value="large">
      大
    </n-radio-button>
  </n-radio-group>
  <br>
  <n-form
    ref="formRef"
    :model="model"
    :rules="rules"
    :size="size"
    label-placement="top"
  >
    <n-grid :cols="24" :x-gap="24">
      <n-form-item-gi :span="12" label="Course Name" path="courseName">
        <n-input v-model:value="model.courseName" placeholder="Input" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="Course Url" path="courseUrl">
        <n-input v-model:value="model.courseUrl" placeholder="Input" />
      </n-form-item-gi>

      <n-form-item-gi :span="12" label="Course ID" path="course_id">
        <n-input v-model:value="model.course_id" placeholder="Input" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="Course Teacher" path="assign_id">
        <n-input v-model:value="model.assign_id" placeholder="Input" />
      </n-form-item-gi>
      

      <n-form-item-gi :span="12" label="Grade" path="gradeValue">
        <n-select
          v-model:value="model.gradeValue"
          placeholder="Select Grade From drawer here"
          :options="gradeOptions"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="Students Number" path="rateValue">
        <n-input-number v-model:value="model.idField.rateValue" />
      </n-form-item-gi>

      <n-form-item-gi :span="24" label="Course Descriptions" path="remarkValue">
        <n-input
          v-model:value="model.remarkValue"
          placeholder="Some remarks on the course"
          type="textarea"
          :autosize="{
            minRows: 2,
            maxRows: 5
          }"
        />
      </n-form-item-gi>
    <n-form-item-gi
        v-for="(item, index) in model.idField.module_id"
        :key="index"
        :label="`module_id${index + 1}`"
        :path="`module_id[${index}].module_id`"
        :span="24"
        :rule="{
        required: false,
        message: `Please enter module_id${index + 1}`,
        trigger: ['input', 'blur']
        }"
    >
        <n-input v-model:value="item.module_id" clearable />
        <n-button style="margin-left: 24px" @click="removeItem(index)">
        Remove
        </n-button>
    </n-form-item-gi>
      <n-gi :span="24">
        <div style="display: flex; justify-content: flex-end;">
            <n-button round attr-type="button" @click="addItem" style=" margin-right: 12px; background-color: lightblue; color:white">
            Add module
            </n-button>
            <n-button round attr-type="button" @click="$emit('updateCourseForm', model)" style=" margin-right: 12px; background-color: lightpink; color:white">
            Next
            </n-button>
          <n-button round type="primary" @click="handleValidateButtonClick">
            Check
          </n-button>
        </div>
    </n-gi>
    </n-grid>
  </n-form>

  <pre v-if="false">{{ JSON.stringify(model, null, 2) }}
</pre>
</template>

<script>
import { defineComponent, ref, reactive } from "vue";
import { useMessage } from "naive-ui";


export default defineComponent({
  emits: ["updateCourseForm"],
  setup() {

    const formRef = ref(null);
    const message = useMessage();
    const model = reactive({
        courseName: null,
        gradeValue: null,
        courseUrl: null,
        idField: {
            rateValue: null,
            module_id: [{ dule_id: ""}],
            
        },
        remarkValue: null,
      });

    const removeItem = (index) => {
      model.module_id.splice(index, 1);
    };
    
    const addItem = () => {
      model.idField.module_id.push({ module_id: "" });
    };

    return {
      formRef,
      model,
      addItem,
      removeItem,
      size: ref("large"),
      gradeOptions: ["Freshman", "Sophomore", "Junior", "Senior"].map((v) => ({
        label: v,
        value: v
      })),
      rules: {
        courseName: {
          required: true,
          trigger: ["blur", "input"],
          message: "请输入 courseName"
        },
        courseUrl: {
          required: true,
          trigger: ["blur", "input"],
          message: "请输入 courseUrl"
        },
        remarkValue: {
          required: true,
          trigger: ["blur", "input"],
          message: "请输入 remarks"
        },
        course_id: {
          required: true,
          trigger: ["blur", "change"],
          message: "请选择 selectValue"
        },
        assign_id: {
          required: true,
          trigger: ["blur", "change"],
          message: "请输入 Assignment name"
        },
        module_id: {
          required: true,
          trigger: ["blur", "change"],
          message: "请输入 Module name"
        },
        rateValue: {
          type: "number",
          required: false,
          trigger: ["blur", "change"],
          message: "请输入 Rate number"
        },
      },
      handleValidateButtonClick(e) {
        e.preventDefault();
        formRef.value?.validate((errors) => {
          if (!errors) {
            message.success("验证成功");
          } else {
            console.log(errors);
            message.error("验证失败");
          }
        });
      },
    };
  }
});
</script>