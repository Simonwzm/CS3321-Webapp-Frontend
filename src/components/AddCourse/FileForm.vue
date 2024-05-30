<template>
  <n-form ref="formRef" :model="model" :style="{ maxWidth: '840px' }">
    <n-form-item
      label="姓名"
      path="name"
      :rule="{
        required: true,
        message: '请输入姓名',
        trigger: ['input', 'blur']
      }"
    >
      <n-input v-model:value="model.name" clearable />
    </n-form-item>

      <div
        v-for="(item, index) in model.updateData"
        :key="index"
        class=" bg-stone-100 p-4 mb-4 rounded-md"
      >
        <n-radio-group
          style="margin-bottom: 12px"
          v-model:value="item.kind"
        >
          <n-radio-button value="module" @click="createModTemplate(item)">
            Module
          </n-radio-button>
          <n-radio-button value="file" @click="createFilTemplate(item)">
            File
          </n-radio-button>
          <n-radio-button value="video" @click="createVideoTemplate(item)">
            Video
          </n-radio-button>
          <n-radio-button value="announcement" @click="createAnnTemplate(item)">
            Announces
          </n-radio-button>
          <n-radio-button value="assignment" @click="createAssTemplate(item)">
            Assignment
          </n-radio-button>
        </n-radio-group>

        <div class="subform-container" v-if="item.kind=='module'">
          <n-form-item
            label="New Module"
            :path="`hobbies[${index}].hobby`"
            :rule="{
              required: true,
              message: '123',
              trigger: ['input', 'blur']
            }"
          >
      <n-grid :cols="12" :x-gap="12">

      <n-form-item-gi :span="24" label="Grade" path="gradeValue">
            <n-input v-model:value="item.module_name" clearable />
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="Grade" path="gradeValue">
            <n-input v-model:value="item.module_id" clearable />
      </n-form-item-gi>
      </n-grid>
            <n-button style="margin-left: 12px" @click="removeItem(index)">
              删除
            </n-button>
          </n-form-item>
        </div>
        <div class="subform-container" v-if="item.kind=='file'">
          <n-form-item
            :key="index"
            label="New file"
            :path="`hobbies[${index}].hobby`"
            :rule="{
              required: true,
              message: '123',
              trigger: ['input', 'blur']
            }"
          >
          <n-grid :cols="12" :x-gap="12">
      <n-form-item-gi :span="24" label="Grade" path="gradeValue">
            <n-input v-model:value="item.file_id" clearable />
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="Grade" path="gradeValue">
            <n-input v-model:value="item.file_name" clearable />
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="Grade" path="gradeValue">
            <n-input v-model:value="item.file_url" clearable />
      </n-form-item-gi>
      </n-grid>
            <n-button style="margin-left: 12px" @click="removeItem(index)">
              删除
            </n-button>
          </n-form-item>
        </div>
        <div class="subform-container" v-if="item.kind=='video'">
          <n-form-item
            :key="index"
            label="New video"
            :path="`hobbies[${index}].hobby`"
            :rule="{
              required: true,
              message: '123',
              trigger: ['input', 'blur']
            }"
          >

            <n-grid :cols="12" :x-gap="12">

      <n-form-item-gi :span="12" label="Grade" path="gradeValue">
              <n-input v-model:value="item.video_id" clearable />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="Grade" path="gradeValue">
              <n-input v-model:value="item.video_discrption" clearable 
                      placeholder="Video Description"
                      type="textarea"
                      :autosize="{
                        minRows: 3,
                        maxRows: 5
                      }"
              />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="Grade" path="gradeValue">
              <n-input v-model:value="item.video_link1" clearable />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="Grade" path="gradeValue">
              <n-input v-model:value="item.video_link2" clearable />
      </n-form-item-gi>
            </n-grid>
            <n-button style="margin-left: 12px" @click="removeItem(index)">
              删除
            </n-button>
          </n-form-item>
        </div>
        <div class="subform-container" v-if="item.kind=='announcement'">
          <n-form-item
            :key="index"
            label="New announcement"
            :path="`hobbies[${index}].hobby`"
            :rule="{
              required: true,
              message: '123',
              trigger: ['input', 'blur']
            }"
          >
          <n-grid :cols="12" :x-gap="12">
      <n-form-item-gi :span="24" label="Grade" path="gradeValue">
            <n-input v-model:value="item.ann_id" clearable />
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="Grade" path="gradeValue">
            <n-input v-model:value="item.ann_title" clearable />
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="Grade" path="gradeValue">
            <n-input v-model:value="item.ann_message" clearable 
                    placeholder="Announcement message"
                    type="textarea"
                    :autosize="{
                      minRows: 3,
                      maxRows: 5
                    }"
            />
      </n-form-item-gi>
      </n-grid>

            <n-button style="margin-left: 12px" @click="removeItem(index)">
              删除
            </n-button>
          </n-form-item>
        </div>
        <div class="subform-container" v-if="item.kind=='assignment'">
          <n-form-item
            :key="index"
            label="New assignment"
            :path="`hobbies[${index}].hobby`"
            :rule="{
              required: true,
              message: '123',
              trigger: ['input', 'blur']
            }"
          >
          <n-grid :cols="12" :x-gap="12">
      <n-form-item-gi :span="24" label="Grade" path="gradeValue">
            <n-input v-model:value="item.assign_title" clearable />
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="Grade" path="gradeValue">
            <n-input v-model:value="item.assign_message" clearable 
                    placeholder="Assignment message"
                    type="textarea"
                    :autosize="{
                      minRows: 3,
                      maxRows: 5
                    }"
            />
      </n-form-item-gi>
      </n-grid>
            <n-button style="margin-left: 12px" @click="removeItem(index)">
              删除
            </n-button>
          </n-form-item>
        </div>
      </div>

    <n-form-item>
      <n-space>
        <n-button attr-type="button" @click="handleValidateClick">
          验证
        </n-button>
        <n-button attr-type="button" @click="addItem">
          增加
        </n-button>
        <n-button @click="$emit('updateFileForm', model)" type="primary" round >
          Next
        </n-button>
      </n-space>
    </n-form-item>
  </n-form>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  emits: ["updateFileForm"],
  setup() {
    const formRef = ref(null);
    const add_type = ref("module");
    
    const model = reactive({
      name: "",
      updateData: []
    });
    
    const removeItem = (index) => {
      model.updateData.splice(index, 1);
    };
    
    const addItem = () => {
      let new_item = createModTemplate(null);
      model.updateData.push(new_item);
      console.log(model.updateData)
    };
    
    const handleValidateClick = () => {
      formRef.value?.validate((errors) => {
        if (!errors) {
          console.log("验证通过");
        } else {
          console.log(errors);
        }
      });
    };
    const createAnnTemplate = (item) => {
      let new_item = {
        kind: "announcement",
        ann_id: "",
        ann_title: "",
        ann_message: "",
      };
      item = new_item;
    };
    const createAssTemplate = (item) => {
      let new_item = {
        kind: "assignment",
        assign_title: "",
        assign_message: "",
        assignm_file: null,
      }
      item = new_item;
    };

    const createFilTemplate = (item) => {
      let new_item = {
        kind: "file",
        file_id: "",
        file_title: "",
        file_url: "",
        file_folder: ["/"],
      };
      item = new_item;
    };

    const createModTemplate = (item) => {
      let new_item = {
        kind: "module",
        module_name: "",
        attachments: null,
      };
      item = new_item;
      return new_item;
    };

    const createVideoTemplate = (item) => {
      let new_item = {
        kind: "video",  
        video_id: "",
        video_discrption: "",
        video_link1: "",
        video_link2: "",
      };
      item = new_item;
    };
    

    return {
      createAnnTemplate,
      createAssTemplate,
      createFilTemplate,
      createModTemplate,
      createVideoTemplate,
      createModTemplate,
      add_type,
      formRef,
      model,
      addItem,
      removeItem,
      handleValidateClick,
    };
  }
});
</script>